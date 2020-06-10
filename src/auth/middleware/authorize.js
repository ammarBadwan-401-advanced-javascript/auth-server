'use strict';
// This is the AC (Access Control) middleware

module.exports = (role) => {
  return (req,res,next) => {
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