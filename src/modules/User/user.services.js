import { userModel } from "../../DB/Models/user.model.js"

export const signUp = async (req , res) => {
    try{
    const existUser = await userModel.findOne({
        email : req.body.email
    })
    if (existUser) {
    return res.status(400).json({message: "User already exits"})

    }
    const user = await userModel.create(req.body)
    return res.status(201).json({message: "User created successfully", user})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const login = async (req , res)=> {
try {
    const {email , password} = req.body
    const user = await userModel.findOne({
    email , password
})
if (user) {
    return res.status(200).json({message : "Login successful"})
}
    return res.status(404).json({message : "Invalid email or password"})
} catch (error) {
    return res.status(500).json({message : error.message})
}

}

export const updateUser = async(req , res) =>{
try {
    const {name , email , age} = req.body
const {id} = req.params
const existEamil = await userModel.findOne({email})
const existUser = await userModel.findById(id)
if (!existUser) {
    return res.status(404).json({message : "user is not found"})
}
if (existEamil) {
        return res.status(404).json({message : "Email already exists"})
}
const updatedUser = await userModel.updateOne({_id : id} , {
    $set : {
        name , email , age

    } ,
    $inc : {"__v" : 1}
    
})
    return res.status(200).json({message : "user is updated" , updatedUser})
} catch (error) {
        return res.status(500).json({message : error.message})

}
}
export const deleteUser = async (req , res) =>{
try {
    const {id} = req.query 
    const user = await userModel.findById(id)
    if (!user) {
        return res.status(404).json({message : "user is not found"})
    }
    const userDeleted = await userModel.deleteOne({_id : id})
    return res.status(200).json({message : "user is deleted" , userDeleted})
    
} catch (error) {
    return res.status(500).json({message : error.message})
}


}
export const getSpecificUser = async (req, res)=>{
try {
    const {id} = req.query
    const user = await userModel.findById(id)
    if (!user) {
    return res.status(404).json({message : "user is not found"})
    }
     return res.status(200).json({message : "user is found" , user})
} catch (error) {
    return res.status(500).json({message : error.message})
}
}