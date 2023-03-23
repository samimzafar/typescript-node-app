import { Request, Response } from "express";
import Models from "../models";
import { userSchemas } from "../schemas/user";
import { customReqI } from "../types/custom.t";
const { Users, sequelize } = Models;
import { userCreateI } from "../types/user.t";

export default {
  create: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      let { phone_number, country }: userCreateI = req.body;
      console.log("🚀 ~ file: user.ts:17 ~ create: ~ req.body:", req.body)
      await userSchemas.create.validateAsync({ phoneNumber:phone_number, country });
      const user = await Users.create(
        { phone_number: phone_number, country }, { transaction });
      await transaction.commit();
      res.status(200).send({ user });
    } catch (err: any) {
      await transaction.rollback();
      res
        .status(err.status || err.statusCode || 500)
        .send(err.message || "Something went wrong while signing up user");
    }
  }
};