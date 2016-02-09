Template.appBody.onCreated(function() {

   // Current template instance
   var instance = this;

   // Set global subscriptions
   instance.autorun(function() {
      instance.subscribe('curUser');
      instance.subscribe('playersList');
      instance.subscribe('stats');
      instance.subscribe('score');
   });
});
//----------------------------------------------------------------------------//
Template.appBody.helpers({

   appReady: function() {
      return Template.instance().subscriptionsReady();
   }
});
