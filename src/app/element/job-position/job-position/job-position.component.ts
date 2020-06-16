import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { JobPositionsService } from '../../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { JobPositionDialogComponent } from '../job-position-dialog/job-position-dialog.component';

@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.css']
})
export class JobPositionComponent implements OnInit {

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
    private JobPositionsService: JobPositionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllJobPositon();
  }
  getAllJobPositon() {
    this.JobPositionsService.getAll().subscribe(r => {
      this.listData = r['data']['apiResult'];
      this.listData.sort(this.compare);
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
    const dialogRef = this.dialog.open(JobPositionDialogComponent, { maxWidth: '70%', data: { action, value } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllJobPositon();
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




