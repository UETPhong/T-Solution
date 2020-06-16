import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CareersService } from '../../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { CareerDialogComponent } from '../career-dialog/career-dialog.component';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  listData
  dataSource

  displayedColumns: string[] = [
    'id',
    'name',
    'created_by',
    'created_date',
    'updated_by',
    'updated_date',
    'actions',
  ];


  constructor(
    private CareersService: CareersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCareer();
  }
  getAllCareer() {
    this.CareersService.getAll().subscribe(r => {
      this.listData = r['data']['apiResult'];
      this.listData.sort(this.compare)
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
    const dialogRef = this.dialog.open(CareerDialogComponent, { maxWidth: '70%', data: { action, value } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllCareer();
    });
  }
  compare(a, b): number {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
  }


}




