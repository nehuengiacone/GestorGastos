import Dolar from './Dolar.js';
import DolarAPIController from './DolarAPIController.js';

export default class DolarController extends DolarAPIController {

    constructor() {
        super();
        this.coleccionDolar = [];
        this.dolar = undefined;
    }

    generarColeccionDolarDesdeJSON(datosJson) {
        datosJson.forEach(objeto => {
            this.dolar = new Dolar(objeto.nombre, objeto.compra, objeto.venta, objeto.fechaActualizacion, objeto.moneda, objeto.casa);
            this.coleccionDolar.push(this.dolar);
        });

        return this.coleccionDolar;
    }
}