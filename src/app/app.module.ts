import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SuccesfulVerificationComponent } from './succesful-verification/succesful-verification.component';
import { combineLatest } from 'rxjs';
import { WeeklyQuestionComponent } from './weekly-question/weekly-question.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { QuestionsComponent } from './questions/questions.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ToolkitComponent } from './toolkit/toolkit.component';

var appRoutes: Routes  = [
  {path: "login", component: LoginComponent},
  {path: "homepage", component: HomePageComponent},
  {path: "articles", component: ArticlesComponent},
  {path: "articlepage", component: ArticlePageComponent},
  {path: 'toolkit', component: ToolkitComponent},
  {path: "weeklyQuestion", component: WeeklyQuestionComponent},
  {path: "login", component: LoginComponent},
  {path: "bubbles", component: BubblesComponent},
  {path: "questions", component: QuestionsComponent},
  {path: "successfulverification", component: SuccesfulVerificationComponent},
  {path: "emailverify/:key", component: EmailVerifyComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    EmailVerifyComponent,
    EmailVerifyComponent,
    SuccesfulVerificationComponent,
    WeeklyQuestionComponent,
    BubblesComponent,
    QuestionsComponent,
    ArticlesComponent,
    ArticlePageComponent,
    ToolkitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
