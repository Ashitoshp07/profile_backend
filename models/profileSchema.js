var mongoose = require('mongoose'); 

const upload = require("../middleware/userImg");



var ProfileSchema = new mongoose.Schema({
  // CustomerId:String,
  PoliticianName: String,
  PoliticalPartyName: String,
  MailId: String,
  PhoneNumber: String,
  Partyofficelocation: String,
  YouTubeLink: String,
  InstagramId: String,
  FecebookId: String,
  TwitterId: String,
  PoliticanPhoto: Array,
  PoliticalPartylogo:Array,
  PhotoGallery: [{
    filename: String,
    description : String,

    }],
    NewsGallery: [{
      filename : String,
      description: String,

    }],

  PoliticiansInformation: String,

});


ProfileTable = mongoose.model('profile', ProfileSchema);

const createData = function (inputData, callback) {
  const userData = new ProfileTable(inputData);

  userData.save()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};


const updateData = async function (profileId, data) 
{
  try {
    const updatedData = await ProfileTable.findByIdAndUpdate(profileId, data, { new: true }).exec();
    return updatedData;
  } catch (error) {
    throw error;
  }
};



// // Assume your crudModel has a method like this:
const findUser = async function (query) {
  try {
  const existingData = await ProfileTable.findById({_id:query});
  return existingData;
  } catch (error) {
    throw error;
  }
};

const getAllUser = function (callback) {
  const userData = ProfileTable.find({});
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};

const getOneUserById = function (id,callback) {
  const userData = ProfileTable.find(id);
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};


const updateprofileById = async function (id, data) {
  try {
    const updatedData = await ProfileTable.findByIdAndUpdate(id, data, { new: true }).exec();
    return updatedData;
  } catch (error) {
    throw error;
  }
};
// Assume your crudModel has a method like this:
const findUserId = async function (query) {
  try {
  const existingData = await ProfileTable.findOne(query);
  return existingData;
  } catch (error) {
    throw error;
  }
};


const deleteImageFromGallery = async function (profileId, galleryType, imageId) {
  try {
    const profile = await ProfileTable.findById(profileId);

  console.log(req.params.profileId);


    if (!profile) {
      throw new Error('Profile not found');
    }

    let gallery;
    let galleryPath;

    if (galleryType === 'PhotoGallery') {
      gallery = profile.PhotoGallery;
      galleryPath = 'photo_gallery';
    } else if (galleryType === 'NewsGallery') {
      gallery = profile.NewsGallery;
      galleryPath = 'news_gallery';
    } else {
      throw new Error('Invalid gallery type');
    }

    // Find the index of the image to delete
    const indexToDelete = gallery.findIndex((image) => image._id == imageId);

    if (indexToDelete === -1) {
      throw new Error('Image not found in the gallery');
    }

    // Remove the image name from the gallery array
    gallery.splice(indexToDelete, 1);

    // Delete the image file from the upload folder
    const imagePath = path.join(__dirname, '..', 'Uploads', galleryPath, imageId);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Save the updated profile with the image removed
    await profile.save();

    return { message: 'Image deleted successfully' };
  } catch (err) {
    throw err;
  }
};


module.exports = {
  createData,
  updateData,
  findUser,
  getAllUser,
  getOneUserById,
  updateprofileById,
  findUserId,
  // deleteImageById,

  deleteImageFromGallery
}