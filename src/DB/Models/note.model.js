import { model, Schema } from "mongoose";

const noteSchema = new Schema({
title: {
    type: String,
    required: true , 
    validate: {
        validator : (value) => {
            return value !== value.toUpperCase();
        }
    }
} ,
content: {
    type: String,
    required: true 
} , 
userId : {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
}

} , { timestamps: true });
export const noteModel = model("Note" , noteSchema);