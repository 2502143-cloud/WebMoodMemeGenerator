import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app routing.module';  
import { AppComponent } from './app.component';
import { AuthInterceptor } from './Services/auth.interceptor';

// Components
import { NavbarComponent } from './Navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MemeCardComponent } from './Meme-card/meme-card.component';

// Pages
import { HomeComponent } from './home/home.component';
import { GenerateMemeComponent } from './generate-meme/generate-meme.component';
import { LikedMemesComponent } from './liked-meme/liked-meme.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './sign-up/signup.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MemeCardComponent,
    HomeComponent,
    GenerateMemeComponent,
    LikedMemesComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}