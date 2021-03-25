// const express = require("express");
// const mongoose = require("mongoose");
// const Image = require("../models/uploadModel");
// const router = express.Router();
// const multer = require("multer");

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });
// const imageFilter = (req, file, cb) => {
//   //accept images only
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//     return cb(new Error("Only image files are allowed"), false);
//   }
//   cb(null, true);
// };
// const upload = multer({
//   storage: storage,
//   fileFilter: imageFilter,
// });

// const allUploadedImages=(req,res)=>{
// Image.find((err,images)=>{
//     if(err){
//         res.json(err.message)
//     }else{
//         res.json(images)
//     }
// })
// }

// module.exports = {
//   router,
//   allUploadedImages,
//   upload
// };

const singleFileModel = require("../models/singleFileModel");
const multipleFileModel = require("../models/multiFileModel");

const singleFileUpload = async (req, res, next) => {
  try {
    const file = new singleFileModel({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    });
    await file.save();
    res.status(201).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const multipleFileUpload = async (req, res, next) => {
  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new multipleFileModel({
      title: req.body.title,
      files: filesArray,
    });
    await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallSingleFiles = async (req, res, next) => {
  try {
    const files = await singleFileModel.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await multipleFileModel.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
};
