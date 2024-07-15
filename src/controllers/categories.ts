import express from 'express'
import { createCategory, deleteCategoryById, getAllCategories, getCateById } from '../db/categories'
import slugify from 'slugify'

export const createCate = async (req: express.Request, res: express.Response) => {
    try {
        const { name, image } = req.body
       if(!name || !image){
        return res.status(400).json({status:false,message:"Vui lòng nhập tên và ảnh danh mục"})
       }

       const cate = await createCategory({
        name,
        image,
        slug: slugify(name, { lower: true, strict: true })
       })

       return res.status(200).json({status:true,message:"Tạo danh mục thành công",data:cate}).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
export const getAllCate = async (req: express.Request, res: express.Response) => {
  try {
     const data = await getAllCategories()

     return res.status(200).json({status:true,message:"Lấy danh mục thành công", data: data}).end()
  } catch (error) {
      console.log(error);
      return res.sendStatus(400)
  }
}

export const deleteCate = async (req: express.Request, res: express.Response) => {
  try {
      const { id } = req.params
      if(!id){
        return res.status(400).json({status:false, message:"Vui lòng truyền id"}).end()
      }
      const deleteCate = await deleteCategoryById(id)
      return res.status(400).json({status:true,message:"Xóa danh mục thành công", data: deleteCate}).end()
  } catch (error) {
      console.log(error);
      return res.sendStatus(400)
  }
}

export const updateCate = async (req: express.Request, res: express.Response) => {
  try {
      const { id } = req.params
      const { name, image } = req.body
     if(!id){
      return res.status(400).json({status:false, message:"Vui lòng truyền id"}).end()
     }

     const cate = await getCateById(id)
     if(!cate){
      return res.status(400).json({status:false, message:"Danh mục không tồn tại"}).end()
     }
     if(name && name !=""  && name != cate.name){
      cate.name = name
      cate.slug = slugify(name, { lower: true, strict: true })
     }
     if(image && image !== '' && image != cate.image){
      cate.image = image
     }
     await cate.save()

     return res.status(200).json({status:true, message:"Danh mục cập nhật thành công"}).end()
  } catch (error) {
      console.log(error);
      return res.sendStatus(400)
  }
}
