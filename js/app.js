import GastoController from './GastoController.js';
import DOMController from './DOMController.js';

const loGastoController = new GastoController();
const loDOMController = new DOMController("registrar_gasto_section");

const loBotonRegistrarGastoSection = loDOMController.obtenerElementoById("registrar_gasto_btn");
const loBotonVisualizarGastosSection = loDOMController.obtenerElementoById("visualizar_gastos_btn");


loBotonRegistrarGastoSection.addEventListener("click", () => {
    loDOMController.blanquearSection();
    loDOMController.generarSectionById("menu", "registrar_gasto_section", loGastoController);
});

loBotonVisualizarGastosSection.addEventListener("click", () => {
    alert("Funcionalidad en desarrollo.");
    loDOMController.blanquearSection();
    loDOMController.generarSectionById("menu", "visualizar_gastos_section", loGastoController);
}); 
