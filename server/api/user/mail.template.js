"use strict";

/**
 *	template for invitation email
 *	@return minified html string for email
 */
module.exports.getEmailView = (url) => {
	return '<!DOCTYPE html><html><head></head><body><h3>Please visit this link for the interview - </h3><a href="'+url+'"> Take Interview </a><br><br><h4>Or open this link in a browser.</h4><span>'+url+'</span></body></html>';
}
