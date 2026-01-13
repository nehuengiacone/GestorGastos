
export default class Gasto {

    constructor() {
        this.fecha = '';
        this.mes = '';
        this.anio = '';
        this.cupon = '';
        this.detalle = '';
        this.cuotas = 0;
        this.cuota = 0;
        this.importe = 0;
        this.moneda = '';
        this.claveLocalStorage = '';
        this.estado = true;
    }

    //sets
    setFecha(sFecha) {
        this.fecha = sFecha;
    }

    setCupon(sCupon) {
        this.cupon = sCupon;
    }

    setDetalle(sDetalle) {
        this.detalle = sDetalle;
    }

    setCuotas(nCuotas) {
        this.cuotas = nCuotas;
    }

    setCuota(nCuota) {
        this.cuota = nCuota;
    }

    setImporte(nImporte) {
        this.importe = nImporte;
    }

    setMoneda(sMoneda) {
        this.moneda = sMoneda;
    }

    setClaveLocalStorage(sClave) {
        this.claveLocalStorage = sClave;
    }

    setEstado(bEstado) {
        this.estado = bEstado;
    }

    //gets
    getFecha() {
        return this.fecha;
    }

    getAnio() {
        return new Date(this.fecha).getFullYear().toString();
    }

    getMes() { 
        return new Date(this.fecha).getMonth().toString();
    }

    getCupon() {
        return this.cupon;
    }

    getDetalle() {
        return this.detalle;
    }

    getCuotas() {
        return this.cuotas;
    }

    getCuota() {
        return this.cuota;
    }

    getImporte() {
        return this.importe;
    }

    getMoneda() {
        return this.moneda;
    }

    getClaveLocalStorage() {
        return this.claveLocalStorage;
    }

    getEstado() {
        return this.estado;
    }
}