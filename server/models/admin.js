"use strict";

let bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false,
			unique : true
        },
		password : {
            type : DataTypes.STRING,
            allowNull : false
        },
		is_active : {
			type : DataTypes.BOOLEAN,
			defaultValue : true
		}
    });

    return Admin;
}
