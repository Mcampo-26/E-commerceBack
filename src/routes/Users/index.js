import express from "express";
import { createUser,getUser, updateUser,deleteUserById } from "../../controllers/usersControllers/index.js";

const router = express.Router()

router.post('/create', createUser)
router.get('/get', getUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUserById)



export default router