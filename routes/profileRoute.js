var express = require('express');
var router = express.Router();
 const upload = require("../middleware/userImg");
var userController= require('../controllers/profileControllers');

router.post('/profile-register', upload.fields([
    { name: 'PoliticanPhoto' },
    { name: 'PoliticalPartylogo'},
  ]), userController.createData);

router.post('/:profileId/:gallary', upload.array('images', [
    {name:'PhotoGallery'},
   {name:" NewsGallery"}
             
 ]),userController.updateData);

 router.get('/getAllRegisterUser',userController.getAllUser);
 router.get('/getOneUserById/:id',userController.getOneUserById);
router.put('/updateprofileById/:id',upload.fields([
  { name: 'PoliticanPhoto' },
  { name: 'PoliticalPartylogo'},
]),userController.updateprofileById);

router.delete('/:profileId/:gallary/:imageid', upload.array('images', [
  {name:'PhotoGallery'},
 {name:" NewsGallery"}
]),userController.deleteImageById);
module.exports = router;