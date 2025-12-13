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

    obtenerElementosByClassName(sClassName){
        return document.getElementsByClassName(sClassName);
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
            case "editar_gasto_section":
                this.generarEditaGastoSection(oGastoController);
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
            
            const lsMensajeValidacion = oGastoController.validarEntradas(loGasto)
            if(lsMensajeValidacion != ""){
                alert(lsMensajeValidacion);
                return;
            }

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

        let lnIndex = 0;
        laGastos.forEach(gasto => {
            if(gasto == undefined) return

            const fila = document.createElement('tr');
            fila.id = lnIndex;
            fila.innerHTML = `
                <td colspan="1">${gasto.fecha}</td>
                <td colspan="1">${gasto.detalle}</td>
                <td colspan="1">${gasto.cuotas}</td>
                <td colspan="1">${gasto.importe}</td>
                <td colspan="1"><button class="menu__card__boton editar_gastos_btn">Editar</button></td>
            `;

            loTablaCuerpo.appendChild(fila);
            lnIndex++;  
        });

        const loBotonEditarRegistroGasto = this.obtenerElementosByClassName("editar_gastos_btn");
        this.elementos = Array.from(loBotonEditarRegistroGasto);
        this.elementos.forEach(boton => {
            boton.addEventListener("click", () => {
                alert("Funcionalidad en desarrollo.");
                this.elemento = this.getElementById()
                this.blanquearSection();
                this.generarSectionById("menu", "editar_gasto_section", oGastoController);
            });
        });
    }

    generarEditaGastoSection(oGastoController){
        this.generarRegistrarGastoSection(oGastoController);
        const loFecha = this.getElementById("fechamov");
        const loDetalle = this.getElementById("detalle");
        const loCuotas = this.getElementById("cuotas");
        const loImporte = this.getElementById("importe");
    }
}