export class RegisterRequest {
  constructor(
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public username: string,
    public birthDate: Date,
    public gender: string
  ) {}
}
