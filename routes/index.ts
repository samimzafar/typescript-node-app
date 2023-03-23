import { Router } from "express";
const router: Router = Router();

// Routers

import userRouter from "./user";
import tutorialRouter from "./tutorial";
router.use("/users", userRouter);
router.use("/tutorials", tutorialRouter);

export default router;
