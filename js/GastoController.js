import Gasto from './Gasto.js';

export default class GastoController {

    constructor() {
        this.gasto = undefined;
        this.prefijoLocalStorage = "GASTOS_";
    }

    calcularFecha(numero) {
        let fecha = new Date();
        fecha.setMonth(fecha.getMonth() + numero);
        fecha = fecha.toISOString().split('T')[0];
        return fecha;
    }

    calcularImportePorCuota() {
        return this.importe / this.cuotas;
    }
    
    redondearADecimal(numero, decimales) {
        const factor = Math.pow(10, decimales);
        return Math.round(numero * factor) / factor;
    }

    generarGasto(sFecha, sDetalle, nCuotas, nCuota,nImporte, sMoneda, sClaveLocalStorage='') {
        this.gasto = new Gasto();
        this.gasto.setFecha(sFecha);
        this.gasto.setDetalle(sDetalle);
        this.gasto.setCuotas(nCuotas);
        this.gasto.setCuota(nCuota);
        this.gasto.setImporte(nImporte);
        this.gasto.setMoneda(sMoneda);
        this.gasto.setClaveLocalStorage(sClaveLocalStorage);

        return this.gasto;
    }

    registrarGasto(oGasto) {
        // Lógica para registrar el gasto
        const importePorCuota = oGasto.getImporte() / oGasto.getCuotas();
        for (let cuota = 1; cuota <= oGasto.getCuotas(); cuota++) {
            const lnKeyLocalStorage = this.prefijoLocalStorage + (localStorage.length + 1);
            oGasto.setFecha(this.calcularFecha(cuota));
            oGasto.setImporte(this.redondearADecimal(importePorCuota, 2));
            oGasto.setCuota(cuota);
            oGasto.setClaveLocalStorage(lnKeyLocalStorage);
            localStorage.setItem(lnKeyLocalStorage, JSON.stringify(oGasto));
        }

    }

    seleccionarGasto(sKey) {
        // Lógica para seleccionar un gasto
        const loGastoData = JSON.parse(localStorage.getItem(sKey));
        if (loGastoData) {
            return this.generarGasto(
                loGastoData.fecha,
                loGastoData.detalle,
                loGastoData.cuotas,
                loGastoData.cuota,
                loGastoData.importe,
                loGastoData.moneda,
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