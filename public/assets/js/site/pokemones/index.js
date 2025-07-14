$(document).ready(function () {
    
  // Initialize the delete button with a confirmation dialog
  $('.delete-series').on('click', function (e) {
    e.preventDefault();
    const form = $(this).closest('form');
    if (confirm('Estas seguro que quieres eliminar esta pelicula?')) {
      form.submit();
    }
  });

});