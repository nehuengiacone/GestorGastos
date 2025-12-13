import Gasto from './Gasto.js';

export default class GastoController {

    constructor() {
        this.gasto = undefined;
    }

    calcularFechaFinal() {
        let fechaFinal = new Date(this.fecha);
        fechaFinal.setMonth(fechaFinal.getMonth() + this.cuotas);
        return fechaFinal;
    }

    calcularImportePorCuota() {
        return this.importe / this.cuotas;
    } 

    generarGasto(sFecha, sDetalle, nCuotas, nImporte) {
        this.gasto = new Gasto();
        this.gasto.setFecha(sFecha);
        this.gasto.setDetalle(sDetalle);
        this.gasto.setCuotas(nCuotas);
        this.gasto.setImporte(nImporte);

        return this.gasto;
    }

    registrarGasto(oGasto) {
        // Lógica para registrar el gasto
        const lnKeyLocalStorage = localStorage.length + 1;
        localStorage.setItem(lnKeyLocalStorage, JSON.stringify(oGasto));
    }

    seleccionarGasto(nKey) {
        // Lógica para seleccionar un gasto
        const loGastoData = JSON.parse(localStorage.getItem(nKey));
        if (loGastoData) {
            return this.generarGasto(
                loGastoData.fecha,
                loGastoData.detalle,
                loGastoData.cuotas,
                loGastoData.importe
            );
        }
    }

    obtenerTodosLosGastos() {
        const laGastos = [];
        for (let nKey = 1; nKey <= localStorage.length; nKey++) {
            let lnLocalStorageKey = localStorage.key(nKey);
            let loGastoData = this.seleccionarGasto(lnLocalStorageKey);
            
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

        if(oGasto.importe == ""){
            return "El Importe está vacío.";
        }

        if(isNaN(oGasto.importe)){
            return "Campo Importe: No ingresó un número.";
        }

        return "";
    }
    // eliminarGasto() {
    //     // Lógica para eliminar un gasto
    // }

    // modificarGasto() {
    //     // Lógica para modificar un gasto
    // }
}

