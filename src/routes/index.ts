import * as express from "express";
import {IndexController} from "../controllers/index-controller";

const router = express.Router()
const controller = new IndexController()

router.get("/", controller.handleIndex)

export {router as indexRouter}
