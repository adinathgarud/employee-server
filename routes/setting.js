import express from 'express'
import authMiddelware from '../middleware/authMiddleware.js'
import { changePassword } from '../controllers/settingController.js'


const router = express.Router()


 router.put('/change-password', changePassword )
 
    

export default router
