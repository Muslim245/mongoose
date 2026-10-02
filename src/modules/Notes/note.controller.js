import { Router } from "express";
import * as noteServices from "./note.services.js"
const router = Router()


router.post("/" , noteServices.createNote)
router.patch("/all" , noteServices.updateTitle)
router.get("/note-by-content", noteServices.getSingleNoteByContent);
router.get("/with-user", noteServices.getNotesWithUser);
router.patch("/:noteId", noteServices.updateNote)
router.put("/replace/:noteId" ,noteServices.replaceNote)
router.delete("/:noteId" , noteServices.deleteNote)
router.get("/" , noteServices.getPages)
router.get("/:noteId" , noteServices.getSpecificNote)
router.delete("/", noteServices.deleteAllNotes);
export default router;