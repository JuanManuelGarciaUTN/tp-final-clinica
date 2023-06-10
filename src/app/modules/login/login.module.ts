import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { DirectivasModule } from '../directivas/directivas.module';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        DirectivasModule
    ]
})
export class LoginModule { }
