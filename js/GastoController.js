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

    generarGasto(sFecha, sCupon, sDetalle, nCuotas, nCuota, nImporte, sMoneda, sClaveLocalStorage='', bEstado=true) {
        this.gasto = new Gasto();
        this.gasto.setFecha(sFecha);
        this.gasto.setCupon(sCupon);
        this.gasto.setDetalle(sDetalle);
        this.gasto.setCuotas(nCuotas);
        this.gasto.setCuota(nCuota);
        this.gasto.setImporte(nImporte);
        this.gasto.setMoneda(sMoneda);
        this.gasto.setClaveLocalStorage(sClaveLocalStorage);
        this.gasto.setEstado(bEstado);

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
                loGastoData.cupon,
                loGastoData.detalle,
                loGastoData.cuotas,
                loGastoData.cuota,
                loGastoData.importe,
                loGastoData.moneda,
                loGastoData.claveLocalStorage,
                loGastoData.estado
            );
        }
    }

    seleccionarGastoCuotificado(sCupon, sDetalle) {
        // Lógica para se[leccionar un gasto cuotificado por cupón
        const laGastos = [];
        for (let nKey = 1; nKey <= localStorage.length; nKey++) {
            let lsLocalStorageKey = this.prefijoLocalStorage + nKey;
            let loGastoData = this.seleccionarGasto(lsLocalStorageKey);

            if (loGastoData && loGastoData.getCupon() === sCupon && loGastoData.getEstado() && 
                loGastoData.getDetalle() == sDetalle) {
                laGastos.push(loGastoData);
            }
        }

        if(laGastos.length > 0){
            return laGastos;
        }

        return null
    }

    setGasto(oGasto) {
        this.gasto = oGasto;
    }

    getGasto() {
        return this.gasto;
    }

    obtenerTodosLosGastosHabilitados() {
        const laGastos = [];
        for (let nKey = 1; nKey <= localStorage.length; nKey++) {
            const key = localStorage.key(nKey - 1);
            // let lsLocalStorageKey = this.prefijoLocalStorage + nKey;
            let loGastoData = this.seleccionarGasto(key);
            
            if(!loGastoData.getEstado()) continue;
            laGastos.push(loGastoData);
        }

        return laGastos;
    }

    obtenerTodosLosGastos() {
        const laGastos = [];
        for (let nKey = 1; nKey <= localStorage.length; nKey++) {
            const key = localStorage.key(nKey - 1);
            // let lsLocalStorageKey = this.prefijoLocalStorage + nKey;
            let loGastoData = this.seleccionarGasto(key);
            
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

        if(oGasto.cupon == ""){
            return "El Cupón está vacío.";
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

    // eliminarGasto(sClaveLocalStorage) {
    //     localStorage.removeItem(sClaveLocalStorage);
    // }
}