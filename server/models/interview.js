"use strict";

module.exports = (sequelize, DataTypes) => {
    const Interview = sequelize.define("interview", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
		answer : {
            type : DataTypes.STRING,
            allowNull : true
        }
    });

	Interview.associate = model => {
		let User = model.user;
		let Question = model.question;
		Interview.belongsTo(User);
		User.hasMany(Interview);
		Interview.belongsTo(Question);
	}
    return Interview;
}
