import validator from 'express-validator';
const { body, validationResult } = validator;

// declaring validation rules// it is a middleware//
const validationRules = [
    body('name')//getting specific input
    .notEmpty()
    .withMessage('Field must contain your name')
    .isLength({min:2, max:30})
    .isAlpha().withMessage('Only alphanumeric characters')
    .withMessage('This field must contain more than 2 and less than 30'),
    body('lastName', 'This field must contain your last name')
    .exists()
    .isLength({min:2}),
    body('email', 'Please enter a valid email')
    .exists()
    .isEmail(),
    body('message', 'This field must contain between 10 and 300 characters')
    .exists()
    .trim(' ')//sanitizer cut blank spaces
    .isLength({min:10, max:300}),
    (req, res, next) => {//anonymous function for been executed when errors occur
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formData = req.body
            const arrWarnings = errors.array();
            res.render('form', { arrWarnings, formData})
        }else return next();//if there are not errors, continue with next()//in this case, to the controller
    }
];

export default validationRules;
