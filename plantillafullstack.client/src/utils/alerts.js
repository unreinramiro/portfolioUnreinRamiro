import Swal from 'sweetalert2';

// Configuración base común
const modernSwal = Swal.mixin({
    customClass: {
        popup: 'swal-modern-popup',
        title: 'swal-modern-title',
        htmlContainer: 'swal-modern-content',
        confirmButton: 'swal-modern-confirm',
        cancelButton: 'swal-modern-cancel',
        icon: 'swal-modern-icon',
        input: 'swal-modern-input'
    },
    buttonsStyling: false,
    showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
    }
});

export const alertDelete = (title = '¿Eliminar este elemento?', text = 'Esta acción no se puede deshacer.') => {
    return modernSwal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e2685f',
        reverseButtons: true
    });
};

// Alert de éxito
export const alertSuccess = (title, text = '') => {
    return modernSwal.fire({
        icon: 'success',
        title,
        text,
        timer: 2500,
        showConfirmButton: false
    });
};

// Alert de error
export const alertError = (title, text = '') => {
    return modernSwal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: 'Entendido'
    });
};

// Alert de confirmación
export const alertConfirm = (title, text = '') => {
    return modernSwal.fire({
        icon: 'question',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });
};

// Alert informativo
export const alertInfo = (title, text = '') => {
    return modernSwal.fire({
        icon: 'info',
        title,
        text,
        confirmButtonText: 'OK'
    });
};

// Toast (notificación pequeña)
export const alertToast = (icon, title) => {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'swal-modern-popup'
        }
    });

};