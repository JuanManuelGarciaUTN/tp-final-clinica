import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { LoginComponent } from './modules/login/login.component';
import { NoLogueadoGuard } from './guards/no-logueado.guard';
import { AdminNologueadoGuard } from './guards/admin-nologueado.guard';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { LogueadoGuard } from './guards/logueado.guard';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: "", component:BienvenidaComponent},
  { path: "home", component:BienvenidaComponent},
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
  },
  { 
    path: "perfil", 
    component: PerfilComponent,
    loadChildren: () => import('./modules/perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [LogueadoGuard]
  },
  { 
    path: "detalles-usuarios", 
    component: UsuariosComponent,
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
    //canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
