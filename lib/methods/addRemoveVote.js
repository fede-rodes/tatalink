/*Meteor.methods({'addRemoveVote': function(playerId) {

   /////////////////////
   // CHECK ARGUMENTS //
   /////////////////////

   check(playerId, String);

   // User is logged in
   if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorised', 'the user is not logged in at addRemoveVote method');
      return;
   }

   /////////////
   // QUERIES //
   /////////////

   const curUserId = Meteor.userId();
   const curUser = Meteor.users.findOne({_id: curUserId});
   const player = Players.findOne({_id: playerId});
   const stats = Stats.findOne({});

   ////////////
   // CHECKS //
   ////////////

   if (!player) {
      throw new Meteor.Error('player-does-not-exist', 'player does not exist at addRemoveVote method');
      return;
   }
   if (!stats) {
      throw new Meteor.Error('stats-does-not-exist', 'stats does not exist at addRemoveVote method');
   	return;
   }

   ///////////////////
   // DB OPERATIONS //
   ///////////////////

   var goingOutVotes = curUser.votes.goingOut || [];
   var goingInVotes = curUser.votes.goingIn || [];

   switch (player.status) {

      case 'playing':
         // The player has not been selected by the cur user
         if (_.indexOf(goingOutVotes, playerId) === -1) {
            if (goingOutVotes.length === 3) {
            	return {status: 'error', text: 'No podes sacar mas de 3 jugadores!'}; // msg
            }
            Meteor.users.update({_id: curUserId}, {$addToSet: {'votes.goingOut': playerId}});
            Players.update({_id: playerId}, {$inc: {goingOut: 1}});
            Stats.update({_id: stats._id}, {$inc: {votesGoingOut: 1}});
         } else {
            if (goingOutVotes.length === 0) {
               throw new Meteor.Error('exceeds-lower-limit', 'stats does not exist at addRemoveVote method');
         	   return;
            }
            Meteor.users.update({_id: curUserId}, {$pull: {'votes.goingOut': playerId}});
            Players.update({_id: playerId}, {$inc: {goingOut: -1}});
            Stats.update({_id: stats._id}, {$inc: {votesGoingOut: -1}});
         }
         break;

      case 'substitute':
         // The player has not been selected by the cur user
         if (_.indexOf(goingInVotes, playerId) === -1) {

         } else {

         }
         break;
   }



   // If the player is playing and is not in the going out votes of the user, add him to said list
   if (player.status === 'playing' && _.indexOf(goingOutVotes, playerId) === -1) {


   }
   // If the player is playing and is already in the going out votes of the user, remove him from that list
   else if (player.status === 'playing' && _.indexOf(goingOutVotes, playerId) !== -1) {
      if (goingOutVotes.length === 0) {
         console.log('ya tenes cero');
         return;
      }
      Meteor.users.update({_id: currentUserId}, {$pull: {'votes.goingOut': playerId}});
      Players.update({_id: playerId}, {$inc: {goingOut: -1}});
      Stats.update({_id: stats._id}, {$inc: {votesGoingOut: -1}});
   }
   // If the player is playing and is not in the going out votes of the user, add him to said list
   else if (player.status === 'substitute' && _.indexOf(goingInVotes, playerId) === -1) {
      if (goingInVotes.length === 3) {
         var message = {status: 'error', text: 'Solo podes elegir 3 jugadores para poner!'};
         return message;
      }
      Meteor.users.update({_id: currentUserId}, {$addToSet: {'votes.goingIn': playerId}});
      Players.update({_id: playerId}, {$inc: {goingIn: 1}});
      Stats.update({_id: stats._id}, {$inc: {votesGoingIn: 1}});
   }
   // If the player is playing and is not in the going out votes of the user, add him to said list
   else if (player.status === 'substitute' && _.indexOf(goingInVotes, playerId) !== -1) {
      if (goingInVotes.length === 0) {
         console.log('ya tenes cero');
         return;
      }
      Meteor.users.update({_id: currentUserId}, {$pull: {'votes.goingIn': playerId}});
      Players.update({_id: playerId}, {$inc: {goingIn: -1}});
      Stats.update({_id: stats._id}, {$inc: {votesGoingIn: -1}});
   }


}});*/


/*
Meteor.methods({'addRemoveVote': function(playerId) {

      // Check
      check(playerId, String);

   	// Check match author, and user log in
      var currentUserId = Meteor.userId();
      var currentUser = Meteor.users.findOne(currentUserId);
      if (!currentUser) {
         throw new Meteor.Error('Add/Remove Vote: the user is not logged in');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
   	}

      // Fetch player info
      var player = Players.findOne(playerId);
      if (!player) {
         throw new Meteor.Error('Add/Remove Vote: the given player does not exist');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
      }

      var goingInVotes = [];
      var goingOutVotes = [];

      if (!_.isUndefined(currentUser.votes)) {
         goingInVotes = currentUser.votes.goingIn;
         goingOutVotes = currentUser.votes.goingOut;
         //console.log('goingInVotes: ' + goingInVotes);
         //console.log('goingOutVotes: ' + goingOutVotes);
      } //else {
         //Meteor.users.update({_id: currentUserId}, {$set: {'votes.goingIn': [], 'votes.goingOut': []}});
      //}

      var stats = Stats.findOne();
      if (!stats) {
         throw new Meteor.Error('Add/Remove Vote: no stats available');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
      }

      // If the player is playing and is not in the going out votes of the user, add him to said list
      if (player.status === 'playing' && _.indexOf(goingOutVotes, playerId) === -1) {
         if (goingOutVotes.length === 3) {
            var message = {status: 'error', text: 'Solo podes elegir 3 jugadores para sacar!'};
            return message;
         }
         Meteor.users.update({_id: currentUserId}, {$addToSet: {'votes.goingOut': playerId}});
         Players.update({_id: playerId}, {$inc: {goingOut: 1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingOut: 1}});
      }
      // If the player is playing and is already in the going out votes of the user, remove him from that list
      else if (player.status === 'playing' && _.indexOf(goingOutVotes, playerId) !== -1) {
         if (goingOutVotes.length === 0) {
            console.log('ya tenes cero');
            return;
         }
         Meteor.users.update({_id: currentUserId}, {$pull: {'votes.goingOut': playerId}});
         Players.update({_id: playerId}, {$inc: {goingOut: -1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingOut: -1}});
      }
      // If the player is playing and is not in the going out votes of the user, add him to said list
      else if (player.status === 'substitute' && _.indexOf(goingInVotes, playerId) === -1) {
         if (goingInVotes.length === 3) {
            var message = {status: 'error', text: 'Solo podes elegir 3 jugadores para poner!'};
            return message;
         }
         Meteor.users.update({_id: currentUserId}, {$addToSet: {'votes.goingIn': playerId}});
         Players.update({_id: playerId}, {$inc: {goingIn: 1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingIn: 1}});
      }
      // If the player is playing and is not in the going out votes of the user, add him to said list
      else if (player.status === 'substitute' && _.indexOf(goingInVotes, playerId) !== -1) {
         if (goingInVotes.length === 0) {
            console.log('ya tenes cero');
            return;
         }
         Meteor.users.update({_id: currentUserId}, {$pull: {'votes.goingIn': playerId}});
         Players.update({_id: playerId}, {$inc: {goingIn: -1}});
         Stats.update({_id: stats._id}, {$inc: {votesGoingIn: -1}});
      }
      else {
         throw new Meteor.Error('Add/Remove Vote: player status is different from playing or substitute');
   		var message = {status: 'error', text: 'Se produjo un error. Bomba de humo ninja!'};
         return message;
      }

      //var message = {status: 'success', text: 'METHODS_Match_created_successfully', response: matchId};
      //return message;
   }

});
*/
