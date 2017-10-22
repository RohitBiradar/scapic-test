'use strict';

module.exports = {
	SPACE : ' ',
	EMPTY_STRING : '',
    error : {
		AUTH_ERROR : "Authentication failed.",
	    INTERNAL_ERROR : "Internal Server Error.",
	    JWT_FAILURE : "JWT token is not verified.",
	    WRONG_CREDENTIALS : "Wrong credentials.",
        SOMETHING  : "Something went wrong.",
        MISSING_TOKEN : 'Authorization token is missing.',
		MISSING_FIELDS : 'Missing fields.',
		USER_UNKNOWN : 'Unknown user.',
		WRONG_PASSWORD : "Wrong password."
    },
    message : {
    	PASSWORD_CHANGED : "Password changed successfully.",
        LINK_SENT : "Link sent successfully.",
		ALREADY_INVITED : "User already invited."
    },
    emailSubject : {
        QUIZ : "Please take the quiz."
    }
}
