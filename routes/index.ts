import { Router } from "express";
const router: Router = Router();

// Routers
import tutorialRouter from "./tutorial";
router.use("/tutorials", tutorialRouter);

export default router;
