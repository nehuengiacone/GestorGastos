<h1>Gestionador de gastos de tarjetas de créditos.</h1>

Este sitio es el proyecto final entregable para el curso de JavaScript brindado por CoderHouse. 
Es posible que con el tiempo, el sitio crezca en funcionalidades.

<h2>Funcionalidades:</h2>

* **<i>Cargar cupón de un gasto cuotificado:</i>** Según las cantidades de cuotas que se asignen, se fraccionará el importe y se calculará las fechas de cada fracción.
* **<i>Visualización de gastos:</i>** Se podrá visualizar los gastos cargados y habiliados. Se añade funciones como filtro por mes y año, editar y eliminar gasto.
* **<i>Filtro por mes y año:</i>** Se podrá filtrar por mes y año para ver aquellos gastos dentro de un período. Para reiniciar la visualización
  al estado original, se puede borrar el filtro de busqueda configurado.
* **<i>Editar gasto:</i>** Se permite editar los datos de un gasto cargado, sea único o una cuota de un gasto más grande. No se permite editar: CUPÓN y CUOTA.
* **<i>Eliminar gasto:</i>** No lo elimina definitivamente. Cambia el estado del gasto para que el mismo no sea visualizado. Si el gasto a eliminar es una cuota de un gasto más grande,
  se alertará que se eliminaran (de la visualización) las demás cuotas que componen al gasto.
* **<i>Cotización del Dolar:</i>** Se podrá consultar la última actualización del Dolar en Argentina en todas sus cotizaciones. Se utiliza la API DolarApi para recuperar la información solicitada.
