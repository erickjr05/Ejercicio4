class Producto {
    constructor(producto) {
        this.id = producto.idproducto;
        this.nombre = producto.nombre;
        this.descripcion= producto.descripcion;
        this.cantidad = producto.cantidad;
    }

    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
            this._nombre = nombre;
    }

    set  descripcion (descripcion) {
            this._descripcion = descripcion;
    }

    set cantidad(cantidad) {
            this._cantidad = cantidad;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    get cantidad() {
        return this._cantidad;
    }

    get obtenerDatosp() {
        return {
            idproducto: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            cantidad: this.cantidad
        }
    }
}

module.exports = Producto;