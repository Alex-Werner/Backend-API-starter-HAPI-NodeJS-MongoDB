const Error409Conflict = require('./codes/Error409Conflict');
class DuplicateEntryError extends Error409Conflict {
  constructor(reason = 'contact support.') {
    super();
    this.name= "DuplicateEntryError";
    this.message = `Conflict - reason: ${reason}`;
  }
};
module.exports = DuplicateEntryError;
