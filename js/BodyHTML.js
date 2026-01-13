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
                    <label for="cupon">Cupón</label>
                    <input type="text" name="cupon" id="cupon">
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
                    <label for="moneda">Moneda</label>
                    <select name="moneda" id="moneda">
                        <option value="PES">PES</option>
                        <option value="USD">USD</option>
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
                <div class="card__form__elements">
                    <label for="mes">Mes</label>
                    <select name="mes" id="mes">
                        <option value="0">Enero</option>
                        <option value="1">Febrero</option>
                        <option value="2">Marzo</option>
                        <option value="3">Abril</option>
                        <option value="4">Mayo</option>
                        <option value="5">Junio</option>
                        <option value="6">Julio</option>
                        <option value="7">Agosto</option>
                        <option value="8">Septiembre</option>
                        <option value="9">Octubre</option>
                        <option value="10">Noviembre</option>
                        <option value="11">diciembre</option>
                    </select>

                    <label for="anio">Año</label>
                    <select name="anio" id="anio">
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>
                    <button class="menu__card__boton filtrar_gastos_btn"><i class="bi bi-funnel"></i> Filtrar</button>
                    <button class="delete__card__boton limpiar_filtro_btn"><i class="bi bi-x-circle-fill"></i> Limpiar Filtro</button>
                </div>

                <table class="menu__card__table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cupon</th>
                            <th>Detalle</th>
                            <th>Cuotas</th>
                            <th>Cuota</th>
                            <th>Importe</th>
                            <th>Moneda</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody id="gastos_table_body">
                        <!-- Rows apareceran dinamicamente por Js -->
                    </tbody>
                </table>
            </div>
        </section>`; 
    }

    getVisualizarCotizacionDolarSection() {
        return `<section class="menu__card_tabla" id="visualizar_cotizacion_dolar_section">
            <header class="menu__card__titulo">
                <h2>Cotización Dólar</h2>
            </header>
            <div class="menu__card__contenido_tabla">
                <table class="menu__card__table">
                    <thead>
                        <tr>
                            <th>Casa</th>
                            <th>Compra</th>
                            <th>Venta</th>
                            <th>Fecha Actualización</th>
                            <!--<th>Moneda</th>
                            <th>Nombre</th>-->
                        </tr>
                    </thead>
                    <tbody id="cotizacion_table_body">
                        <!-- Rows apareceran dinamicamente por Js -->
                    </tbody>
                </table>
            </div>
        </section>`; 
    }
}