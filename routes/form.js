import express from "express";
const router = express.Router();

// import validationRules
//import validationRules from "../config/validation-rules";
import validator from "express-validator";
const {body, validationResult} = validator;

// declaring validation rules
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
    .isLength({min:10, max:300})
];

import transport from "../config/nodemailer.js"

router.get('/', (req, res) => {
    res.render('form')
});

router.post('/', validationRules, async (req, res) => {// declaring validationRules as middleware for validating input values, before get routes
    //find possible validation errors from request
    //wrap those errors on a Express-validator object that contains useful functions to deal with

    const errors = validationResult(req)//users data pass through this validation function

    if (!errors.isEmpty()){// if it is noy empty, so there are errors
        const formData = req.body;
        const arrWarnings = errors.array();// create a variable with an error array get from errors object the array with messages
        res.render('form', {arrWarnings, formData});// and show errors on the form
    } else {
        const {name, lastName, email, message} = req.body
        const emailMsg = {
            to: "atencionalcliente@nuestraempresa.com",
            from: email,
            subject: "Mensaje desde formulario de contacto",
            html: `Contacto de ${name} ${lastName}: ${message}`
        }

        const sendMailStatus = await transport.sendMail(emailMsg)// la variable recibirá lo que devuelta la funcion, que aguarda con el await
        let sendMailFeedback = '';
        if(sendMailStatus.rejected.length) {//si el objeto rejected tiene length (tiene algo adentro) es decir que SI fue rechazado
            sendMailFeedback = 'No pudimos enviar el mensaje'; // entonces a la variable le pongo un mensaje relativo
        } else {// si no ...es decir NO fue rechazado
            sendMailFeedback = 'Mensaje enviado' // esto realmente significa que el mensaje fue enviado y que llegó al servidor, recibo un verdadero feedback
        }// tarda unos segundos hasta que te lleva a la otra vista xq realmente envió el mail al servidor

        res.render('home', {message: sendMailFeedback})// cuando todo pasó hago el render y le paso el mensaje apropiado
    }
});


export default router;