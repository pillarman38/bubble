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
import { JournalComponent } from './journal/journal.component';
import { SerenityBubbleComponent } from './serenity-bubble/serenity-bubble.component';
import { ControlBubbleComponent } from './control-bubble/control-bubble.component';
import { WhoAreYouComponent } from './who-are-you/who-are-you.component';
import { BFComponent } from './bf/bf.component';
import { ThoughtComponent } from './thought/thought.component';
import { FiftyComponent } from './fifty/fifty.component';
import { OneThirdComponent } from './one-third/one-third.component';
import { MediataionComponent } from './mediataion/mediataion.component';
import { ReflectionsComponent } from './reflections/reflections.component';

var appRoutes: Routes  = [
  {path: "login", component: LoginComponent},
  {path: "homepage", component: HomePageComponent},
  {path: "articles", component: ArticlesComponent},
  {path: "journal", component: JournalComponent},
  {path: "articlepage", component: ArticlePageComponent},
  {path: "weeklyQuestion", component: WeeklyQuestionComponent},
  {path: "login", component: LoginComponent},
  {path: "bubbles", component: BubblesComponent},
  {path: "questions", component: QuestionsComponent},
  {path: "successfulverification", component: SuccesfulVerificationComponent},
  {path: "emailverify/:key", component: EmailVerifyComponent},
  {path: "serenitybubble", component: SerenityBubbleComponent},
  {path: "control", component: ControlBubbleComponent},
  {path: "bf", component: BFComponent},
  {path: "whoareyou", component: WhoAreYouComponent},
  {path: "thought", component: ThoughtComponent},
  {path: "fifty", component: FiftyComponent},
  {path: "onethird", component: OneThirdComponent},
  {path: "meditation", component: MediataionComponent},
  {path: "reflections", component: ReflectionsComponent}
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
    JournalComponent,
    SerenityBubbleComponent,
    ControlBubbleComponent,
    WhoAreYouComponent,
    BFComponent,
    ThoughtComponent,
    FiftyComponent,
    OneThirdComponent,
    MediataionComponent,
    ReflectionsComponent
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
