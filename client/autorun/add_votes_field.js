// CLIENT SIDE:


//======================================================================
// RESET DEFAULT SESSION VARIABLES:
//======================================================================
/*Tracker.autorun(function() {
	if (Session.equals('votesFieldAdded', false)) {

		// Keep looping until user settings are ready
		if (_.isNull(Meteor.user()) || _.isUndefined(Meteor.user())) {
			return;
		}

		// Keep looping until user settings are ready
		if (!_.isUndefined(Meteor.user().votes)) {
         Session.set('votesFieldAdded', true);
			return;
		}

      var currentUserId = Meteor.userId();
      if (!currentUserId) {
         return;
      }

      // Fetch current user
      var currentUser = Meteor.users.findOne(currentUserId);

      if (!currentUser) {
         console.log('not current user');
         return;
      }

      if (_.isUndefined(currentUser.votes)) {
         console.log('adding votes to user');
         //Meteor.users.update({_id: currentUserId}, {$addToSet: {votes: {'goingIn': [], 'goingOut': []}}});
         Meteor.call('addVotesField', function(error) {
            if (error) {
               console.log(error);
            }
         });
      }

		Session.set('votesFieldAdded', true);
		//console.log('default settings reset');
	}
});*/
