import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar:{type : String,required:false,default:""},
    role:{type : String,required:false,default:"member"},
   
});

export const PersonModel = mongoose.model('Person', PersonSchema)
