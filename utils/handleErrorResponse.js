const handleErrorResponse = (h, err) => {
  let { message, name, code } = err;
  if(!code) code = 422
  if(!message){
    console.log('Missing message for error display !', message);
  }
  console.log(`error ${code} : ${name} - ${message}`);
  return h.response({ error: `${name} - ${message}` }).code(code).takeover();
};
module.exports = handleErrorResponse
