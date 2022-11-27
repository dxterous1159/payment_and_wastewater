const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    identification: {
        type: String,
        required: [true, "Please Enter Your Identification"],
        trim: true,
        maxLength: [13, "Identification cannot exceed 30 characters"],
        minLength: [13, "Identification should have more than 4 characters"],
    },
    paymenttype: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
  homenumber: {
    type: String,
    required: true,
  },
  lane: {
    type: String,
  },
  villageno: {
    type: Number,
    required: true,
  },
  road: {
    type: String,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  subdistrict: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  datauser: [
    {
      name: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      }, 
    },
  ],
  myinstallment: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      }, 
      trash: {
        type: String,
        required: true,
      },
      monthtrash: {
        type: String,
        required: true,
      },
      yeartrash: {
        type: String,
        required: true,
      },
      wastewater: {
        type: String,
        required: true,
      },
      monthwastewater: {
        type: String,
        required: true,
      },
      yearmonth: {
        type: String,
        required: true,
      },
      createdInstallmentAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAddressAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Address", addressSchema);
