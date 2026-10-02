import { userModel } from "../../DB/Models/user.model.js";
import { noteModel } from "../../DB/Models/note.model.js";
export const createNote = async (req ,res)=>{
try {
const {id} = req.query
const user = await userModel.findById(id)
if (!user) {
    return res.status(404).json({message : "user is not found"})
}
const note = await noteModel.create({...req.body , userId : id})
return res.status(201).json({message : "created Successfully" , note})
} catch (error) {
    return res.status(500).json({message : error.message})
}

}

export const updateNote = async (req , res)=>{
try {
    const {userId} = req.query
    const {noteId} = req.params
    const {title , content} = req.body
    const check = await noteModel.findOne({userId , _id: noteId,})  
    if (!check) {
        return res.status(400).json("sorry you are is not the owner")
    }
    const note = await noteModel.findByIdAndUpdate({_id : noteId} ,
    {$set : {title , content} , $inc : {"__v" : 1}},{new : true})
    return res.status(200).json({message : "note is updated" , note})

} catch (error) {
    return res.status(500).json({message : error.message})
}

}

export const replaceNote = async (req, res) => {
  try {
    const { userId } = req.query;
    const { noteId } = req.params;

    const note = await noteModel.findOne({ _id: noteId,userId
    });

    if (!note) {
      return res.status(400).json({message: "You are not the owner of this note"});
    }

    const updatedNote = await noteModel.findOneAndReplace(
      { _id: noteId },
      {...req.body,userId
      },
      { new: true }
    );

    return res.status(200).json({message: "Note replaced successfully", updatedNote});

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const updateTitle = async (req , res) =>{
    try {
        const {userId} = req.query
        const {title} = req.body 
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).json("user is not found")
        }
        const updatednotes = await noteModel.updateMany({userId} ,{$set : {title} , $inc : {"__v" : 1}})
        return res.status(200).json({message : "title is updated" , updatednotes})

    } catch (error) {
    return res.status(500).json({message: error.message});
    }
}

export const deleteNote = async (req , res)=>{
try {
    const {userId} = req.query
    const {noteId} = req.params
    const check = await noteModel.findOne({userId , _id: noteId,})  
    if (!check) {
        return res.status(400).json("sorry you are is not the owner")
    }
    const note = await noteModel.findByIdAndDelete({_id : noteId})
    return res.status(200).json({message : "note is delete" , note})

} catch (error) {
    return res.status(500).json({message : error.message})
}
}
export const getPages = async (req ,res)=>{
    try {
        const {id , page , limit} = req.query
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({message : "user is not found"})
        }
        const skip = (page - 1) * limit;
        const notes = await noteModel.find({userId : id}).sort({createdAt:-1}).skip(skip).limit(limit)
        return res.status(200).json({notes})


    } catch (error) {
    return res.status(500).json({message : error.message})
    }
}

export const getSpecificNote = async (req , res)=>{
try {
    const {userId} = req.query
    const {noteId} = req.params
    const check = await noteModel.findOne({userId , _id: noteId,})  
    if (!check) {
        return res.status(400).json("sorry you are is not the owner")
    }
    const note = await noteModel.findByIdAndUpdate({_id : noteId})
    return res.status(200).json({message : note})

} catch (error) {
    return res.status(500).json({message : error.message})
}
}

export const getSingleNoteByContent = async (req, res) => {
  try {
    const { content, userId } = req.query;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({message: "User not found"});}

    const note = await noteModel.findOne({content,userId});

    if (!note) {
        return res.status(404).json({message: "Note not found"});
    }

    return res.status(200).json({message:note});

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};


export const getNotesWithUser = async (req, res) => {
  try {
    const { userId } = req.query;

    const notes = await noteModel
      .find({ userId }).select("title userId createdAt").populate("userId", "email");

    return res.status(200).json({notes});

  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const deleteAllNotes = async (req, res) => {
    try {
    const { userId } = req.query;
    const user = await userModel.findById(userId)
    if (!user) {
    return res.status(404).json({message: "user is not found",});
    }
    const deleteNotes = await noteModel.deleteMany({userId: userId});
    return res.status(200).json({message: "All notes deleted successfully", deleteNotes});
    } catch (error) {
    return res.status(500).json({message: error.message});
    }
};


