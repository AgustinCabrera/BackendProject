import multer from 'multer';
import { __dirname } from '../util.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/images') 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
  })

export const uploadMiddleware = multer({ storage: storage }).single('fileFieldName');