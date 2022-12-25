const Year = require("../../models/year_of_installment_Model");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apifeatures");

// Ctreate Year -- Employee - Admin
exports.createYear = catchAsyncErrors(async (req, res, next) => {
  
    req.body.user = req.user.id;
  
    const year = await Year.create(req.body);
  
    res.status(201).json({
      success: true,
      year,
    });
});

// Get All Year (Admin And Employee)
exports.getAllYear = catchAsyncErrors(async (req, res, next) => {

    const yearCount = await Year.countDocuments();
    const resultPerPage = 8;
  
    const apiFeature = new ApiFeatures(Year.find(), req.query)

  
    let year = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      year,
      yearCount,
    });
  });