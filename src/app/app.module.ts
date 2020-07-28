import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PhotoSelectorComponent } from './photo-selector/photo-selector.component';
import { ReactiveFormsModule } from '@angular/forms'

var appRoutes: Routes  = [
  {path: "login", component: LoginComponent},
  {path: "homePage", component: HomePageComponent},
  {path: "photoSelector", component: PhotoSelectorComponent},
  {path: "login", component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    PhotoSelectorComponent
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
