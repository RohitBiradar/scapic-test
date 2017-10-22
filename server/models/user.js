"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
			unique : true
        },
		token : {
            type : DataTypes.STRING,
            allowNull : false
        },
		hasStarted : {
			type : DataTypes.BOOLEAN,
            defaultValue : false
		},
		startedAt : {
			type : DataTypes.DATE,
			allowNull : true
		},
		hasSubmitted : {
			type : DataTypes.BOOLEAN,
            defaultValue : false
		},
		submittedAt : {
			type : DataTypes.DATE,
			allowNull : true
		}
    });

	User.invite = function(email, token) {
		return User.create({
			email,
			token
		});
	}
	User.getUser = function(token, email) {
		return User.findOne({
			where : {
				token,
				email
			}
		});
	}
	User.setStarted = function(userId) {
		return User.update({
			hasStarted : true,
			startedAt : new Date()
		},{
			where : {
				id : userId
			}
		});
	}
    return User;
}
