class Error409Conflict extends Error {
  constructor() {
    super();
    this.name= "Error409Conflict";
    this.code = 409; //Conflict
  }
};
module.exports = Error409Conflict;
