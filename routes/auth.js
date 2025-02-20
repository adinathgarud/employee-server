import express from "express"
import { login, verify } from "../controllers/authController.js"
import authMiddelware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddelware, verify)

export default router 