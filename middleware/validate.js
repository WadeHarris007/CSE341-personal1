
const saveCarPartsdetails = (req, res, next) => {
  const validationRule = {
    carModel: 'required|string',
    carType: 'required|string',
    email: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    partNeeded: 'required|string',
    yearModel: 'required|string'
  };
  
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCarPartsdetails
};