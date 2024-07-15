
import express from 'express'
import upload from '../config/multerConfig'
import { createPro, deletePro, getAllPro, getDetailPro, updatePro } from '../controllers/products'
import { uploadMultiToCloudinary } from '../middlewares/multiCloudinaryMiddleware'


export default ( router: express.Router) =>{
    router.get('/product', getAllPro)
    router.get('/product/:id', getDetailPro)
    router.post('/product/create',upload.fields([{ name: 'image_cover', maxCount: 1 },{ name: 'images', maxCount: 10 }]), uploadMultiToCloudinary, createPro)
    router.delete('/product/:id', deletePro)
    router.patch('/product/:id', upload.fields([{ name: 'image_cover', maxCount: 1 },{ name: 'images', maxCount: 10 }]), uploadMultiToCloudinary, updatePro)
}