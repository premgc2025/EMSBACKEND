import mongoose from 'mongoose'


const DBMS =  mongoose.connect(`${process.env.mongoDBURL}/EMS`)
.then((res)=>{
    console.log("DBMS Server Up and Running")
})
.catch((err)=>{console.log(err)})

export default DBMS