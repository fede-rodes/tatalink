// SERVER SIDE:
/*
 * Users are by default allowed to specify their own profile field with
 * Accounts.createUser and modify it with Meteor.users.update. To allow
 * users to edit additional fields, use Meteor.users.allow. To forbid
 * users from making any modifications to their user document:
 * Meteor.users.deny({update: function () { return true; }});
 *
 * Source: http://docs.meteor.com/#/basic/Meteor-users
 */


//======================================================================
// ON ACCOUNTS CREATION:
//======================================================================
/*Accounts.onCreateUser(function (options, user) {

	user.votes = {
		goingIn: [],
		goingOut: []
	};

	return user;
});*/

/*Accounts.onCreateUser(function(options, user) {
   var currentUser = Meteor.user();
   if (!_.isUndefined(currentUser.profile) && currentUser.profile.guest === true) {
      Meteor.users.update({_id: user._id}, {$set: {votes: {goingIn: [], goingOut: []}}});
   }
   if (options.profile) {
      user.profile = options.profile;
   }
   return user;
});

Accounts.onCreateUser(function(options, user) {
   return user;
});

if (_.isUndefined(user.votes)) {
   Meteor.users.update({_id: user._id}, {$addToSet: {votes: {goingIn: [], goingOut: []}}});
}*/
