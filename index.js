const express= require("express"); 
// definir ruta estatica, es parte de js,
const path = require ("path");
// PUNTO DIAGONAL, ESPARA INDICAR QUE SE QUIERE EMPEZAR POR LA RAIZ,
const usuarioRutas=require("./routes/usuarioRutas");
const app=express();
// CUANDO SE DETECTA QUE SE TIENE ESTO, LA DETECTA AUTOCAMTICA LA CARPETA DE EJS
app.set("view engine","ejs");
app.use("/", express.static(path.join(__dirname,"/web")));
//entrega toda la ruta, desde el disco duro hasta el archivo que se indica
app.use(express.urlencoded({extended:true}));
//PERMITE RECIBIR DATOS DE UN FORMULARIO CON ARCHIVOS, DE AHI LA FUNCION DEL TRUE
app.use("/",usuarioRutas);

const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Sitio en http://localhost:"+port);
})

// el primer archivo que esta tomando de la raiz es el index
// SET- PARA DEFINIR EL MOTOR DE VISTAS, EL EJS ES DONDE SE PONEN LOS ARCHIVOS DE HTML
