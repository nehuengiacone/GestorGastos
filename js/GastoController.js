import Gasto from './Gasto.js';

export default class GastoController {

    constructor() {
        this.gasto = undefined;
        this.prefijoLocalStorage = "GASTOS_";
    }

    calcularFechaFinal() {
        let fechaFinal = new Date(this.fecha);
        fechaFinal.setMonth(fechaFinal.getMonth() + this.cuotas);
        return fechaFinal;
    }

    calcularImportePorCuota() {
        return this.importe / this.cuotas;
    } 

    generarGasto(sFecha, sDetalle, nCuotas, nImporte, sClaveLocalStorage='') {
        this.gasto = new Gasto();
        this.gasto.setFecha(sFecha);
        this.gasto.setDetalle(sDetalle);
        this.gasto.setCuotas(nCuotas);
        this.gasto.setImporte(nImporte);
        this.gasto.setClaveLocalStorage(sClaveLocalStorage);

        return this.gasto;
    }

    registrarGasto(oGasto) {
        // Lógica para registrar el gasto
        const lnKeyLocalStorage = this.prefijoLocalStorage + (localStorage.length + 1);
        oGasto.setClaveLocalStorage(lnKeyLocalStorage);
        localStorage.setItem(lnKeyLocalStorage, JSON.stringify(oGasto));
    }

    seleccionarGasto(sKey) {
        // Lógica para seleccionar un gasto
        const loGastoData = JSON.parse(localStorage.getItem(sKey));
        if (loGastoData) {
            return this.generarGasto(
                loGastoData.fecha,
                loGastoData.detalle,
                loGastoData.cuotas,
                loGastoData.importe,
                loGastoData.claveLocalStorage
            );
        }
    }

    setGasto(oGasto) {
        this.gasto = oGasto;
    }

    getGasto() {
        return this.gasto;
    }

    obtenerTodosLosGastos() {
        const laGastos = [];
        for (let nKey = 1; nKey <= localStorage.length; nKey++) {
            let lsLocalStorageKey = this.prefijoLocalStorage + nKey;
            let loGastoData = this.seleccionarGasto(lsLocalStorageKey);
            
            laGastos.push(loGastoData);
        }

        return laGastos;
    }

    orderByFechaAsc(aColeccion) {
        aColeccion.sort((a,b) => new Date(a.fecha) - new Date(b.fecha)); 
    }

    validarEntradas(oGasto) {
        if(oGasto.fecha == ""){
            return "La Fecha está vacía.";
        }

        if(oGasto.detalle == ""){
            return "El Detalle está vacío.";
        }

        if(oGasto.cuotas == ""){
            return "Las Cuotas están vacías";
        }

        if(isNaN(oGasto.cuotas)){
            return "Campo Cuotas: No ingresó un número.";
        }

        if(oGasto.importe == "" || oGasto.importe == 0){
            return "El Importe está vacío o es cero.";
        }

        if(isNaN(oGasto.importe)){
            return "Campo Importe: No ingresó un número.";
        }

        return "";
    }

    modificarGasto(oGasto) {
        // Lógica para modificar un gasto
        const lsClave = oGasto.getClaveLocalStorage();
        localStorage.removeItem(lsClave);
        localStorage.setItem(lsClave, JSON.stringify(oGasto));
    }
}