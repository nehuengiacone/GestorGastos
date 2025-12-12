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
    // eliminarGasto() {
    //     // Lógica para eliminar un gasto
    // }

    // modificarGasto() {
    //     // Lógica para modificar un gasto
    // }
}

