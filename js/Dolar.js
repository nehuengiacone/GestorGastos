export default class Dolar{
    constructor(casa, compra, venta, fechaActualizacion, moneda, nombre){
        this.casa = casa;
        this.compra = compra;
        this.venta = venta;
        this.fechaActualizacion = new Date(fechaActualizacion).toLocaleDateString("es-AR", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        this.moneda = moneda;
        this.nombre = nombre;
    }

    setCasa(casa){
        this.casa = casa;
    }

    setCompra(compra){
        this.compra = compra;
    }

    setVenta(venta){
        this.venta = venta;
    }

    setMoneda(moneda){
        this.moneda = moneda;
    }

    setFechaActualizacion(fechaActualizacion){
        this.fechaActualizacion = new Date(fechaActualizacion).toLocaleDateString("es-AR", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    getCasa(){
        return this.casa;
    }

    getCompra(){
        return this.compra;
    }

    getVenta(){
        return this.venta;
    }

    getMoneda(){
        return this.moneda;
    }

    getFechaActualizacion(){
        return this.fechaActualizacion;
    }

    getNombre(){
        return this.nombre;
    }
}