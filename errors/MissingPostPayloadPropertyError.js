const Error406Unacceptable = require('./codes/Error406Unacceptable');

class MissingPostPayloadPropertyError extends Error406Unacceptable {
  constructor(propertyName, type) {
    super();
    this.name= "MissingPostPayloadPropertyError";
    this.message = `Missing post property: ${propertyName} of type ${type}`;
  }
};
module.exports = MissingPostPayloadPropertyError;
