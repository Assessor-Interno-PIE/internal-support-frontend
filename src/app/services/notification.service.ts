import Swal from 'sweetalert2';

export class NotificationService {
  handleSuccess(message: string): void {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  handleError(message: string): void {
    Swal.fire({
      title: 'Erro!',
      text: message,
      icon: 'error',
    });
  }
}
