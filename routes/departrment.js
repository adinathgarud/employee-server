import express from 'express'
import authMiddelware from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js'

const router = express.Router()

router.get('/',  getDepartments)
router.post('/add', addDepartment)
router.get('/:id', getDepartment)
router.put('/:id', updateDepartment)
router.delete('/:id', deleteDepartment)
    

export default router
