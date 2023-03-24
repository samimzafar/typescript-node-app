import { Request, Response } from "express";
import Models from "../models";
import { tutorialSchemas } from "../schemas/tutorial";
import { customReqI } from "../types/custom.t";
const { Tutorials, sequelize, Op } = Models;
import { tutorialCreateI } from "../types/tutorial.t";

export default {

  create: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      let { title, description, published }: tutorialCreateI = req.body;
      await tutorialSchemas.create.validateAsync({ title, description, published });
      const tutorial = await Tutorials.create(
        { title, description, published }, { transaction });
      await transaction.commit();
      res.status(200).send({ tutorial });
    } catch (err: any) {
      await transaction.rollback();
      res
        .status(err.status || err.statusCode || 500)
        .send(err.message || "Something went wrong while creating tutorial");
    }
  },

  getAll: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const tutorial = await Tutorials.findAll();
      if (tutorial) {
        await transaction.commit();
        res.send({
          status: 200,
          success: true,
          message: "Tutorial fetched successfully.",
          data: tutorial
        });
      }
      else {
        await transaction.rollback();
        res.send({
          status: 400,
          success: false,
          message: "Tutorials not found.",
        });
      }
    } catch (error: any) {
      await transaction.rollback();
      res
        .status(error.status || error.statusCode || 500)
        .send(error.message || "Something went wrong while getting Tutorials");
    }
  },

  getById: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const tutorial = await Tutorials.findByPk(id, { transaction });
      if (tutorial) {
        await transaction.commit();
        res.send({
          status: 200,
          success: true,
          message: "Tutorial fetched successfully.",
          data: tutorial
        });
      }
      else {
        await transaction.rollback();
        res.send({
          status: 400,
          success: false,
          message: "Tutorial not found By ID.",
        });
      }
    } catch (error: any) {
      await transaction.rollback();
      res
        .status(error.status || error.statusCode || 500)
        .send(error.message || "Something went wrong while getting Tutorials");
    }
  },

  update: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      let { title, description, published }: tutorialCreateI = req.body;
      const tutorial = await Tutorials.findByPk(id);
      if (tutorial) {
        const updatedTutorial = await tutorial.update({ title, description, published })
        await transaction.commit();
        res.send({
          status: 200,
          success: true,
          message: "Tutorial updated successfully.",
          data: updatedTutorial
        });
      }
      else {
        await transaction.rollback();
        res.send({
          status: 400,
          success: false,
          message: "Tutorial not found .",
        });
      }
    } catch (error: any) {
      await transaction.rollback();
      res
        .status(error.status || error.statusCode || 500)
        .send(error.message || "Something went wrong while getting Tutorials");
    }
  },

  findAllPublished: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const tutorial = await Tutorials.findAll({ where: { published: true } })
      if (tutorial) {
        await transaction.commit();
        res.send({
          status: 200,
          success: true,
          message: "Published Tutorials fetched successfully.",
          data: tutorial
        });
      }
      else {
        await transaction.rollback();
        res.status(400).send({
          status: 400,
          success: false,
          message: "Tutorial not found .",
        });
      }
    } catch (error: any) {
      await transaction.rollback();
      res
        .status(error.status || error.statusCode || 500)
        .send(error.message || "Something went wrong while getting Tutorials");
    }
  },

  delete: async (req: customReqI, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const tutorial = await Tutorials.destroy({ where: { id } });
      if (tutorial) {
        await transaction.commit();
        res.send({
          status: 200,
          success: true,
          message: "Tutorial deleted successfully.",
        });
      }
      else {
        await transaction.rollback();
        res.status(400).send({
          status: 400,
          success: false,
          message: "Tutorial not exists .",
        });
      }
    } catch (error: any) {
      await transaction.rollback();
      res
        .status(error.status || error.statusCode || 500)
        .send(error.message || "Something went wrong while getting Tutorials");
    }
  },
};