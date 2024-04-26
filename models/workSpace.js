const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],  // corrected from 'reqiured'
      unique: true,  // corrected from 'nuique'
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],  // corrected from 'reqiured'
    },
    district: {
      type: String,
      required: [true, "Please add a district"],  // corrected from 'reqiured'
    },
    province: {
      type: String,
      required: [true, "Please add a province"],  // corrected from 'reqiured'
    },
    postalcode: {
      type: String,
      required: [true, "Please add a postalcode"],  // corrected from 'reqiured'
      maxlength: [5, "Postalcode can not be more than 5 digits"],
    },
    region: {
      type: String,
      required: [true, "Please add a region"],  // corrected from 'reqiured'
    },
    "open-close":{
      type: String,
      required: [true, "Please add a operation hour"],  // corrected from 'reqiured'
    }
  },
);

module.exports = mongoose.model("workSpace", WorkspaceSchema);
