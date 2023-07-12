import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagicLinkAdminComponent } from './pages/magic-link-admin/magic-link-admin.component';
import { MagicLinkStudentComponent } from './pages/magic-link-student/magic-link-student.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'magic-link-admin', component: MagicLinkAdminComponent },
  { path: 'magic-link-student/:id', component: MagicLinkStudentComponent },
  { path: 'login-zone', component: LoginPageComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
