
import express from 'express'
import upload from '../config/multerConfig'
import { uploadToCloudinary } from '../middlewares/cloudinaryMiddleware'
import { createNew, deleteNew, getAllNew, updateNew } from '../controllers/news'


export default ( router: express.Router) =>{
    router.get('/new', getAllNew)
}