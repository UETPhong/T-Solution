import { Component, OnInit } from '@angular/core';
import { BannersService, RecruitmentsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { RecruitmentApplyDialogComponent } from '../recruitment-apply-dialog/recruitment-apply-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-recruitment-detail',
  templateUrl: './recruitment-detail.component.html',
  styleUrls: ['./recruitment-detail.component.css']
})
export class RecruitmentDetailComponent implements OnInit {

  banners
  recruitmentSelect

  constructor(
    private BannersService: BannersService,
    private RecruitmentsService: RecruitmentsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllBanners()
    this.getRecruitmentById(this.route.snapshot.params['id'])
  }

  getAllBanners() {
    this.BannersService.getBanners().subscribe(r => {
      this.banners = r['data']
      console.log('check1', this.banners);
    })
  }

  getRecruitmentById(id){
    this.RecruitmentsService.getById(id).subscribe(r=> {
      this.recruitmentSelect = r['data']
      console.log(this.recruitmentSelect);      
    })
  }

  openDialog(value) {
    const dialogRef = this.dialog.open(RecruitmentApplyDialogComponent, { panelClass: 'custom-dialog-container' ,
      maxWidth: '100',
      data: { value }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllRecruitments();
    });
  }
}
