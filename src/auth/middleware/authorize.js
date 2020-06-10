'use strict';
// This is the AC (Access Control) middleware

module.exports = (role) => {
  return (req,res,next) => {
    console.log('user object');
    console.log(req.user);
    try {
      if(req.user.role.includes(role)){
        next();
      } else {
        next('Access Denied');
      }
      next();
    } catch(e) {
      next('An error occured: ' + e);
    }
  };
};