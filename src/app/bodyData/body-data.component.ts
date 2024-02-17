import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService} from '@ngx-translate/core';
import { AuthService } from '../shared/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ApiService} from '../http/api.service';
import {BodyDataModel, CreateBodyDataModel} from './body-data-model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {BmiStatus, BmiStatus2LabelMapping} from '../register/bmi.status.model';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    DatePipe,
    MatPaginator,
    NgClass
  ],
  templateUrl: './body-data.component.html',
  styleUrls: ['./body-data.component.scss']
})
export class BodyDataComponent implements OnInit {
  bodyDataForm: FormGroup|null = null;

  private heightField: AbstractControl<number>|null = null;
  private weightField: AbstractControl<number>|null = null;
  private fatFreeMassField: AbstractControl<number>|null = null;
  bodyData: BodyDataModel[] = [];
  displayedColumns:string[] = ["index", "height", "weight", "fatFreeMass", "createDate"];
  ppmMifflin: number|null = null;
  bmi: number|null = null;
  bmiStatus: string|null = null;


  constructor(private authService: AuthService,
              private router: Router,
              private translator: TranslateService,
              private fb: FormBuilder,
              private api: ApiService) {}

  ngOnInit(): void {
    this.bodyDataForm = this.fb.group({
      height: ['', [Validators.required, Validators.max(300), Validators.min(10)]],
      weight: ['', [Validators.required, Validators.max(1000), Validators.min(0)]],
      fatFreeMass: ['', [this.fatFreeMassCheck()]]
    }, {});
    this.heightField = this.bodyDataForm.controls['height'];
    this.weightField = this.bodyDataForm.controls['weight'];
    this.fatFreeMassField = this.bodyDataForm.controls['fatFreeMass'];
    this.api.getBodyData().subscribe(resp => {
      this.bodyData = resp;
      if (this.bodyData !== null && this.bodyData.length > 0) {
        this.heightField?.setValue(this.bodyData[0].height);
      }
    });
    this.onChanges();
  }

  onChanges(): void {
    this.bodyDataForm?.valueChanges.subscribe(() => {
      if (!this.isEmpty(this.heightField?.value) && !this.isEmpty(this.weightField?.value)) {
        this.api.getAdvanceBodyData({
          height: this.heightField?.value as number,
          weight: this.weightField?.value as number,
          fatFreeMass: !this.isEmpty(this.fatFreeMassField?.value) ? this.fatFreeMassField?.value as number : null
        }).subscribe(val => {
          this.bmi = val.bmi;
          this.bmiStatus = val.bmiStatus;
          this.ppmMifflin = val.ppmMifflin
        })
      } else {
        this.bmi = null;
        this.bmiStatus = null;
        this.ppmMifflin = null;
      }
    });
  }
  add(){
    this.api.addBodyData(new CreateBodyDataModel(
      this.heightField?.value as number,
      this.weightField?.value as number,
      this.fatFreeMassField?.value as number
    )).subscribe(() => {
      this.ngOnInit();
    })
  }

  getBmiLabels(bmiStatus: string) {
    switch (bmiStatus) {
      case "STARVATION":
        return BmiStatus2LabelMapping[BmiStatus.STARVATION];
      case "EMACIATED":
        return BmiStatus2LabelMapping[BmiStatus.EMACIATED];
      case "UNDERWEIGHT":
        return BmiStatus2LabelMapping[BmiStatus.UNDERWEIGHT];
      case "NORMAL":
        return BmiStatus2LabelMapping[BmiStatus.NORMAL];
      case "OVERWEIGHT":
        return BmiStatus2LabelMapping[BmiStatus.OVERWEIGHT];
      case "OBESITY1":
        return BmiStatus2LabelMapping[BmiStatus.OBESITY1];
      case "OBESITY2":
        return BmiStatus2LabelMapping[BmiStatus.OBESITY2];
      case "OBESITY3":
        return BmiStatus2LabelMapping[BmiStatus.OBESITY3];
      default:
        return "";
    }
  }

  private isEmpty(val: any): boolean {
    return val === null || val === "";
  }

  fatFreeMassCheck(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const value = this.fatFreeMassField?.value;
      if (!this.isEmpty(value) && value !== 0) {
        if ((this.fatFreeMassField?.value as number) > 0) {
          return { fatFreeMassShouldBePositive: true}
        }

        if ((this.fatFreeMassField?.value as number) < (this.weightField?.value as number)) {
          return { fatFreeMassShouldBeLessThanWeight: true}
        }
      }

      return null;
    };
  }

}
