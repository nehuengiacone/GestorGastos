import Alertyfy from "./Alertyfy.js";

export default class EventsController {

    constructor(oDOMController, oGastoController) {
        this.DOMController = oDOMController;
        this.GastoController = oGastoController;
        this.alertyfy = Alertyfy;
    }

    setEventoRegistrarGastoSection() {
        const loBotonRegistrar = this.DOMController.obtenerElementoById("registrar");
        loBotonRegistrar.addEventListener("click", () => {
            const lbRetorno = this.eventoGrabarGastoSection('registrar');
            if(lbRetorno){
                this.DOMController.blanquearSection();
            }
        });
    }

    setEventoModificarGastoSection() {
        const loBotonRegistrar = this.DOMController.obtenerElementoById("registrar");
        loBotonRegistrar.addEventListener("click", () => {            
            const lbRetorno = this.eventoGrabarGastoSection('modificar');
            if(lbRetorno){
                this.DOMController.blanquearSection();
            }
        });
    }

    setEventoAnimacionSalidaSection(oSection) {
        oSection.classList.add('menu__card--exit');

        oSection.addEventListener(
            'animationend',
            () => {
                oSection.innerHTML = '';
                oSection.remove();
            },
            { once: true }
        );
    }

    setEventoLlamarEditarGastoSection(oBoton) {
        oBoton.addEventListener("click", () => {
            const sIDFilaPadre = oBoton.parentElement.parentElement.id;    // Obtener el ID de la fila padre
            const oGastoSeleccionado = this.GastoController.seleccionarGasto(sIDFilaPadre);
            this.GastoController.setGasto(oGastoSeleccionado);
            this.DOMController.blanquearSection();
            this.DOMController.generarSectionById("menu", "editar_gasto_section", this.GastoController);
        });
    }

    setEventoInvocarSection(sIdSection) {
        // asigna evento al botón del navbar
        const loBotonNavBar = this.DOMController.obtenerElementoById(sIdSection);
        switch(sIdSection){
            case "registrar_gasto_btn":
                loBotonNavBar.addEventListener("click", () => {
                    this.eventoInvocarSection("registrar_gasto_section");
                });
                break
            case "visualizar_gastos_btn":
                loBotonNavBar.addEventListener("click", () => {
                    this.eventoInvocarSection("visualizar_gastos_section");
                });
                break;
            case "consultar_cotizacion_dolar_btn":
                loBotonNavBar.addEventListener("click", () => {
                    this.eventoInvocarSection("visualizar_cotizacion_dolar_section");
                });
                break;
            default:
                this.alertyfy.mostrarAlertaError(`Botón con id ${sIdSection} no reconocido.`);
        }
    }

    eventoGrabarGastoSection(accion='') {
        const lsFecha = this.DOMController.obtenerValorInputById("fechamov");
        const lsDetalle = this.DOMController.obtenerValorInputById("detalle");
        const lnCuotas = parseInt(this.DOMController.obtenerValorInputById("cuotas"));
        const lnImporte = parseFloat(this.DOMController.obtenerValorInputById("importe"));

        let lsClaveLocalStorage = '';
        if(this.GastoController.getGasto() != undefined){
            if(this.GastoController.getGasto().getClaveLocalStorage() != ''){
                lsClaveLocalStorage = this.GastoController.getGasto().getClaveLocalStorage();
            }
        }

        const loGasto = this.GastoController.generarGasto(lsFecha, lsDetalle, lnCuotas, lnImporte, lsClaveLocalStorage);

        const lsMensajeValidacion = this.GastoController.validarEntradas(loGasto);
        if(lsMensajeValidacion != ""){
            // alert(lsMensajeValidacion);
            this.alertyfy.mostrarAlertaError(lsMensajeValidacion);
            return false;
        }

        switch(accion){
            case 'registrar':
                this.GastoController.registrarGasto(loGasto);
                // alert('Gasto registrado con éxito.\nComo esto es una demo, ver persistencia en LocalStorage.');
                this.alertyfy.mostrarAlertaExito('Gasto registrado con éxito.\nComo esto es una demo, ver persistencia en LocalStorage.');
                break;
            case 'modificar':
                this.GastoController.modificarGasto(loGasto);
                // alert('Gasto modificado con éxito.\nComo esto es una demo, ver persistencia en LocalStorage.');
                this.alertyfy.mostrarAlertaExito('Gasto modificado con éxito.\nComo esto es una demo, ver persistencia en LocalStorage.');
                break;
            default:
                // console.error(`Acción ${accion} no reconocida.`);
                this.alertyfy.mostrarAlertaError(`Acción ${accion} no reconocida.`);
                return false;
        }

        this.DOMController.blanquearInputsTodos();

        return true;
    }

    eventoInvocarSection(sIdSection) {
        this.DOMController.blanquearSection();
        this.DOMController.generarSectionById("menu", sIdSection, this.GastoController);
    }
}