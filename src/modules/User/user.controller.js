import { Router } from "express";
import * as userService from "./user.services.js";
const router = Router();

router.post("/signUp",userService.signUp)
router.post("/login" , userService.login)
router.patch("/:id" , userService.updateUser)
router.delete("/" , userService.deleteUser)
router.get("/" , userService.getSpecificUser)

export default router;