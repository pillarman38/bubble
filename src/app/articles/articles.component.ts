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
  
  articleList = []
  liked = false

  constructor(private http: HttpClient, private router: Router, private articleServ: ArticleService) { }
  
  articlePage(article) {
    this.articleServ.article = article
    this.router.navigateByUrl('/articlepage')
  }
  like(e, article) {
    console.log(article);
    
    if(article['liked'] == false) {
      article['liked'] = true
    } else {
      article['liked'] = false
    }
    var likedArticle = {
      user: localStorage.getItem('user'),
      title: article['title'],
      liked: article['liked']
    } 
    console.log(likedArticle);
    
    this.http.post('http://localhost:3001/api/management/likedarticles', likedArticle).subscribe((res) => {
      console.log(res);
    })
  }
  ngOnInit(): void {
    var user = localStorage.getItem('user')
    this.http.post(`http://localhost:3001/api/management/getarticles`, {res: user}).subscribe((res:  any[]) => {
      console.log(res);
      this.articleList = res
    })
  }
}
