var express = require('express');
var router = express.Router();
var customerController= require('../controllers/coustomerControllers');


router.post('/register',customerController.createData);
router.get('/getAllRegisterCustomer',customerController.getAllCustomer);
router.get('/getOneCustomerById/:id',customerController.getOneCustomerById);
router.put('/updateOneCustomerById/:id',customerController.updateOneCustomerById) ;
router.delete('/getOneCustomerDeleteByID/:id',customerController.CustomerDataDelete);





module.exports = router;