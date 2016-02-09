//======================================================================
// PRE-POPULATE DATABASE:
//======================================================================
Meteor.startup(function() {

   // Pre-populate Players collection
   if (!!Players && Players instanceof Mongo.Collection && Players.find().count() === 0) {

      console.log('PRE-POPULATE PLAYERS COLLECTION');

      var players = [
         {name: 'ROMERO', avatar: 'romero.jpg', status: 'playing'},
         {name: 'GUZMAN', avatar: 'guzman.jpg', status: 'substitute'},
         {name: 'ANDUJAR', avatar: 'andujar.jpg', status: 'substitute'},
         {name: 'RONCAGLIA', avatar: 'roncaglia.jpg', status: 'substitute'},
         {name: 'GARAY', avatar: 'garay.jpg', status: 'playing'},
         {name: 'OTAMENDI', avatar: 'otamendi.jpg', status: 'playing'},
         {name: 'ROJO', avatar: 'rojo.jpg', status: 'playing'},
         {name: 'ZABALETA', avatar: 'zabaleta.jpg', status: 'playing'},
         {name: 'DEMICHELIS', avatar: 'demichelis.jpg', status: 'substitute'},
         {name: 'CASCO', avatar: 'casco.jpg', status: 'substitute'},
         {name: 'BANEGA', avatar: 'banega.jpg', status: 'substitute'},
         {name: 'MASCHERANO', avatar: 'mascherano.jpg', status: 'playing'},
         {name: 'BIGLIA', avatar: 'biglia.jpg', status: 'playing'},
         {name: 'GAGO', avatar: 'gago.jpg', status: 'substitute'},
         {name: 'PASTORE', avatar: 'pastore.jpg', status: 'playing'},
         {name: 'PEREYRA', avatar: 'pereyra.jpg', status: 'substitute'},
         {name: 'LAMELA', avatar: 'lamela.jpg', status: 'substitute'},
         {name: 'DI MARIA', avatar: 'di_maria.jpg', status: 'playing'},
         {name: 'LAVEZZI', avatar: 'lavezzi.jpg', status: 'substitute'},
         {name: 'MESSI', avatar: 'messi.jpg', status: 'playing'},
         {name: 'TEVEZ', avatar: 'tevez.jpg', status: 'substitute'},
         {name: 'AGÜERO', avatar: 'aguero.jpg', status: 'playing'},
         {name: 'HIGUAIN', avatar: 'higuain.jpg', status: 'substitute'}
      ];

      _.each(players, function(player) {
         Players.insert(player);
      });
   }

   // TODO: replace Stats and Score collections with Counter collection
   // Pre-populate Stats collection
   if (!!Stats && Stats instanceof Mongo.Collection && Stats.find().count() === 0) {
      console.log('PRE-POPULATE STATS COLLECTION');
      Stats.insert({totalVotes: 0});
   }

   // Pre-populate Score collection
   if (!!Score && Score instanceof Mongo.Collection && Score.find().count() === 0) {
      console.log('PRE-POPULATE SCORE COLLECTION');
      Score.insert({argentina: 0, rival: 0});
   }

});
