import nodemailer from "nodemailer";
import * as dotenv from "dotenv";// importamos el paquete dotenv donde tengo mis variables de entorno, recomendacion del fabricante (as es alias)
dotenv.config();//lo llamo xa que funcione

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.user, //datos que ubiqué en .env para que sea mas seguro
        pass: process.env.pass//es la forma de acceder al valor de user y pass que estan como variables en .env
    }
});

export default transport;