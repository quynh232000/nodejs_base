import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

const upload = multer({ storage });



export default upload;