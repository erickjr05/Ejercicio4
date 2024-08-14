const ConectarBD = require("./conexionBD.js");

class UsuarioDB extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoUsuario(usuario) {
        const sql = "INSERT INTO usuarios (nombre, celular, correo) VALUES (?, ?, ?)";
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql, [usuario.nombre, usuario.celular, usuario.correo]);
            await this.cerrarConexion();
            console.log("Dato insertado a MySql");
        } catch (error) {
            console.error("Error al insertar datos en MySql: " + error);
        }
    }

    async mostrarUsuarios(){
        const sql = "SELECT * FROM usuarios";
        var usuariosBD;
        try{
            await this.conectarMySQL();
            [usuariosBD]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuarios Recuperados");
            // console.log(usuariosBD);
            return usuariosBD;
        } catch (error){
            console.error("Error al recuperar los datos de usuarios "+error);
            console.error(sql);
        }
    }
    async buscarUsuarioPorID(idUsuario){
        const sql="SELECT * FROM usuarios WHERE idusuario="+ idUsuario;
        try {
            await this.conectarMySQL();
            const usuario=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario registrado correctamente");
            return usuario;
        } catch (error){
            console.error("Error al recuperar el usuario "+ error);
            console.error(sql);
        }
    }

    async editarUsuario(usuario){
        const sql = `
        UPDATE usuarios SET
        nombre = ?,
        celular = ?,
        correo = ?
        WHERE idusuario = ?
        `;
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql, [usuario.nombre, usuario.celular, usuario.correo, usuario.idusuario]);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar usuario: " + error);
        }
    }

    async borrarUsuario(idusuario){
        const sql = "DELETE FROM usuarios WHERE idusuario = ?";
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql, [idusuario]);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el usuario: " + error);
        }
    }
}
module.exports = UsuarioDB;