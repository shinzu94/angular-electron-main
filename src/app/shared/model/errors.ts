
export class Errors {
  constructor(
    public errors: [string],
    public fieldErrors: Map<string, [string]>
  ) {}
}
