import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";

router.get('/', (req, res) => {
    res.render('form')
});

router.post('/', async (req, res) => {// declaro async para saber que esta fx me va a traer algo por lo que debo esperar
    const {name, lastName, email, message} = req.body
    const emailMsg = {
        to: "atencionalcliente@nuestraempresa.com",
        from: email,
        subject: "Mensaje desde formulario de contacto",
        html: `Contacto de ${name} ${lastName}: ${message}`
    }
    // metodo muy inseguro; mejor guardar datos en vartiables de entorno
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.user, //datos que ubiqué en .env para que sea mas seguro
            pass: process.env.pass//es la forma de acceder al valor de user y pass que estan como variables en .env
        }
    });

    const sendMailStatus = await transport.sendMail(emailMsg)// la variable recibirá lo que devuelta la funcion, que aguarda con el await
    let sendMailFeedback = '';
    if(sendMailStatus.rejected.length) {//si el objeto rejected tiene length (tiene algo adentro) es decir que SI fue rechazado
        sendMailFeedback = 'No pudimos enviar el mensaje'; // entonces a la variable le pongo un mensaje relativo
    } else {// si no ...es decir NO fue rechazado
        sendMailFeedback = 'Mensaje enviado' // esto realmente significa que el mensaje fue enviado y que llegó al servidor, recibo un verdadero feedback
    }// tarda unos segundos hasta que te lleva a la otra vista xq realmente envió el mail al servidor

    res.render('home', {message: sendMailFeedback})// cuando todo pasó hago el render y le paso el mensaje apropiado
});

export default router;