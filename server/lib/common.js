'use strict';

module.exports.sendResponse = (res, code, data) => {
	data = data || {};
	let response = {};
	response.status = data.status || false;
	response.message = data.message;
    response.error = data.error;
    response.data = data.data;
    if(data.token)
		response.token = data.token;
    res.status(code).json(response);
    return false;
}
module.exports.isValidEmail = (email) => {
  /* Rules
  *  @ once
  *  after last . only 2+ char : .in,.com.info ---> .
  *  special char . _ - allowed
  *  continuous special char not allowed
  */
  const EMAIL_REGEX = /^[A-Z0-9._]+@[A-Z0-9.-]+\.[A-Z]{2,}/igm;
	if(EMAIL_REGEX.test(email))
		return true;
	return false;
}
