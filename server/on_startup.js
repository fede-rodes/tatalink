//======================================================================
// PRE-POPULATE PLAYERS LIST:
//======================================================================
Meteor.startup(function() {

   if (Players.find().count() !== 0) {
      return;
   }

   console.log('PRE-POPULATE PLAYERS. Players.find().count(): ' + Players.find().count());
   var players = [
      {name: 'ROMERO', avatar: 'romero.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'GUZMAN', avatar: 'guzman.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'ANDUJAR', avatar: 'andujar.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'RONCAGLIA', avatar: 'roncaglia.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'GARAY', avatar: 'garay.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'OTAMENDI', avatar: 'otamendi.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'ROJO', avatar: 'rojo.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'ZABALETA', avatar: 'zabaleta.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'DEMICHELIS', avatar: 'demichelis.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'CASCO', avatar: 'casco.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'BANEGA', avatar: 'banega.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'MASCHERANO', avatar: 'mascherano.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'BIGLIA', avatar: 'biglia.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'GAGO', avatar: 'gago.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'PASTORE', avatar: 'pastore.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'PEREYRA', avatar: 'pereyra.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'LAMELA', avatar: 'lamela.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'DI MARIA', avatar: 'di_maria.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'LAVEZZI', avatar: 'lavezzi.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'MESSI', avatar: 'messi.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'TEVEZ', avatar: 'tevez.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0},
      {name: 'AGÜERO', avatar: 'aguero.jpg', goingOut: 0, goingIn: 0, status: 'playing', forMVP: true, votesMVP: 0},
      {name: 'HIGUAIN', avatar: 'higuain.jpg', goingOut: 0, goingIn: 0, status: 'substitute', forMVP: false, votesMVP: 0}
   ];

   _.each(players, function(player) {
      Players.insert(player);
   });

});

Meteor.startup(function() {

   console.log('!!Stats: ', !!Stats);
   if (Stats.find().count() !== 0) {
      return;
   }

   console.log('PRE-POPULATE STATS');
   var stats = {totalVotes: 0};

   Stats.insert(stats);
   console.log('Stats.find().count(): ', Stats.find().count());

});


Meteor.startup(function() {

   if (Score.find().count() !== 0) {
      return;
   }

   console.log('PRE-POPULATE SCORE');
   var score = {argentina: 0, rival: 0};

   Score.insert(score);

});


/*Meteor.startup(function() {

   if (Messages.find().count() !== 0) {
      return;
   }

   console.log('PRE-POPULATE MESSAGES');
   var message = {text: 'Arranc&oacute; el TataLink! Vamos Argentina!!!'};

   Messages.insert(message);

});*/


//======================================================================
// PRE-POPULATE USER VOTES:
//======================================================================
/*Meteor.startup(function() {

   var currentUserId = Meteor.userId;
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
      Meteor.users.update({_id: currentUserId}, {$addToSet: {votes: {'goingIn': [], 'goingOut': []}}});
   }

});*/
