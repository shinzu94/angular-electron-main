import {Gender} from '../register/gender.model';

export class UserModel {


  constructor(
    public firstname: string,
    public lastname: string,
    public username: string,
    public email: string,
    public lastHeight: number,
    public gender: Gender,
    public birthDate: Date
  ) {
  }
}

