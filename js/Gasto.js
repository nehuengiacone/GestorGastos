
export default class Gasto {

    constructor() {
        this.fecha = '';
        this.detalle = '';
        this.cuotas = 0;
        this.importe = 0;
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
}