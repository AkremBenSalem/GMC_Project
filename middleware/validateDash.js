const {validationResult, check}=require("express-validator"); 

exports.dashCreateValidate = () =>[
    check('name',"dashboard name is required").notEmpty(),
    check('name',"name is too long (max 30 characters)").isLength({max: 30}),
]

exports.validationDash = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
} 