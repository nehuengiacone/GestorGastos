import BodyHTML from "./BodyHTML.js";

export default class DOMController {

    constructor(sIdElemento) {
        this.formulario = document.getElementById(sIdElemento);
        this.elemento = undefined;
        this.elementos = undefined;
        this.bodyHTML = new BodyHTML();
    }

    obtenerElementoById(sIdElemento) {
        return document.getElementById(sIdElemento);
    }

    obtenerElementosByTagName(sTagName) {
        return document.getElementsByTagName(sTagName);
    }

    obtenerValorInputById(sIdInput) {
        this.elemento = this.obtenerElementoById(sIdInput);
        return this.elemento.value;
    }

    blanquearInputsTodos() {
        this.elementos = this.obtenerElementosByTagName("input");
        this.elementos = Array.from(this.elementos);

        this.elementos.forEach(elemento => {
            elemento.value = '';
        });
    }

    blanquearSection() {
        try{            
            this.elemento = document.getElementsByTagName("section");
            this.elemento.innerHTML = ``;
        }
        catch(error){
            console.error("Error al blanquear la sección:", error);
        }
    }

    generarSectionById(sIdElementoPadre, sIdSection, oGastoController) {
        this.elemento = this.obtenerElementoById(sIdElementoPadre);

        switch(sIdSection) {
            case "registrar_gasto_section":
                this.generarRegistrarGastoSection(oGastoController);
                break;
            case "visualizar_gastos_section":
                this.generarVisualizarGastosSection(oGastoController);
                break;
            default:
                console.error(`Sección con id ${sIdSection} no reconocida.`);
        }
        
    }

    generarRegistrarGastoSection(oGastoController) {
        this.elemento.innerHTML = this.bodyHTML.getRegistrarGastoSection();

        const loBotonRegistrar = this.obtenerElementoById("registrar");
            loBotonRegistrar.addEventListener("click", () => {
            const lsFecha = this.obtenerValorInputById("fechamov");
            const lsDetalle = this.obtenerValorInputById("detalle");
            const lnCuotas = parseInt(this.obtenerValorInputById("cuotas"));
            const lnImporte = parseFloat(this.obtenerValorInputById("importe"));

            const loGasto = oGastoController.generarGasto(lsFecha, lsDetalle, lnCuotas, lnImporte);
            oGastoController.registrarGasto(loGasto);

            console.log('Gasto registrado:', loGasto);
            alert('Gasto registrado con éxito.\nComo esto es una demo, ver persistencia en LocalStorage.');

            this.blanquearInputsTodos();
        });
    }

    generarVisualizarGastosSection(oGastoController) {
        this.elemento.innerHTML = this.bodyHTML.getVisualizarGastosSection();
        const loTablaCuerpo = this.obtenerElementoById("gastos_table_body");

        const laGastos = oGastoController.obtenerTodosLosGastos();
        oGastoController.orderByFechaAsc(laGastos);


        laGastos.forEach(gasto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td colspan="1">${gasto.fecha}</td>
                <td colspan="1">${gasto.detalle}</td>
                <td colspan="1">${gasto.cuotas}</td>
                <td colspan="1">${gasto.importe}</td>
            `;

            loTablaCuerpo.appendChild(fila);
        });
    }
}