
import express from 'express'
import { createCate, deleteCate, getAllCate, updateCate } from '../controllers/categories'
import upload from '../config/multerConfig'
import { uploadToCloudinary } from '../middlewares/cloudinaryMiddleware'


export default ( router: express.Router) =>{
    router.get('/category', getAllCate)
    router.post('/category/create',upload.single('image'), uploadToCloudinary, createCate)
    router.delete('/category/:id', deleteCate)
    router.patch('/category/:id', upload.single('image'), uploadToCloudinary, updateCate)
}