import { Router } from "express";
const router: Router = Router({ mergeParams: true });

import controller from "../controllers/user";

router.post("/create", controller.create);
// router.post("/create", () => console.log("HEREEE"));

export default router;
