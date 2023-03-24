import { Router } from "express";
const router: Router = Router({ mergeParams: true });

import controller from "../controllers/tutorial";
router.post("/", controller.create);
router.get("/published", controller.findAllPublished);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
