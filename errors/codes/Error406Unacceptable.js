class Error406Unacceptable extends Error {
  constructor() {
    super();
    this.name= "Error406Unacceptable";
    this.code = 406; //Unaceptable
  }
};
module.exports = Error406Unacceptable;
