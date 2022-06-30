import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DetailproductComponent } from './detailproduct/detailproduct.component';
import { HomeComponent } from './home/home.component';
import { ListproductsComponent } from './listproducts/listproducts.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { PricingComponent } from './pricing/pricing.component';
import { AuthGuard } from './auth.guard';
import { BlogComponent } from './blog/blog.component';

const routes: Routes =
[
  {path: 'home', component:HomeComponent},
  {path:'listproducts',component:ListproductsComponent},
  {path:'detailproduct/:id',component:DetailproductComponent},
  {path:'Pricing',component:PricingComponent},
  {path:'login',component:LoginComponent},
  {path:"register",component:RegisterComponent},
 {path:"addproduct",component:AddproductComponent},
 {path:"contact",component:ContactComponent},
 {path:"blog",component:BlogComponent},
 {path:'profil',component:ProfilComponent,canActivate: [AuthGuard]},
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
