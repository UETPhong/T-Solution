import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../../../services';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { PersonnelDialogComponent } from '../personnel-dialog/personnel-dialog.component';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  // ViewChild
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // display columns material
  displayedColumns: string[] = [
    'id',
    'full_name',
    'email',
    'phone',
    'department_name',
    'job_title_name',
    'position_name',
    'actions',
  ];

  // value
  listData
  dataSource

  // constructor
  constructor(
    private userService: UsersService,
    public dialog: MatDialog) { }

  // ngOnInit
  ngOnInit(): void {
    this.getAllUser()
  }

  // get function
  getAllUser() {
    this.userService.getUsers().subscribe(r => {
      this.listData = r['data']['apiResult'];
      this.listData.sort(this.compare);
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
    const dialogRef = this.dialog.open(PersonnelDialogComponent, { maxWidth: '70%', data: { action, value } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllUser();
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
