/* eslint-disable @typescript-eslint/no-inferrable-types */
export class ApplicationException extends Error {
  constructor(message: string = 'Unexpected error') {
    super(message);
  }
}