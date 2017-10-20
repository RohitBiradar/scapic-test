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
            allowNull : false
		},
		hasSubmitted : {
			type : DataTypes.BOOLEAN,
            allowNull : false
		}
    },{
        classMethods : {
            isCorrectAnswer(id, ans) {
				return Question.findOne({
					where : {
						id
					}
				})
				.then(qst => {
					if(qst){
						if(qst.answer.toLowerCase() === ans.toLowerCase())
							return true;
						return false;
					}
					return false;
				})
            },
			get5Randoms() {
				return Question.findAll({
					limit : 5,
					order : 'random()'
				})
			}
		}
	});
    return User;
}
