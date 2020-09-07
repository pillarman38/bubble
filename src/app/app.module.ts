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
import { SuccesfulVerificationComponent } from './succesful-verification/succesful-verification.component'
import { combineLatest } from 'rxjs';
import { WeeklyQuestionComponent } from './weekly-question/weekly-question.component';

var appRoutes: Routes  = [
  {path: "login", component: LoginComponent},
  {path: "homepage", component: HomePageComponent},
  {path: "emailverify/:key", component: EmailVerifyComponent},
  {path: "weeklyQuestion", component: WeeklyQuestionComponent},
  {path: "login", component: LoginComponent},
  {path: "successfulverification", component: SuccesfulVerificationComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    EmailVerifyComponent,
    EmailVerifyComponent,
    SuccesfulVerificationComponent,
    WeeklyQuestionComponent
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
