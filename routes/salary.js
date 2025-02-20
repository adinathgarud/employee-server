import express from 'express'
import authMiddelware from '../middleware/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'


const router = express.Router()


 router.post('/add', addSalary)
 router.get('/:id/:role', getSalary)


    

export default router
