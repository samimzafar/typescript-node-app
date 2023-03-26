import { Router } from "express";
const router: Router = Router({ mergeParams: true });

import controller from "../controllers/user";

router.post("/create", controller.create);
export default router;
