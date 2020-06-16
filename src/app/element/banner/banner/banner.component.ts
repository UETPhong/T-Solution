
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BannersService } from '../../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { BannerDialogComponent } from '../banner-dialog/banner-dialog.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  listData
  dataSource

  displayedColumns: string[] = [
    'id',
    'title',
    'slogan',
    'picture',
    'actions',
  ];


  constructor(
    private BannersService: BannersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCareer();
  }
  getAllCareer() {
    this.BannersService.getBanners().subscribe(r => {
      this.listData = r['data'];
      console.log(this.listData);
      this.dataSource = new MatTableDataSource(this.listData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action, value) {
    const dialogRef = this.dialog.open(BannerDialogComponent, { maxWidth: '70%', data: { action, value } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllCareer();
    });
  }
  test() {
    this.listData = [];
  }
}




