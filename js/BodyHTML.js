export default class BodyHTML {

    constructor() {
        // Constructor vacío
    }

    getRegistrarGastoSection() {
        return `<section class="menu__card" id="registrar_gasto_section">
            <header class="menu__card__titulo">
                <h2>Registrar Nuevo Gasto</h2>
            </header>
            <div class="menu__card__contenido">
                <div class="card__form__elements">
                    <label for="fechamov">Fecha</label>
                    <input type="date" name="fechamov" id="fechamov">
                </div>
    
                <div class="card__form__elements">
                    <label for="detalle">Detalle</label>
                    <input type="text" name="detalle" id="detalle">
                </div>
    
                <div class="card__form__elements">
                    <label for="cuotas">Cuotas</label>
                    <select name="cuotas" id="cuotas">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                    </select>
                </div>
    
                <div class="card__form__elements">
                    <label for="importe">Importe</label>
                    <input type="text" name="importe" id="importe">
                </div>
                
                <!--<input type="button" value="Registrar" class="menu__card__boton" id="registrar">-->
                <button class="menu__card__boton" id="registrar">Registrar</button>
            </div>
        </section>`;
    }

    getVisualizarGastosSection() {
        return `<section class="menu__card_tabla" id="visualizar_gastos_section">
            <header class="menu__card__titulo">
                <h2>Gastos</h2>
            </header>
            <div class="menu__card__contenido_tabla">
                <table class="menu__card__table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Detalle</th>
                            <th>Cuotas</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody id="gastos_table_body">
                        <!-- Rows apareceran dinamicamente por Js -->
                    </tbody>
                </table>
            </div>
        </section>`; 
    }
}

