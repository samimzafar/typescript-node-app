import { Request } from "express";
import { InferAttributes } from "sequelize/types";
import Models from "../models";
const { Users } = Models;

export interface customReqI extends Request {
  params: any;
  query: any;
  log?: any;
  isAccessibleViaRole?: boolean;
  user?: InferAttributes<typeof Users>;
  admin?: InferAttributes<typeof Users>;
}
