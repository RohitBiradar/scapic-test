"use strict";

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("question", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        question : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        options : {
			type : DataTypes.ARRAY(DataTypes.STRING),
            allowNull : false
		},
		answer : {
			type : DataTypes.STRING,
            allowNull : false
		}
    });

	Question.isCorrectAnswer = (id, ans) => {
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
		});
	}

    return Question;
}
