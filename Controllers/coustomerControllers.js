var crudModel = require('../models/coustomerSchema');

// Math.random().toString(36).substring(2);

// const makeid = () => {
//     var text = "customerId-";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for (var i = 0; i < 9; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
// }

const createData = function (req, res) {
    var inputData = req.body;
        // inputData.customerId=makeid()

     console.log(inputData);
    crudModel.createData(inputData, function (inputData) {
      res.json(  inputData );
      
      console.log("Record was created");
    });
  };


  const getAllCustomer = function (req, res) {
    crudModel.getAllCustomer(function (data) {
      res.json( data );
    });
  };

  const getOneCustomerById= function (req, res) {
    let id = req.params.id;
      crudModel.getOneCustomerById({_id:id},function (data) {
        res.json( data );
      });
  };


 const  updateOneCustomerById= function (req, res) {
    var data = req.body;
    let id= req.params.id;
      crudModel.updateOneCustomerById({_id:id},data,function (data) {
        res.json( data );
        console.log(req.body);
      });
  }; 


const CustomerDataDelete= function (req, res) {
    let id = req.params.id;
    console.log(id);
      crudModel.CustomerDataDelete({_id:id},function (data) {
        res.json({ "data": "Record Deleted" });
        console.log('data deleted')
      });
  };

  module.exports={
    createData,
    getAllCustomer,
    getOneCustomerById,
    updateOneCustomerById,
    CustomerDataDelete,
  }