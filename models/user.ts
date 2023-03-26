"use strict";
import moment from "moment";
import { Sequelize, Model, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  class User extends Model {
    static isUser = async (value: string): Promise<string> => {
      try {
        const isExists: User | null = await User.findOne();
        if (isExists) {
          throw {};
        }
        return value;
      } catch (error) {
        throw { status: 401, message: `User already exists` };
      }
    };
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      country: {
        type: DataTypes.STRING,
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
      modelName: "users",
    }
  );

  User.beforeCreate((user: any) => {
    user.dataValues.createdAt = moment().unix();
    user.dataValues.updatedAt = moment().unix();
  });

  User.beforeUpdate((user: any) => {
    user.dataValues.updatedAt = moment().unix();
  });

  User.afterCreate(async (user: any, options) => {
    const username = `${user.username}_${user.id}`;
    await user.update(
      {
        username,
      },
      { transaction: options.transaction }
    );
  });
  return User;
};
