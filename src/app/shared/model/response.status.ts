import {Errors} from './errors';

export class ResponseStatus {
  constructor(
    public code: number,
    public errors: Errors
  ) {}
}
