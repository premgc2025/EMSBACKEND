import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import handler from './Router/handler.js';



const app = express()

app.use(handler)

app.use(express.json())
app.use(express.static('public/image'))


// Imporing Model and Function
import abc from './Router/test.js'
import router from './Router/RegisterRouter.js'
import deptRouter from './Router/DepartmentRouter.js'
import empRouter from './Router/EmployeeRouter.js'
import salaryRouter from './Router/SalaryRouter.js'
import leaveRouter from './Router/LeaveRouter.js'
import resetpasswordRouter from './Router/ResetPasswordRouter.js'
import adminsummaryRouter from './Router/AdminSummaryRouter.js'



app.use('/',router)
app.use('/api',deptRouter)
app.use('/api', empRouter)
app.use('/api', salaryRouter)
app.use('/api', leaveRouter)
app.use('/api', resetpasswordRouter)
app.use('/api', adminsummaryRouter)


app.get('/', (req,res)=>{
    res.send({message:"Hello Wolrd! "})
})



mongoose.connect(`${process.env.mongo_URL}/EMS`)
.then((response)=>{
    console.log("DBMS Server is Up and Running")
})
.catch((err)=>{
    console.log(err)
})


app.listen(process.env.PORT,()=>{
    console.log(`Server Up and Running on PORT ${process.env.PORT}`)
})
