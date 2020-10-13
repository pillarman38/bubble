import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  article
  liked = false
  constructor(private articleServ: ArticleService, private http: HttpClient) { }

  like(article) {
    console.log(article);
    
    if(article['liked'] == false) {
      article['liked'] = true
    } else {
      article['liked'] = false
    }

    var likedArticle = {
      user: localStorage.getItem('user'),
      title: article['title'],
      article: article['article']
    } 
    console.log(likedArticle);
    
    this.http.post('http://localhost:3001/api/management/likedarticles', likedArticle).subscribe((res) => {
      this.liked = res[0]['liked']
    })
  }

  ngOnInit(): void {
    this.article = this.articleServ.article
    this.liked = this.article['liked']
  }
}
