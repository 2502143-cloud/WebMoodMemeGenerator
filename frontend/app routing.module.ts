import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GenerateMemeComponent } from './generate-meme/generate-meme.component';  
import { LikedMemesComponent } from './liked-meme/liked-meme.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './sign-up/signup.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generate', component: GenerateMemeComponent },
  { path: 'liked', component: LikedMemesComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
  