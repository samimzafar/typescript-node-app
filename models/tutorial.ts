"use strict";
import moment from "moment";
import { Sequelize, Model, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
 class Tutorial extends Model {
  static isTutorial = async (value: string): Promise<string> => {
   try {
    const isExists: Tutorial | null = await Tutorial.findOne();
    if (isExists) {
     throw {};
    }
    return value;
   } catch (error) {
    throw { status: 401, message: `Tutorial already exists` };
   }
  };
 }
 Tutorial.init(
  {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
   },
   title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
   },
   description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
   },
   published: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
   },
   createdAt: {
    allowNull: false,
    type: DataTypes.INTEGER,
   },
   updatedAt: {
    allowNull: false,
    type: DataTypes.INTEGER,
   },
  },
  {
   sequelize,
   modelName: "tutorials",
  }
 );

 Tutorial.beforeCreate((tutorial: any) => {
  tutorial.dataValues.createdAt = moment().unix();
  tutorial.dataValues.updatedAt = moment().unix();
 });

 Tutorial.beforeUpdate((tutorial: any) => {
  tutorial.dataValues.updatedAt = moment().unix();
 });

 return Tutorial;
};
