const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, ("./uploads") );  // ->("./uploads")  this is the destination where files will save in the HArdDisk Storage 
    },
    filename: (req, file, callback) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;   // adding Date.now prevents duplicate images being uploaded by users
      callback(null, uniqueName);
    },
  });

  const upload = multer({ storage });

  module.exports = upload;
