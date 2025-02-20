import express from 'express'
import authMiddelware from '../middleware/authMiddleware.js'
import { addLeave , getLeave, getLeaves, getLeaveDetail, updateLeave} from '../controllers/leaveController.js'


const router = express.Router()


 router.post('/add', addLeave)
 router.get('/detail/:id', getLeaveDetail)
 router.get('/:id/:role', getLeave)
 
 router.get('/', getLeaves)
 router.put('/:id', updateLeave) 

     

export default router
