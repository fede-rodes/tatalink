//======================================================================
// VOTE:
//======================================================================
Meteor.methods({'vote': function(playerGoingOut, playerGoingIn) {

   /////////////////////
   // CHECK ARGUMENTS //
   /////////////////////

   check([playerGoingOut, playerGoingIn], [String]);

   // User is logged in
   if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorised', 'the user is not logged in at addRemoveVote method');
      return;
   }

   /////////////
   // QUERIES //
   /////////////

   const curUserId = Meteor.userId();
   const curUser = Meteor.users.findOne({_id: curUserId}, {fields: {"votes": 1}});
   const players = Players.find({_id: {$in: [playerGoingOut, playerGoingIn]}}).fetch();
   const stats = Stats.findOne({});

   ////////////
   // CHECKS //
   ////////////

   if (players.length < 2) {
      throw new Meteor.Error('player-does-not-exist', 'player does not exist at addRemoveVote method');
      return;
   }
   if (!stats) {
      throw new Meteor.Error('stats-does-not-exist', 'stats does not exist at addRemoveVote method');
   	return;
   }
   // All changes has been done
   if (curUser.votes.length === 3) {
      console.log('3 votes already');
   	return;
   }
   // Players already selected
   var selected = false;
   _.each(curUser.votes, function(vote) {
      if (vote.goingOut === playerGoingOut || vote.goingIn === playerGoingIn) {
         selected = true;
      }
   });
   if (selected) {
      console.log('player already selected');
      return;
   }

   ///////////////////
   // DB OPERATIONS //
   ///////////////////

   const vote = {
      goingOut: playerGoingOut,
      goingIn: playerGoingIn,
      date: new Date()
   };

   Meteor.users.update({_id: curUserId}, {$addToSet: {votes: vote}});
   Players.update({_id: playerGoingOut}, {$inc: {goingOut: 1}});
   Players.update({_id: playerGoingIn}, {$inc: {goingIn: 1}});
   Stats.update({_id: stats._id}, {$inc: {totalVotes: 1}});

}});
