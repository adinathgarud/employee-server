import express from 'express'
import authMiddelware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeeByDepId} from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', getEmployees)
router.post('/add', upload.single('image'), addEmployee)
router.get('/:id', getEmployee)
router.put('/:id', updateEmployee)
router.get('/department/:id', fetchEmployeeByDepId)

    

export default router
