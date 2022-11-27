const Payment = require("../models/paymentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorhander");

// Ctreate Payment -- Admin
exports.createPayment = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
  
    req.body.user = req.user.id;
  
    const payment = await Payment.create(req.body);
  
    res.status(201).json({
      success: true,
      payment,
    });
  });

  // Get All Payment
exports.getAllPayment = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 8;
    const paymentsCount = await Payment.countDocuments();
  
    const apiFeature = new ApiFeatures(Payment.find(), req.query)
      .filter()
     .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล
  
      let payments = await apiFeature.query;
  
      let filteredPaymentsCount = payments.length;
    
     // apiFeature.pagination(resultPerPage);
    
  
    res.status(200).json({
      success: true,
      payments,
      paymentsCount,
      resultPerPage,
      filteredPaymentsCount,
    });
  });

  //Update Payment -- Admin
exports.updatePayment = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
    let payments = await Payment.findById(req.params.id);
  
    if (!payments) {
      return next(new ErrorHander("Payment not found", 404));
    }
  
    payments = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      payments,
    });
  });

// Delete Payment -- Admin
exports.deletePayment = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
    const payment = await Payment.findById(req.params.id);
  
    if (!payment) {
      return next(new ErrorHander("Payment not found", 404));
    }
  
    await payment.remove();
  
    res.status(200).json({
      success: true,
      message: "Payment Delete Successfully",
    });
  });
