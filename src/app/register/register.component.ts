import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { AuthService } from '../shared/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import { RegisterRequest } from '../shared/model/register.request'
import {NgForOf, NgIf} from '@angular/common';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {Gender, Gender2LabelMapping} from './gender.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    NgIf,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm?: FormGroup|null;
  private emailField: AbstractControl<any>|null = null;
  private passwordField: AbstractControl<any>|null = null;
  private confirmPasswordField: AbstractControl<any>|null = null;
  private birthDateField: AbstractControl<string>|null = null;
  emailIsUnique: boolean|null = null;
  lastEmail: string|null = null;
  failOfRegistration: boolean = false;
  genderField: AbstractControl<any>|null = null;
  public genderOptions = [Gender.MALE, Gender.FEMALE];

  constructor(private authService: AuthService,
              private router: Router,
              private translator: TranslateService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailIsUniqueCheck()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.passwordCheck()]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      birthDate: ['', [Validators.required, this.birthdateCheck()]],
      gender: ['', [Validators.required]]
    }, {});
    this.emailField = this.registerForm.controls['email'];
    this.passwordField = this.registerForm.controls['email'];
    this.confirmPasswordField = this.registerForm.controls['email'];
    this.birthDateField = this.registerForm.controls['birthDate'];
    this.genderField = this.registerForm.controls['gender'];
  }

  register(){
    this.failOfRegistration = false;
    this.emailIsUnique = null;
    this.lastEmail = this.registerForm?.controls?.email.value;
    this.authService.registerUser(this.registerForm, new RegisterRequest(
      this.registerForm?.controls?.email.value,
      this.registerForm?.controls?.password.value,
      this.registerForm?.controls?.firstname.value,
      this.registerForm?.controls?.lastname.value,
      this.registerForm?.controls?.username.value,
      new Date(this.registerForm?.controls?.birthDate.value),
      this.registerForm?.controls?.gender.value
    ))
      .pipe(catchError((error: any) => {
        this.failOfRegistration = true;
          if (error?.error?.formErrors?.fieldsErrors?.email.includes("VALUE_SHOULD_BE_UNIQUE")) {
            this.emailIsUnique = false;
            this.emailField?.updateValueAndValidity();
          }
          return throwError(() => new Error('Wystąpił błąd w procesie rejestracji'));
        }))
      .subscribe();
  }

  passwordCheck(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.parent) {
        const password = this.passwordField;
        const confirmPassword = this.confirmPasswordField;

        return password?.value !== confirmPassword?.value? { passwordMismatch: true }: null;
      }
      return null;
    };
  }

  birthdateCheck(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.parent) {
        const date = this.birthDateField?.value;
        if (date != null) {
          const trueDate = new Date(date);
          if (trueDate.getTime() > new Date().getTime()) {
            return { dateShouldBeInThePast: true }
          }

          const age = this.calculateAge(trueDate);
          if (age > 150) {
            return { personIsToOld: true }
          }
        }
      }
      return null;
    }
  }

  emailIsUniqueCheck(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      return false === this.emailIsUnique && c.value === this.lastEmail
        ? { emailIsNotUnique: true }
        : null;
    };
  }

  calculateAge(date: Date): number {
    const timeDiff = Math.abs(Date.now() - date.getTime());
    const age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  genderLabel(label: Gender): string {
    return Gender2LabelMapping[label];
  }
}
