import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SpinnerModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class LoginModule { }
