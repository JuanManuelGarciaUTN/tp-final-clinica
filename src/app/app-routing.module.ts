import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { LoginComponent } from './modules/login/login.component';
import { NoLogueadoGuard } from './guards/no-logueado.guard';
import { AdminNologueadoGuard } from './guards/admin-nologueado.guard';

const routes: Routes = [
  { path: "", component:BienvenidaComponent},
  { 
    path: "registro", 
    component: RegistroComponent,
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule),
    canActivate: [AdminNologueadoGuard]
  },
  { 
    path: "login", 
    component: LoginComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [NoLogueadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
