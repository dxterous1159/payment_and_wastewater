const Installment = require("../../models/installmentModel");
const Month = require("../../models/month_of_installment_Model");
const Year = require("../../models/year_of_installment_Model");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apifeatures");

const jwt = require("jsonwebtoken");
const userSchema = require('../../models/userModel')

// Ctreate Installment -- Employee - Admin
exports.createInstallment = catchAsyncErrors(async (req, res, next) => {
  
    req.body.user = req.user.id;
  
    const installment = await Installment.create(req.body);
  
    res.status(201).json({
      success: true,
      installment,
    });
  });


// Get All Installment (Admin, And Employee)
exports.getAllInstallment = catchAsyncErrors(async (req, res, next) => {

    const installmentCount = await Installment.countDocuments();
    const resultPerPage = 8;
  
    const apiFeature = new ApiFeatures(Installment.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล
  
    let installment = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      installment,
      installmentCount,
      resultPerPage,
    });
  });

  // Get My Installment 
exports.myInstallment = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    let userID = decodedData.id
    let user = await userSchema.findById({ _id: userID })
    let installment = await Installment.findOne({
      identification:user.identification
    })
    const apiFeature = new ApiFeatures(Month.aggregate([
  
        {
          $lookup: { 
            from: "months",
            localField: "month",
            foreignField: "identification",
            as: "monthData_doc"
          }
        },
    
      ]), req.query)
  
    let month = await apiFeature.query;

    const apiFeatures = new ApiFeatures(Year.aggregate([
      {
        $lookup: { 
          from: "years",
          localField: "year",
          foreignField: "identification",
          as: "yearData_doc"
        }
      },
    
      ]), req.query)
  
    let year = await apiFeatures.query;
  
    let data = {
      installment,
      month,
      year
     // user,
    }
    if(Installment){
      res.status(200).json({
            success: true,
            data
      });
    }else{
      res.status(200).json({
        success: false,
        message:"Error",
      });
    }
});

  //Update Installment -- Admin - Employeee
  exports.updateInstallment = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
    let installment = await Installment.findById(req.params.id);
  
    if (!installment) {
      return next(new ErrorHander("Installment not found", 404));
    }
  
    installment = await Installment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      installment,
    });
  });