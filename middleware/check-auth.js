const jwt = require('jsonwebtoken');

module.exports=  (req,res,next) => {
try {
const token=req.headers.authorizetion.split(' ')[1];

const decodedToken=jwt.verify(token,'verySecret');console.log(decodedToken);

req.userData={email:decodedToken.email,userId:decodedToken.userId};
console.log(req.userData);

next();
} catch (error) {
console.log(error);
   res.status(401).json({ message: 'not authorize' });

}
  };
