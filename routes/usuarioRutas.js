const ruta = require("express").Router();
//ROUTER CONTIENE LA PARTE DE LAS RUTAS, PARA DEFINIR LAS RUTAS

const UsuarioClase = require("../clases/usuarioClase.js"); 
const UsuarioBD = require("../bd/usuarioDB.js");
const ProductoClase = require("../clases/productoClase.js");
const ProductoBD = require("../bd/productoDB.js");

ruta.get("/", async(req, res)=>{
    const usuariobd = new UsuarioBD();
    var usuario=await usuariobd.mostrarUsuarios(); 
    var usuariosCorrectos=[];
    usuario.forEach(usuario => {
        const usuario1 = new UsuarioClase (usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario1.obtenerDatos);
        }
    });
    res.render("mostrarUsuarios", {usuariosCorrectos});
});

//RUTA PARA ENTRAR AL FORMULARIO
ruta.get("/agregarUsuario", (req, res)=>{ // REQ - ENVIAR DATOS, RES RECIBIR DATOS

    res.render("formulario");
});

ruta.post("/agregarUsuario", async (req, res)=>{
    console.log(req.body);
    const usuario1 = new UsuarioClase (req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
        await usuariobd.nuevoUsuario(usuario1. obtenerDatos);
        res.render("mostrarDatos", usuario1.obtenerDatos);
    } else{
        res.render("error");
    }
});

ruta.get("/editarUsuario/:idusuario", async(req, res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]]=await usuariobd.buscarUsuarioPorID(req.params.idusuario);
    console.log(usuario);
    res.render("editarUsuario", usuario);

});

 ruta.post("/editarUsuario", async(req, res)=>{
    const usuariobd = new UsuarioBD();
    const usuario1 = new UsuarioClase (req.body);
    if (usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        await usuariobd.editarUsuario(req.body);
        res.redirect("/");
    } else{
        res.render("error");
    }
 });

 ruta.get("/borrarUsuario/:idusuario", async(req, res)=>{
    const usuariobd = new UsuarioBD();
    await usuariobd.borrarUsuario (req.params.idusuario); 
    res.redirect("/");
 });

 ruta.get("/p", async (req, res) =>{
    const productobd = new ProductoBD();
    var producto = await productobd.mostrarProductos();
    var productosCorrectos=[];
    producto.forEach(producto => {
        const producto1 = new ProductoClase (producto);
        if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.cantidad!=undefined){
            productosCorrectos.push(producto1.obtenerDatosp);
        }
    });
    res.render("mostrarProductos", {productosCorrectos});
 });

 ruta.get("/agregarProducto", (req, res)=>{ // REQ - ENVIAR DATOS, RES RECIBIR DATOS

    res.render("formularioproducto");
});

ruta.post("/agregarProducto", async (req, res)=>{
    const producto1 = new ProductoClase(req.body);
    if (producto1.nombre && producto1.descripcion && producto1.cantidad) {
        const productobd = new ProductoBD();
        await productobd.nuevoProducto(producto1.obtenerDatosp);
        res.render("mostrarDatosp", producto1.obtenerDatosp);
    } else {
        res.render("error");
    }
});

ruta.get("/editarProducto/:idproducto", async(req, res)=>{
    const productobd = new ProductoBD();
    const [producto] = await productobd.buscarProductoPorID(req.params.idproducto);
    res.render("editarProducto", { producto }); // Pasar producto como objeto
});

ruta.post("/editarProducto", async(req, res)=>{
    const productobd = new ProductoBD();
    const producto1 = new ProductoClase(req.body);
    if (producto1.nombre && producto1.descripcion && producto1.cantidad) {
        await productobd.editarProducto(req.body);
        res.redirect("/p");
    } else {
        res.render("error");
    }
});

 ruta.get("/borrarProducto/:idproducto", async(req, res)=>{
    const productobd = new ProductoBD();
    await productobd.borrarProducto(req.params.idproducto);
    res.redirect("/p");
 });

module.exports=ruta;
// MODULE SIRVE PARA ASIGNAR DATOS, ES UNA VARIABLE QUE FUNCIONA DE MANERA GLOBAL Y SIRVE PARA EXPORTAR