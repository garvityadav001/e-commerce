import {v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
// function to add product
const addProduct = async (req, res)=>{
    try{
        const {name, price, description,category, subCategory, sizes, bestseller} = req.body;

        const image1 = req.files?.image1?.[0];
        const images = [image1].filter((item)=> item !== undefined );
        let imageUrls = [];

        if(images.length === 0){
            return res.json({success: false, message: 'Product image is required'});
        }

        if(images.length > 0){
            imageUrls = await Promise.all(
                images.map( async(item)=>{
                    const result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                    return result.secure_url;
                })
            )
        }

        const productData = {
            name, 
            description,
            price: Number(price),
            category, subCategory,
            bestseller: bestseller === true || bestseller === 'true',
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            image: imageUrls,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: "Product added"})
    }
    catch(error){
        res.json({success: false, message: error.message})
    }
}

// function to list product
const listProduct = async (req, res)=>{
    try{
        const products = await productModel.find({}).sort({ date: -1 });
        res.json({success: true, products})
    }
    catch(error){
        res.json({success: false, message: error.message})
    }
}

// function to remove product
const removeProduct = async (req, res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Product removed"});
    }
    catch(error){
        res.json({success: false, message: error.message})
    }
}

// function for single product info
const singleProduct = async (req, res)=>{
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        if(!product){
            return res.json({success: false, message: 'Product not found'});
        }
        res.json({success: true, product});
    }
    catch(error){
        res.json({success: false, message: error.message})
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }