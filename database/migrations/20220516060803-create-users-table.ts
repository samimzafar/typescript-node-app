"use strict";

import { DataTypes } from "sequelize";
import { QueryInterface } from "sequelize/types";

const table: string = "users";

module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable(table, {
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
    });
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(table);
  },
};