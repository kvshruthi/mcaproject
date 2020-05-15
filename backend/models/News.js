
const mongoose = require("mongoose");
// " title":"","description":""
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title for the News"],
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Please add some text"]
  },
   createdAt: {
    type: Date,
    default: Date.now,
  },
 file:{
    type:String,
    default:"/uploads/no-photo.jpg"
  }
  
});
module.exports = mongoose.model("News", NewsSchema);




