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

    static mostrarConfirmacion(mensaje, fActionOk, fActionCancel) {
        let settings = {
            'label': 'ACEPTAR',
            'title': 'Confirmación',
            'message': mensaje,
            'modal': true,
            'closable': false,
            'onok': () => fActionOk(),
            'oncancel': () => fActionCancel()
        };
        alertify.confirm(mensaje).setting(settings).show();
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