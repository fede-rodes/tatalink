//======================================================================
// USER PROFILE:
//======================================================================
Meteor.publish('curUser', function() {

    // try to find the user by id
    var user = Meteor.users.findOne(this.userId);

    // if we can't find it, mark the subscription as ready and quit
    if (!user) {
        this.ready();
        return;
    }

	return [Meteor.users.find(this.userId, {fields: {profile: 1, votes: 1, _id: 1}})];
});
