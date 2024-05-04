export class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'Not found Error';
    this.message = message;
  }
}
