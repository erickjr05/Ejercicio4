const ConectarBD = require("./conexionBD.js");

class ProductoDB extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoProducto(producto) {
        const sql = "INSERT INTO productos (nombre, descripcion, cantidad) VALUES (?, ?, ?)";
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql, [producto.nombre, producto.descripcion, producto.cantidad]);
            await this.cerrarConexion();
            console.log("Dato insertado a MySql");
        } catch (error) {
            console.error("Error al insertar datos en MySql: " + error);
        }
    }

    async mostrarProductos(){
        const sql = "SELECT * FROM productos";
        var productoBD;
        try{
            await this.conectarMySQL();
            [productoBD]=await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Producto Recuperados");
            return productoBD;
        } catch (error){
            console.error("Error al recuperar los datos de producto "+error);
            console.error(sql);
        }
    }
    async buscarProductoPorID(idProducto){
        const sql = "SELECT * FROM productos WHERE idproducto = ?";
        try {
            await this.conectarMySQL();
            const [producto] = await this.conexion.execute(sql, [idProducto]);
            await this.cerrarConexion();
            console.log("Producto registrado correctamente");
            return producto;
        } catch (error) {
            console.error("Error al recuperar el producto: " + error);
        }
    }

    async editarProducto(producto){
        const sql = `
        UPDATE productos SET
        nombre = ?,
        descripcion = ?,
        cantidad = ?
        WHERE idproducto = ?
        `;
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql, [producto.nombre, producto.descripcion, producto.cantidad, producto.idproducto]);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al editar producto: " + error);
        }
    }

    async borrarProducto(idproducto){
        const sql = "DELETE FROM productos WHERE idproducto = ?";
        try {
            await this.conectarMySQL();
            await this.conexion.execute(sql, [idproducto]);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el producto: " + error);
        }
    }
}
module.exports = ProductoDB;