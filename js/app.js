import GastoController from './GastoController.js';
import DOMController from './DOMController.js';
import EventsController from "./EventsController.js";
import DolarController  from './DolarController.js';

const loGastoController = new GastoController();
const loDOMController = new DOMController("registrar_gasto_section");
const loEventsController = new EventsController(loDOMController, loGastoController);
const dolarController = new DolarController();

loDOMController.setEventsController(loEventsController);
loDOMController.setDolarController(dolarController);

let lsMensaje = "Funcionalidad en desarrollo.\n";
lsMensaje += "Los gastos registrados no se almacenarán en base de datos.\n";
lsMensaje += "Las registraciones solo se mantendrán en el Local Storage del navegador.";
loEventsController.alertyfy.mostrarAlerta(lsMensaje);

//botones del navbar
const laNavbarButtons = ["registrar_gasto_btn", "visualizar_gastos_btn", "consultar_cotizacion_dolar_btn"];
for (const lsButtonId of laNavbarButtons){
    loEventsController.setEventoInvocarSection(lsButtonId);
}