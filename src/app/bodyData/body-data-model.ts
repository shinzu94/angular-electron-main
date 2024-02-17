import {Gender} from '../register/gender.model';

export class BaseBodyDataModel {
  height: number;
  weight: number;
  fatFreeMass: number;

  constructor(height: number, weight: number, fatFreeMass: number) {
    this.height = height;
    this.weight = weight;
    this.fatFreeMass = fatFreeMass;
  }
}


export class BodyDataModel extends BaseBodyDataModel {
  createDate: Date

  constructor(height: number, weight: number, fatFreeMass: number, createDate: Date) {
    super(height, weight, fatFreeMass);
    this.createDate = createDate;
  }
}


export class CreateBodyDataModel extends BaseBodyDataModel {

  constructor(height: number, weight: number, fatFreeMass: number) {
    super(height, weight, fatFreeMass);
  }
}

export class CalculateAdvanceBodyData {
  constructor(public height: number, public weight: number, public fatFreeMass: number|null) {
  }
}

export class AdvanceBodyDataDto {

  constructor(public bmi: number, public bmiStatus: string, public ppmMifflin: number) {
  }
}

