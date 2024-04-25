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
   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// //Reverse populate with virtuals
WorkspaceSchema.virtual(`appointments`, {
  ref: `Appointment`,
  localField: `_id`,
  foreignField: `workspace`,
  justOne: false,
});

// //Cascade delete appointments when a workspace is deleted
// WorkspaceSchema.pre(`deleteOne`, { document: true, query: false }, async function(next) {
//   console.log(`Appointments being removed from workspace ${this._id}`);
//   await this.model(`Appointment`).deleteMany({ workSpace: this._id });
//   next();
// });


// //Cascade delete appointments when a hospital is delete
// WorkspaceSchema.pre(`deleteOne`,{document:true,query:false}, async function(next){
//   console.log(`Appointments being removed from hospital ${this._id}`);
//   await this.model(`Appointment`).deleteMany({workSpace: this._id});
//   next();
// });

module.exports = mongoose.model("Workspace", WorkspaceSchema);
