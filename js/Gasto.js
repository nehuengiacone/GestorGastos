
export default class Gasto {

    constructor() {
        this.fecha = '';
        this.detalle = '';
        this.cuotas = 0;
        this.cuota = 0;
        this.importe = 0;
        this.moneda = '';
        this.claveLocalStorage = '';
    }

    //sets
    setFecha(sFecha) {
        this.fecha = sFecha;
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

    //gets
    getFecha() {
        return this.fecha;
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
}