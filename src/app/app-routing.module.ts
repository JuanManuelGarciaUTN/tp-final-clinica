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
import { GestionarHorariosComponent } from './modules/gestionar-horarios/gestionar-horarios.component';
import { EspecialistaGuard } from './guards/especialista.guard';
import { SolicitarTurnoComponent } from './modules/solicitar-turno/solicitar-turno.component';
import { AdminComponent } from './modules/solicitar-turno/admin/admin.component';
import { HistorialTurnosComponent } from './modules/historial-turnos/historial-turnos.component';
import { HistoriaClinicaComponent } from './modules/historia-clinica/historia-clinica.component';
import { EspecialistaComponent } from './modules/historia-clinica/especialista/especialista.component';

const routes: Routes = [
  { path: "", component:BienvenidaComponent, canActivate: [NoLogueadoGuard]},
  { path: "home", component:BienvenidaComponent, canActivate: [NoLogueadoGuard]},
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
    canActivate: [AdminGuard]
  },
  { 
    path: "gestionar-horarios", 
    component: GestionarHorariosComponent,
    loadChildren: () => import('./modules/gestionar-horarios/gestionar-horarios.module').then(m => m.GestionarHorariosModule),
    canActivate: [EspecialistaGuard]
  },
  { 
    path: "solicitar-turno", 
    component: SolicitarTurnoComponent,
    loadChildren: () => import('./modules/solicitar-turno/solicitar-turno.module').then(m => m.SolicitarTurnoModule),
    //canActivate: [EspecialistaGuard]
  },
  { 
    path: "solicitar-turno/admin", 
    component: AdminComponent,
    loadChildren: () => import('./modules/solicitar-turno/solicitar-turno.module').then(m => m.SolicitarTurnoModule),
    //canActivate: [EspecialistaGuard]
  },
  { 
    path: "historial-turnos", 
    component: HistorialTurnosComponent,
    loadChildren: () => import('./modules/historial-turnos/historial-turnos.module').then(m => m.HistorialTurnosModule),
    //canActivate: [EspecialistaGuard]
  },
  { 
    path: "historia-clinica", 
    component: HistoriaClinicaComponent,
    loadChildren: () => import('./modules/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule),
    //canActivate: [EspecialistaGuard]
  },
  { 
    path: "pacientes", 
    component: EspecialistaComponent,
    loadChildren: () => import('./modules/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule),
    //canActivate: [EspecialistaGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
