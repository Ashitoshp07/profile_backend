var crudModel = require('../models/profileSchema');
const path = require('path');
const fs=require('fs');

const createData = function (req, res) {
  var inputData = req.body;
  console.log(req.files);

  if (req.files) {
    Object.keys(req.files).forEach((fieldname) => {
      const files = req.files[fieldname];                           //fieldname : photo galary or 
      inputData[fieldname] = files.map((file) => file.filename);
    });
  }
  console.log(inputData);
  // // Perform the necessary operations with inputData
  // // For example, you can use a CRUD model to create the data
  crudModel.createData(inputData, function (inputData) {
    res.json({ "data": inputData });
    // res.send( 'hello World')
    console.log("Record was created");
  });
};



const updateData = async (req, res) => {
  try {
    const files = req.files;
    const descriptions = req.body.descriptions;
    const profileId = req.params.profileId;
    const gallaryname1=req.params.gallary

     const existingProfile = await crudModel.findUser(profileId); // Use the imported Profile model
    // console.log(req.params.profileId);
    //  console.log(req.files);
    // console.log(gallaryname1+"--"+"PhotoGallery");
    // existingProfile[gallaryname1];
    
    //  console.log('hii',existingProfile.PhotoGallery);

    if (!existingProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    for (let i = 0; i < files.length; i++) {
      existingProfile[gallaryname1].push({
        filename: files[i].filename,
        description: descriptions[i]
      });
    
      console.log(files[i].filename);
    }

  
    // console.log("there is new profile Data",existingProfile);

    await crudModel.updateData(profileId,existingProfile
    )
    res.status(200).json({ message: 'Images uploaded and added to photo gallery successfully' });
  } catch (error) {
    console.error('Error uploading images', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


const getAllUser = function (req, res) {
  crudModel.getAllUser(function (data) {
    res.json(  data );
  });
};



const getOneUserById = function (req, res) {
  let id = req.params.id;
    crudModel.getOneUserById({_id:id},function (data) {
      res.json( data );
    });
};




const updateprofileById = async function (req, res) {
  const id = req.params.id; // Get the _id from the URL parameter
  const inputData = req.body;

  if (req.files) {
    // Extract filenames for each field
    Object.keys(req.files).forEach((fieldname) => {
      const files = req.files[fieldname];
      inputData[fieldname] = files.map((file) => file.filename);
    });
  }

  try {
    // Get the existing data to compare with the updated data
   
    const existingData = await crudModel.findUserId({_id:id});
    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    if (existingData.PoliticanPhoto) {
      existingData.PoliticanPhoto.forEach((filename) => {
        if (!inputData.PoliticanPhoto.includes(filename)) {
          const imagePath = path.join(__dirname, '..', 'Uploads', filename);
          fs.unlinkSync(imagePath);
        }
      });
    }
    if (existingData.PoliticalPartylogo) {
      existingData.PoliticalPartylogo.forEach((filename) => {
        if (!inputData.PoliticalPartylogo.includes(filename)) {
          const imagePath = path.join(__dirname, '..', 'Uploads',  filename);
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Perform the update operation
    const updatedData = await crudModel. updateprofileById(id, inputData);
        res.json({ message: 'Data update success1111', updatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update data' });
  }
};

const deleteImageById = async function (req, res) {
  const profileId = req.params.profileId;
  const galleryType = req.params.gallary;
  const imageId = req.params.imageid;
   
  try {
    // const deletedData = await deleteImageFromGallery(profileId, galleryType, imageId);
  const existingProfile = await crudModel.findUser(profileId,galleryType,imageId);

    console.log(profileId);

  
  if (!existingProfile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
      //  console.log(req.files);
      //  console.log(gallaryname+"--"+"PhotoGallery");
    res.json({ message: 'Data and associated image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting data and image' });
  }
};

module.exports = {
  createData,
  updateData,
  getAllUser,
  getOneUserById ,
  updateprofileById,
  deleteImageById,
  
}