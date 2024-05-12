import Users from "../../models/Users.js";
import mongoose from "mongoose";


export const createUser = async (req, res)=>{
  try {
    const { name, password, email}=req.body;
    const user = new Users({ name, password, email});
    await user.save();
    res.status(200).send("User creado");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUser = async(req,res)=>{
  try {
    const collection = mongoose.connection.collection("users");
    const document = await collection.find().toArray(0);
    res.status(200).json(document);
    //console.log(data.connection.collection)
   // console.log(data)
    //console.log(document)
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, email } = req.body;
    await Users.findOneAndUpdate({ _id: id }, { name, password, email });
    res.status(200).send("update");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  try { 
    const { id } = req.params;
    const deleteResult = await Users.findByIdAndDelete(id);

    if (!deleteResult) {
      return res.status(404).json({ error: 'No se pudo encontrar el usuario con el ID proporcionado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
  }
};
