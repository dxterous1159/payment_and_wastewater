const Address = require("../models/addressModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Ctreate Address -- Admin
exports.createAddress = catchAsyncErrors(async (req, res, next) => {
  //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน

  // req.body.user = req.user.id;

  // const address = await Address.create(req.body);

  // res.status(201).json({
  //   success: true,
  //   address,
  // });

  const { identification,paymenttype,place,homenumber,lane,villageno,road,province,district,subdistrict,zipcode,datauser,  } = req.body;
  
  const addressUser = await Address.create({
      identification,
      paymenttype,
      place,
      homenumber,
      lane,
      villageno,
      road,
      province,
      district,
      subdistrict,
      zipcode,
      datauser,
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      addressUser,
    });
  
});

// Get All Address (Admin, And Employee)
exports.getAllAddress = catchAsyncErrors(async (req, res, next) => {

     const addressCount = await Address.countDocuments();
     const resultPerPage = 8;
   
     const apiFeature = new ApiFeatures(Address.find(), req.query)
       .search()
       .filter()
      .pagination(resultPerPage); //Feature ใช้สำหรับการค้นหาข้อมูล
   
      let address = await apiFeature.query;
   
     res.status(200).json({
       success: true,
       address,
       addressCount,
       resultPerPage,
     });
});


// Get Single Address (Admin, And Employee)
exports.getSingleAddress = catchAsyncErrors(async (req, res, next) => {
    const address = await Address.findById(req.params.id);
  
    if (!address) {
      return next(
        new ErrorHander(`Address does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      address,
    });
  });



//Update Address -- Admin
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
    let address = await Address.findById(req.params.id);
  
    if (!address) {
      return next(new ErrorHander("Address not found", 404));
    }
  
    address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      address,
    });
  });

  // Delete Address -- Admin
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
    //catchAsyncErrors คือการดัก error เวลาเราลืมใส่ input ข้อมูล ซัก1ช่อง มันจะบอกเราว่าลืมกรอกข้อมูลช่องไหน
    const address = await Address.findById(req.params.id);
  
    if (!address) {
      return next(new ErrorHander("Address not found", 404));
    }
  
    await address.remove();
  
    res.status(200).json({
      success: true,
      message: "Address Delete Successfully",
    });
  });

  /* -------------------------------------------------------------------------------------------------------------------------- */

  // Create New AddresUser or Update the AddresUser Admin - Employee
exports.createInstallmentUser = catchAsyncErrors(async (req, res, next) => {
    const { trash,monthtrash,yeartrash,wastewater,monthwastewater,yearmonth, addressId } = req.body;
  
    const addressUser = {
      user: req.user._id,
      trash,
      monthtrash,
      yeartrash,
  
      wastewater,
      monthwastewater,
      yearmonth
  
    };
  
    const address = await Address.findById(addressId);
  
    address.myinstallment.push(addressUser);
  
  
    await address.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

  // Get All installment of a Address
exports.getInstallmentAddress = catchAsyncErrors(async (req, res, next) => {
    const address = await Address.findById(req.query.id);
  
    if (!address) {
      return next(new ErrorHander("Address not found", 404));
    }
  
    res.status(200).json({
      success: true,
      myinstallment: address.myinstallment,
    });
  });

  // Delete Installment Admin - Employee
exports.deleteInstallment = catchAsyncErrors(async (req, res, next) => {
    const address = await Address.findById(req.query.addressId);
  
    if (!address) {
      return next(new ErrorHander("Address not found", 404));
    }
  
  
    const myinstallment = address.myinstallment.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
  
    await Address.findByIdAndUpdate(
      req.query.addressId,
      {
        myinstallment,
  
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });