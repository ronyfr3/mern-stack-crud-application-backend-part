const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const multipleFileSchema = new Schema(
  {
    title: { type: String, required: true },
    files: [Object],
  },
  {
    timestamps: true,
  }
);
const multipleFileModel = mongoose.model(
  "multipleFileUpload",
  multipleFileSchema
);
module.exports = multipleFileModel;
