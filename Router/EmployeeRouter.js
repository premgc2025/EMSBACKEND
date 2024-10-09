
import express from 'express'
import verifyToken from '../Controller/VerifyToken.js'
import { AddEmployeeController, EditEmployeeController, GetEmployeeByDepartment, GetEmployeeController, GetSingleEmployeeController, upload } from '../Controller/EmployeeController.js'

const router = express.Router()


router.post('/employee',verifyToken,upload.single('image'),AddEmployeeController)
router.put('/employee/:id',verifyToken,EditEmployeeController)
router.get('/employee',verifyToken, GetEmployeeController)
router.get('/employee/:id',verifyToken, GetSingleEmployeeController)
router.get('/employeeid/:id',verifyToken, GetEmployeeByDepartment)


export default router;