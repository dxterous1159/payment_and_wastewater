const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema({
    identification: {
        type: String,
        required: [true, "Please Enter Your Identification"],
        trim: true,
        maxLength: [13, "Identification cannot exceed 30 characters"],
        minLength: [13, "Identification should have more than 4 characters"],
      },
  trash: {
    type: String,
    required: true,
  },
    wastewater: {
        type: String,
        required: true,
      },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Installmen", installmentSchema);
