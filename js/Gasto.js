
export default class Gasto {

    constructor() {
        this.fecha = '';
        this.detalle = '';
        this.cuotas = 0;
        this.importe = 0;
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

    setImporte(nImporte) {
        this.importe = nImporte;
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

    getImporte() {
        return this.importe;
    }

    getClaveLocalStorage() {
        return this.claveLocalStorage;
    }
}