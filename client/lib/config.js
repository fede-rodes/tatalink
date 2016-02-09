//======================================================================
// TOAST MESSAGES:
//======================================================================
toastr.options.positionClass = "toast-bottom-left";

// On the Client
/*Comments.ui.config({
   template: 'bootstrap' // or ionic, semantic-ui
});*/

/*Comments.ui.setContent({
  title: 'Comentarios',
  save: 'Guardar',
  reply: 'Responder',
  edit: 'Editar',
  remove: 'Borrar',
  'placeholder-textarea': 'Comentar...',
  'add-button-reply': 'Agregar una respuesta',
  'add-button': 'Agregar comentario',
  'load-more': 'Mostrar más'
});*/


/*window.fbAsyncInit = function() {
   FB.init({
      appId: '182069515490644',
      status: true,
      xfbml: true,
      version: 'v2.5'
   });
};*/

Meteor.startup(function () {
   $('body').prepend('<div id="fb-root"></div>');
   (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5&appId=1552049091746436";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});

/*Meteor.startup(function(){
   Meteor.Spinner.options = {
      lines: 13, // The number of lines to draw
      length: 10, // The length of each line
      width: 5, // The line thickness
      radius: 15, // The radius of the inner circle
      corners: 0.7, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#E8E8E8', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
   };
});*/
