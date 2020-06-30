import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CandidatesService } from '../../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { CandidateDialogComponent } from '../candidate-dialog/candidate-dialog.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  //ViewChild
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // display columns material
  displayedColumns: string[] = [
    'id',
    'full_name',
    'vacancies',//Vị trí ứng tuyển
    'email',
    'number',
    'create_date',
    'openCV',
    'actions',
  ];

  // value
  listData
  dataSource

  // constructor
  constructor(
    private CandidatesService: CandidatesService,
    public dialog: MatDialog
  ) { }

  // ngOnInit
  ngOnInit() {
    this.getAllCandidate();
  }

  // get function
  getAllCandidate() {
    this.CandidatesService.getAll().subscribe(r => {
      this.listData = r['data']['apiResult'];
      console.log('data',this.listData);
      
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
    const dialogRef = this.dialog.open(CandidateDialogComponent, {
      maxWidth: '70%',
      data: { action, value }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCandidate();
    });
  }

  // show cv
  get localLink(): string { return environment.localLink }
  openCV(path) {
    const link = this.localLink.concat(path.slice(2).toString());
    window.open(link, "_blank");
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
