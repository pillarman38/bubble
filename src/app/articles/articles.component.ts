import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private articleServ: ArticleService) { }
  articleList = []

  articlePage(article) {
    this.articleServ.article = article
    this.router.navigateByUrl('/articlepage')
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:3001/api/management/getarticles`).subscribe((res:  any[]) => {
      console.log(res);
      this.articleList = res
    })
  }
}
