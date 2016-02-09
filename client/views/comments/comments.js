// ON RENDERED
Template.comments.onRendered(function() {

   // Re-load page to load FB comments widget
   try {
      FB.XFBML.parse();
   } catch(e) {}
});
