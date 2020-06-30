import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services';

@Component({
  selector: 'information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  articles

  constructor(
    private ArticlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.getAllArticles();
  }


  getAllArticles() {
    this.ArticlesService.getArticles().subscribe(r => {
      this.articles = r['data']
      // console.log('check2', this.articles);
    })
  }

}
