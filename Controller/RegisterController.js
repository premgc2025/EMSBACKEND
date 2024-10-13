import express from 'express'
import bcrypt from 'bcrypt'
import registerModel from '../Model/RegisterModel.js'


const RegisterController = (req,res)=>{

  
    
        const regDetail = req.body       
      const saltRounds = 10;
       bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(!err){
                bcrypt.hash(regDetail.password, salt,async(err,hash)=>{
                    if(!err){
                        regDetail.password = hash;

                        try{
                            const regData = await registerModel.create(regDetail)
                           
                            res.status(200).send({success:true, message:"Successfully Created User"})

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

export default RegisterController;