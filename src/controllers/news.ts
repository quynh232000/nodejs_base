import { createNewPro, deleteNewById, getAllNewsPro, getNewById } from '../db/news'
import express from 'express'
import slugify from 'slugify'

export const createNew = async (req: express.Request, res: express.Response) => {
    try {
        const { title, image, content } = req.body
       if(!title || !image || !content){
        return res.status(400).json({status:false,message:"Vui lòng nhập đủ thông tin"})
       }

       const newItem = await createNewPro({
        title,
        content,
        image,
        slug: slugify(title, { lower: true, strict: true })
       })

       return res.status(200).json({status:true,message:"Tạo tin tức thành công", data:newItem}).end()
    } catch (error) {
      console.error("Error from server: ", error);
      return res.status(500).json({ status: false, message: "Error from server...", error: error.message });
    }
}
export const getAllNew = async (req: express.Request, res: express.Response) => {
  try {
     const data = await getAllNewsPro()

     return res.status(200).json({status:true,message:"Lấy tin tức thành công", data: data}).end()
  } catch (error) {
    console.error("Error from server: ", error);
    return res.status(500).json({ status: false, message: "Error from server...", error: error.message });
  }
}

export const deleteNew= async (req: express.Request, res: express.Response) => {
  try {
      const { id } = req.params
      if(!id){
        return res.status(400).json({status:false, message:"Vui lòng truyền id"}).end()
      }
      const deleteNew= await deleteNewById(id)
      return res.status(400).json({status:true,message:"Xóa tin tức thành công", data: deleteNew}).end()
  } catch (error) {
    console.error("Error from server: ", error);
    return res.status(500).json({ status: false, message: "Error from server...", error: error.message });
  }
}

export const updateNew = async (req: express.Request, res: express.Response) => {
  try {
      const { id } = req.params
      const { title, image, content } = req.body
     if(!id){
      return res.status(400).json({status:false, message:"Vui lòng truyền id"}).end()
     }

     const newItem = await getNewById(id)
     if(!newItem){
      return res.status(400).json({status:false, message:"Tn tức không tồn tại"}).end()
     }
     if(title && title !=""  && title != newItem.title){
      newItem.title = title
      newItem.slug = slugify(title, { lower: true, strict: true })
     }
     if(image && image !== '' && image != newItem.image){
      newItem.image = image
     }
     await newItem.save()

     return res.status(200).json({status:true, message:"Tin tức cập nhật thành công"}).end()
  } catch (error) {
    console.error("Error from server: ", error);
    return res.status(500).json({ status: false, message: "Error from server...", error: error.message });
  }
}
