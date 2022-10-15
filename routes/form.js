import express from "express";
const router = express.Router();

// import validationRules
import validationRules from "../validators/validation-rules.js";
import transport from "../config/nodemailer.js"

router.get('/', (req, res) => {
    res.render('form')
});

router.post('/', validationRules, async (req, res) => {//after next it will continue with controller
        const {name, lastName, email, message} = req.body
        const emailMsg = {
            to: "atencionalcliente@nuestraempresa.com",
            from: email,
            subject: "Mensaje desde formulario de contacto",
            html: `Contacto de ${name} ${lastName}: ${message}`
        }

        const sendMailStatus = await transport.sendMail(emailMsg)
        if(sendMailStatus.rejected.length) {
            req.app.locals.sendMailFeedback = 'No pudimos enviar el mensaje';
        } else {
            req.app.locals.sendMailFeedback = 'Mensaje enviado';
        }

        res.redirect('/', {message: sendMailFeedback})//Once the mail is sent, redirect to the root route or home
    });

export default router;