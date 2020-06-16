

  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { RecruitmentsService, CityProvincesService } from '../../../services';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatDialog } from '@angular/material/dialog';
  import { MatSort } from '@angular/material/sort';
import { PostRecruitmentDialogComponent } from '../post-recruitment-dialog/post-recruitment-dialog.component';

@Component({
  selector: 'app-post-recruitment',
  templateUrl: './post-recruitment.component.html',
  styleUrls: ['./post-recruitment.component.css']
})
export class PostRecruitmentComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
  
    listData
    listCity
    dataSource
  
    displayedColumns: string[] = [
      'id',
      'title',
      'quantity',
      // 'city_province_id',
      'salary',
      'valid_date',
       'actions',
    ];
  
  
    constructor(
      private RecruitmentsService: RecruitmentsService,
      private CityProvincesService: CityProvincesService,
      public dialog: MatDialog
    ) { }
  
    ngOnInit() {
      this.getAllCareer();
    }

    getALlCity(){
      this.CityProvincesService.getAll().subscribe(r=>{
        this.listCity = r['data']['apiResult']
      })
    }

    getAllCareer() {
      this.RecruitmentsService.getAll().subscribe(r => {
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
      const dialogRef = this.dialog.open(PostRecruitmentDialogComponent, { maxWidth: '70%', data: { action, value } });
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
  
  
  
  
  