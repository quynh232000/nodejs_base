
import express from 'express'
import { createOrderProduct, getAllOrderProduct, getOrderDetailPro } from '../controllers/orders'
import { isAuthenticated } from '../middlewares'


export default ( router: express.Router) =>{
    router.get('/order', isAuthenticated, getAllOrderProduct)
    router.get('/order/:id', getOrderDetailPro)
    router.post('/order/create', isAuthenticated, createOrderProduct)
}