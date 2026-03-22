import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
    try {
      const products = await Product.find({});
       res.status(200).json({success: true, data:products});
    } catch (error) {
       console.log("error in fetching product:", error.message);
       res.status(500).json({success: false, message:"Server error"});
    }
};

export const createProduct = async ( req, res) => {
    const productData = req.body; // user will send this data

    if(!productData.name || !productData.price || !productData.image) {
        return res.status(400).json({success:false, message: "please provide all fields"});
    }

    const newProduct = new Product(productData)

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch (error){
        console.error("Error in Create product:", error);
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const updateProduct = async (req, res)=>{
    const{id} =req.params;
    const updateData = req.body

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success:false, message:"invalid product id"})
    try {
      const updatedProduct= await Product.findByIdAndUpdate(id,updateData, {new:true});
      res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success:false, message:"server Error"}) 
    }
};

export const deleteProduct = async ( req, res) =>{
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "product deleted"});
    } catch (error) { 
        console.log("error in fetching product:", error.message) 
        res.status(404).json({success: false, message: "product not found"});
        
    }
};