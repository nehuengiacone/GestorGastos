export default class DolarAPIController {

    constructor() {
        this.API_URL = 'https://dolarapi.com/v1/';
    }

    async consultarCotizacionDolarTodos() {
        try {
            const response = await fetch(`${this.API_URL}dolares`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            return await response.json();
        }
        catch (error) { 
            console.error('Error al consultar la cotización del dólar:', error);
            throw error;
        }
    }
}