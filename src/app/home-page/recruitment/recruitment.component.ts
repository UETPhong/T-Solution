import { Component, OnInit } from '@angular/core';
import { CityProvincesService, CareersService, RecruitmentsService } from '../../services'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {

  data
  careers
  citys
  recruitments
  perPage = 3
  currentPage = 1

  formSearch: FormGroup




  constructor(
    private CityProvincesService: CityProvincesService,
    private CareersService: CareersService,
    private RecruitmentsService: RecruitmentsService,
  ) { }

  ngOnInit(): void {
    this.buildFormSearch();
    this.getAllCareers();
    this.getAllCitys();
    this.getAllRecruitments();
  }

  buildFormSearch() {
    this.formSearch = new FormGroup({
      title: new FormControl(''),
      active: new FormControl(''),
      keywords: new FormControl(''),
      career_id: new FormControl(''),
      city_province_id: new FormControl(''),
      currentPage: new FormControl(''),
      perPage: new FormControl(''),
    })
  }

  getAllCareers() {
    this.CareersService.getAll().subscribe(r => {
      this.careers = r['data']['apiResult']
    })
  }
  getAllCitys() {
    this.CityProvincesService.getAll().subscribe(r => {
      this.citys = r['data']['apiResult']
    })
  }
  getAllRecruitments() {
    const query = {}
    query['perPage'] = this.perPage;
    query['currentPage'] = this.currentPage;
    if (this.formSearch.value.keywords !== '') { query['keywords'] = this.formSearch.value.keywords }
    if (this.formSearch.value.career_id !== '') { query['career_id'] = this.formSearch.value.career_id }
    if (this.formSearch.value.city_province_id !== '') { query['city_province_id'] = this.formSearch.value.city_province_id }
    
    this.RecruitmentsService.getAll(query).subscribe(r => {
      this.data = r['data']
      this.recruitments = r['data']['apiResult']
    })
  }

  firstPage(){
    this.currentPage = 1;
    this.getAllRecruitments()
  }
  previousPage(){
    if(this.currentPage === 1){
      return
    }
    this.currentPage = this.currentPage - 1;
    this.getAllRecruitments()
  }
  nextPage(){
    if(this.currentPage >= this.data.lastPage){return}
    this.currentPage = this.currentPage + 1;
    this.getAllRecruitments()
  }
  lastPage(){
    this.currentPage = this.data.lastPage;
    this.getAllRecruitments()
  }





}
