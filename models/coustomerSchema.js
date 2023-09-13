var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  // customerId:String,
  FirstName: String,
  LastName: String,
  EmailId: String,
  password: String,
  confirmpassword: String,
  IsActive:Boolean,
  

});

CustomerTable = mongoose.model('Customer', CustomerSchema);
const createData = function (inputData, callback) {
  const userData = new CustomerTable(inputData);

  userData.save()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};

const getAllCustomer = function (callback) {
    const userData =  CustomerTable.find({});
    userData.exec()
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        throw err;
      });
  };

//   const objectId = 'your_object_id';

  const  getOneCustomerById = function (objectId,callback) {
    const userData = CustomerTable.find(objectId);
    userData.exec()
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        throw err;
      });
  };



const updateOneCustomerById = async function (id, data, callback) {
  try {
    const updatedData = await CustomerTable.findOneAndUpdate(id, data, { new: true });
    callback(updatedData);
  } catch (err) {
    callback(err);
  }
};


const  CustomerDataDelete  = function (objectId,callback) {
    const userData = CustomerTable.findByIdAndRemove(objectId);
    userData.exec()
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        throw err;
      });
  };


module.exports={
    createData,
    getAllCustomer,
    getOneCustomerById,
    updateOneCustomerById,
    CustomerDataDelete
}