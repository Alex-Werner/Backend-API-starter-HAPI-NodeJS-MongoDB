class Error400BadRequest extends Error {
  constructor(message = '') {
    super();
    this.name= "Error400BadRequest";
    this.code = 400; //BadRequest
    this.message = message;
  }
};
module.exports = Error400BadRequest;
