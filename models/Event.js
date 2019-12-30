const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title."],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please add a description."]
  },
  public: Boolean,
  tags: [String]
});

module.exports = mongoose.model("Event", EventSchema);
