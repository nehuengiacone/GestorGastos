import BodyHTML from "./BodyHTML.js";

export default class DOMController {

    constructor(sIdElemento) {
        this.formulario = document.getElementById(sIdElemento);
        this.elemento = undefined;
        this.elementos = undefined;
        this.bodyHTML = new BodyHTML();
        this.eventsController = undefined;
        this.dolarController = undefined;
    }

    setEventsController(oEventsController) {
        this.eventsController = oEventsController;
    }

    getEventsController() {
        return this.eventsController;
    }

    setDolarController(oDolarController) {
        this.dolarController = oDolarController;
    }

    getDolarController() {
        return this.dolarController;
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
            for (const section of this.elemento) {
                this.eventsController.setEventoAnimacionSalidaSection(section);
            }
        }
        catch(error){
            console.error("Error al blanquear la sección:", error);
        }
    }

    blanquearFiltroVisualizarGastos(oGastoController) {
        Array.from(this.obtenerElementosByTagName("td")).forEach(elemento => elemento.remove()); //blanqueo la row
        this.generarVisualizarGastosSection(oGastoController, false, true);
    }

    generarSectionById(sIdElementoPadre, sIdSection, oGastoController) {
        // Llamada a los métodos para generar las secciones según el id
        this.elemento = this.obtenerElementoById(sIdElementoPadre);
        switch(sIdSection) {
            case "registrar_gasto_section":
                this.generarRegistrarGastoSection(true);
                break;
            case "visualizar_gastos_section":
                this.generarVisualizarGastosSection(oGastoController);
                break;
            case "visualizar_gastos_filtrados_section":
                this.generarVisualizarGastosSection(oGastoController, true);
                break;
            case "editar_gasto_section":
                this.generarEditaGastoSection(oGastoController);
                break;
            case "visualizar_cotizacion_dolar_section":
                this.generarVisualizarCotizacionDolarSection();
                break;
            default:
                // console.error(`Sección con id ${sIdSection} no reconocida.`);
                this.eventsController.alertyfy.mostrarAlertaError(`Sección con id ${sIdSection} no reconocida.`);
        }
    }

    generarRegistrarGastoSection(registra=false, edita=false) {
        this.elemento.innerHTML = this.bodyHTML.getRegistrarGastoSection();
        
        if(registra){    
            this.eventsController.setEventoRegistrarGastoSection();
        }

        if(edita){
            this.eventsController.setEventoModificarGastoSection();
        }
    }

    generarVisualizarGastosSection(oGastoController, esFiltrado=false, limpiarFiltro=false) {
        let laGastos = [];
        if(esFiltrado) {
            const lsMes = this.obtenerElementoById("mes").value;
            const lsAnio = this.obtenerElementoById("anio").value;
            laGastos = oGastoController.obtenerTodosLosGastosPorFiltro(lsMes, lsAnio);
            Array.from(this.obtenerElementosByTagName("td")).forEach(elemento => elemento.remove()); //blanqueo la row
            oGastoController.orderByFechaAsc(laGastos);
            this.generarFilasVisualizarGastos(laGastos);

            return esFiltrado;
        }

        if(!limpiarFiltro){
            this.elemento.innerHTML = this.bodyHTML.getVisualizarGastosSection();
        }
        
        laGastos = oGastoController.obtenerTodosLosGastosHabilitados();
        oGastoController.orderByFechaAsc(laGastos);
        this.generarFilasVisualizarGastos(laGastos);

        this.inicializarEventosBotones("filtrar_gastos_btn");
        this.inicializarEventosBotones("limpiar_filtro_btn", oGastoController);
        this.inicializarEventosBotones("editar_gastos_btn");
        this.inicializarEventosBotones("eliminar_gastos_btn");

        return esFiltrado;
    }

    generarFilasVisualizarGastos(aGastos) {
        const loTablaCuerpo = this.obtenerElementoById("gastos_table_body");
        let lnIndex = 1;
        aGastos.forEach(gasto => {
            if(gasto == undefined) return

            const fila = document.createElement('tr');
            fila.id = gasto.getClaveLocalStorage();
            fila.innerHTML = `
                <td colspan="1">${gasto.getFecha()}</td>
                <td colspan="1">${gasto.getCupon()}</td>
                <td colspan="1">${gasto.getDetalle()}</td>
                <td colspan="1">${gasto.getCuotas()}</td>
                <td colspan="1">${gasto.getCuota()}</td>
                <td colspan="1">${gasto.getImporte()}</td>
                <td colspan="1">${gasto.getMoneda()}</td>
                <td colspan="1"><button class="menu__card__boton editar_gastos_btn"><i class="bi bi-pencil-square"></i> Editar</button>
                <button class="delete__card__boton eliminar_gastos_btn"><i class="bi bi-trash"></i> Eliminar</button>
                </td>
            `;

            loTablaCuerpo.appendChild(fila);
            lnIndex++;  
        });
    }

    inicializarEventosBotones(sNombreClase, oGastoController=null) {
        const loBoton = this.obtenerElementosByClassName(sNombreClase);
        this.elementos = Array.from(loBoton);

        let oBoton = undefined;
        switch(sNombreClase) {
            case "filtrar_gastos_btn":
                oBoton = this.elementos[0];
                this.eventsController.setEventoBusquedaFiltradaDeGastoSection(oBoton);
                break;
            case "limpiar_filtro_btn":
                oBoton = this.elementos[0];
                this.eventsController.setEventoLimpiarFiltroDeGastoSection(oBoton, oGastoController);
                break;
            case "editar_gastos_btn":
                this.elementos.forEach(boton => {
                    this.eventsController.setEventoLlamarEditarGastoSection(boton);
                });
                break;
            case "eliminar_gastos_btn":
                this.elementos.forEach(boton => {
                    this.eventsController.setEventoEliminarGastoSection(boton);
                });
                break;
            default:
                break;
        }
    }

    generarEditaGastoSection(oGastoController){
        this.generarRegistrarGastoSection(false, true);
        
        const loFecha = this.obtenerElementoById("fechamov");
        loFecha.value = oGastoController.getGasto().getFecha();
        
        const loCupon = this.obtenerElementoById("cupon");
        loCupon.value = oGastoController.getGasto().getCupon();
        loCupon.disabled = true;

        const loDetalle = this.obtenerElementoById("detalle");
        loDetalle.value = oGastoController.getGasto().getDetalle();
        
        const loCuotas = this.obtenerElementoById("cuotas");
        loCuotas.value = oGastoController.getGasto().getCuotas();
        loCuotas.disabled = true;

        const loImporte = this.obtenerElementoById("importe");
        loImporte.value = oGastoController.getGasto().getImporte();
        
        const loBotonRegistrar = this.obtenerElementoById("registrar");
        loBotonRegistrar.textContent = "Guardar Cambios";
    }

    async generarVisualizarCotizacionDolarSection() {
        this.eventsController.alertyfy.mostrarAlerta('Funcionalidad en desarrollo.');

        this.elemento.innerHTML = this.bodyHTML.getVisualizarCotizacionDolarSection();
        const loTablaCuerpo = this.obtenerElementoById("cotizacion_table_body");

        const cotizaciones = await this.dolarController.consultarCotizacionDolarTodos();
        const coleccionDolar = this.dolarController.generarColeccionDolarDesdeJSON(cotizaciones);

        let lnIndex = 1;
        coleccionDolar.forEach(dolar => {
            if(dolar == undefined) return

            const fila = document.createElement('tr');
            fila.id = dolar.getNombre();
            fila.innerHTML = `
                <td colspan="1">${dolar.getCasa()}</td>
                <td colspan="1">${dolar.getCompra()}</td>
                <td colspan="1">${dolar.getVenta()}</td>
                <td colspan="1">${dolar.getFechaActualizacion()}</td>
                <!--<td colspan="1">${dolar.getMoneda()}</td>
                <td colspan="1">${dolar.getNombre()}</td>-->
            `;

            loTablaCuerpo.appendChild(fila);
            this.dolarController.blanquearColeccionDolar();
            lnIndex++;  
        });
    }
}