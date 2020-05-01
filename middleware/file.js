

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, myfile, cd) => {
    cd(null, "backend/images");
  },
  filename: (req, myfile, cd) => {
    const name = myfile.fieldname.toLowerCase().split(" ").join("-");
    console.log(name);

    cd(null, name + "-" + Date.now() + path.extname(myfile.originalname));
  },
});
var upload = multer({ storage: storage }).single('image');



module.exports=upload;
