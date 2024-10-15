import express from 'express'
import bcrypt from 'bcrypt'
import registerModel from '../Model/RegisterModel.js'
import multer from 'multer'
import path from 'path'
import employeeModel from '../Model/EmployeeModel.js'
import departmentModel from '../Model/DepartmentModel.js'

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'public/image')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({storage:storage})

const AddEmployeeController = async (req,res)=>{
   
    try{
    const {
        name,
        email,
        password,
        role, 
        age,
        employeeId,
        dob,
        gender,
        maritalstatus,
        designation,
        salary,
        departmentId
    } = req.body
    

            const newEmail = await registerModel.findOne({email:email})
            if(newEmail){
                res.status(404).send({success:false, message:"Email is already exist"})
            }
            else{
                
                const newUser = new registerModel( {
                    name,
                    email,
                    password,
                    role,
                    age,
                    profileImage: req.file ? req.file.filename : "",
                })
             
              const saltRounds = 10;
               bcrypt.genSalt(saltRounds, (err, salt)=>{
                    if(!err){
                        bcrypt.hash(password, salt,async(err,hash)=>{
                            if(!err){
                               newUser.password = hash;
        
                                try{
                                    const userData = await registerModel.create(newUser)

                                    const newEmp = new employeeModel({
                                        userId:userData._id,
                                        employeeId,
                                        dob,
                                        gender,
                                        maritalstatus,
                                        designation,
                                        departmentId,
                                        salary

                                    })
                                       
                                    const empData = await employeeModel.create(newEmp)
                                    
                                    res.status(200).send({success:true, message:"Successfully Created Employee Profile"})
        
                                }
                                catch(err){
                                    res.status(500).send(err)
                                } 
                            }
                            else{
                                res.send({ Message: "Some error while hashing passwword" })
                            }
                        })
                    }
                    else{
                        res.send({success:false ,error:"Some error while bcrypt passwword"})
                    }
                })
            }
            }   catch(err){
                res.status(500).send(err.message,err)
            } 
        
            }
             
//  Get Data 

const GetEmployeeController = async(req,res)=>{
    try{

        const getEmployee = await employeeModel.find().populate('userId',{password:0}).populate('departmentId')
        res.status(200).send({success:true, getEmployee})

    }
    catch (error) {
            
             
        res.status(403).send({success:false , error:error.message, })
 
    }
    
}

//  Get Single Data 

const GetSingleEmployeeController = async(req,res)=>{
    try{
        const {id} = req.params
       
        let getEmployee;
        getEmployee = await employeeModel.findOne({_id:id}).populate('userId',{password:0}).populate('departmentId')
        if(!getEmployee){
            getEmployee = await employeeModel.findOne({userId:id}).populate('userId',{password:0}).populate('departmentId')

        }
   
        res.status(200).send({success:true, getEmployee})
       
    }
    catch (error) {
            console.log("err",error, error.message)
             
        res.status(403).send({success:false , error:error.message, })
 
    }
    
}

// Edit Employee Controller

const EditEmployeeController =async(req, res)=>{
  

    try {
        const {id} = req.params;
        const {
            name,          
            employeeId,        
            gender,        
            designation,
            salary,
            departmentId
        } = req.body
        const employeeData = {
            employeeId,        
            gender,        
            designation,
            salary,
            departmentId
        }
 
        

        if(employeeData){
            const newemployeeData =await employeeModel.findOne({_id:id})
         
            const newnameData = await registerModel.findOne({_id:newemployeeData.userId})
          
            const nameData = await registerModel.updateOne({_id:newemployeeData.userId},{name})
      
          
            const updateEmployee = await employeeModel.updateOne({_id:id},employeeData)
            res.status(200).send({success:true, message:"Updated Successfully"})
        }
    }
    catch (error) {
        console.log("err",error, error.message)
         
    res.status(403).send({success:false , error:error.message, })

}
  
}

// Get EmployeeId by Department
const GetEmployeeByDepartment = async(req,res)=>{
    

    try{
        const {id} = req.params
    if(id==="undefined"){
        res.status(400).send({success:false, message:"Invalide Dept ID"})
       

    }  
    else{
       
       const getEmployee = await employeeModel.find({departmentId:id})
  
       res.status(200).send({success:true, getEmployee})
       if(!getEmployee){
        res.status(400).send({success:false, message:"Invalide Dept ID"})
       }


    }   
    
       
    }
    catch (error) {
            console.log("err",error, error.message)
             
        res.status(403).send({success:false , error:error.message, })
 
    }
    
}


       

export  {AddEmployeeController,upload, GetEmployeeController, GetSingleEmployeeController, EditEmployeeController, GetEmployeeByDepartment};