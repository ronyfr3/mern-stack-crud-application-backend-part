const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const singleFileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const singleFileModel = mongoose.model("singleFileUpload", singleFileSchema);

module.exports = singleFileModel;
