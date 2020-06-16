import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DepartmentsService } from '../../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DepartmentDialogComponent } from '../department-dialog/department-dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  // ViewChild
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // value
  listData
  dataSource

  // display columns material
  displayedColumns: string[] = [
    'id',
    'name',
    'parent_name',
    'created_by',
    'created_date',
    'updated_by',
    'updated_date',
    'actions',
  ];

  // constructor
  constructor(
    private DepartmentsService: DepartmentsService,
    public dialog: MatDialog
  ) { }

  // ngOnInit
  ngOnInit() {
    this.getAllDepartment();
  }

  // get function
  getAllDepartment() {
    this.DepartmentsService.getAll().subscribe(r => {
      this.listData = r['data']['apiResult'];
      this.listData.sort(this.compare)
      this.dataSource = new MatTableDataSource(this.listData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // ???
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // open dialog function
  openDialog(action, value) {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      maxWidth: '70%',
      data: { action, value }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllDepartment();
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





