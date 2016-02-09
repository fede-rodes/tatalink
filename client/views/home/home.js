// EVENTS
Template.home.events({

   'click #js-how-it-works': function(event) {
      event.preventDefault();
      FlowRouter.go('how-it-works');
   },

   'click #js-votes': function(event) {
      event.preventDefault();
      FlowRouter.go('votes');
   },

   'click #js-hashtags': function(event) {
      event.preventDefault();
      FlowRouter.go('hashtags');
   },

   'click #js-comments': function(event) {
      event.preventDefault();
      FlowRouter.go('comments');
   }

});
