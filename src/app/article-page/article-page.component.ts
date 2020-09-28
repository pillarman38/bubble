import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  article
  constructor(private articleServ: ArticleService) { }

  ngOnInit(): void {
    this.article = this.articleServ.article
  }

}
