export default class Alertyfy {
    
    static mostrarAlertaExito(mensaje) {
        alertify.set('notifier','position', 'top-center');
        alertify.success(mensaje, 4); 
    }

    static mostrarAlertaError(mensaje) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(mensaje, 4); 
    }

    static mostrarAlertaWarning(mensaje) {
        alertify.set('notifier','position', 'top-center');
        alertify.warning(mensaje, 2); 
    }

    static mostrarAlerta(mensaje, modal=true) {

        let settings = {
            'label': 'ACEPTAR',
            'title': 'Alerta',
            'message': mensaje,
            'modal': modal,
            'closeable': false,
            'onok': function(){},
        };
        alertify.alert(mensaje).setting(settings).show();
    }
}