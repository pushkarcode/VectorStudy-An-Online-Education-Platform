const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
 sectionNmae: {
    type: String,
    required: true,
 },
 subSection: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required: true,
    }
 ]
    
});

module.exports = mongoose.model("Section", sectionSchema);
