import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule} from '@angular/fire/compat';
import { DniFormatoPipe } from './pipes/dni-formato.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BienvenidaComponent,
    DniFormatoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    AngularFireModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

