//============================================================================//
// VOTES FORM TEMPLATE
//============================================================================//
// CONTEXT: this = {}
Template.voteForm.events({

   'submit form': function (event, instance) {
      event.preventDefault();

      const playerGoingOut = instance.$('#goingOut').val();
      const playerGoingIn = instance.$('#goingIn').val();

      console.log('playerGoingOut: ', playerGoingOut);
      console.log('playerGoingIn: ', playerGoingIn);

      Meteor.call('vote', playerGoingOut, playerGoingIn, function(err) {
         if (err) {
            // TODO: handle error
            console.log(err);
         } //else {
            //processMessage(message);
         //}
      });
   }

});

//============================================================================//
// VOTES FORM SELECT TEMPLATE
//============================================================================//
// TODO: css line-through for selected players
Template.voteFormSelect.onCreated(function() {

   // Current template instance
   var instance = this;

   // Initialize reactive vars
   instance.totalVotes = new ReactiveVar(0);
   instance.players_goingOut = new ReactiveVar([]);
   instance.players_goingIn = new ReactiveVar([]);
   instance.userVotes = new ReactiveVar([]);

   // Set reactive vars
   instance.autorun(function() {
      const stats = Stats.findOne({});
      instance.totalVotes.set(stats.totalVotes);
   });

   // Set reactive vars
   instance.autorun(function() {
      const players = Players.find({}, {fileds: {"name": 1, "status": 1}}).fetch();
      instance.players_goingOut.set(_.filter(players, function(obj) {return obj.status === 'playing'}));
      instance.players_goingIn.set(_.filter(players, function(obj) {return obj.status === 'substitute'}));
   });

   // Set reactive vars
   instance.autorun(function() {
      if (Meteor.user()) {
         const curUser = Meteor.users.findOne({_id: Meteor.userId()});
         instance.userVotes.set(curUser.votes);
      }
   });
});
//----------------------------------------------------------------------------//
// CONTEXT: this = {situation="goingIn/goingOut"}
Template.voteFormSelect.helpers({

   label: function(situation) { // reactive source
      return situation === 'goingOut' ? 'Sacalo a:' : 'Ponelo a:';
   },

   players: function (situation) { // reactive source
      var players = Template.instance()['players_' + situation].get();
      var userVotes = Template.instance().userVotes.get(); // [{goingOut, goingIn, date}]
      var selected = _.pluck(userVotes, situation); // [playerIds]

      // Extend player object by adding css class 'selected' or ''
      _.each(players, function(player) {
         var disabled = _.indexOf(selected, player._id) !== -1 ? 'disabled' : '';
         _.extend(player, {disabled: disabled});
      });
      
      return players; // [{_id, name, status, css}]
   }

   /*
   players: function (situation) { // reactive source
      return Template.instance()['players_' + situation].get(); // [{_id, name, status}]
   }
   */
});

//============================================================================//
// REMAINING VOTES TEMPLATE
//============================================================================//
// CONTEXT: this = {}
// REQ SUBS: 'curUser'
Template.remainingVotes.helpers({

   remaining: function() { // reactive source
      const curUser = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {"votes": 1}}); // curUser subs is required
      return 3 - curUser.votes.length;
   },

   plural: function() { // reactive source
      const curUser = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {"votes": 1}}); // curUser subs is required
      return curUser.votes.length !== 2;
   }
});

//============================================================================//
// VOTES HISTORY TEMPLATE
//============================================================================//
// CONTEXT: this = {}
// REQ SUBS: 'curUser'
Template.votesHistory.helpers({

   votes: function() { // reactive source
      const curUser = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {"votes": 1}}); // curUser subs is required
      return curUser.votes;
   }
});

//============================================================================//
// VOTE CARD TEMPLATE
//============================================================================//
// CONTEXT: this = {}
// REQ SUBS: 'playersList'
Template.voteCard.helpers({

   getPlayerName: function(playerId) { // reactive source
      const players = Players.find({}, {fields: {"name": 1}}).fetch(); // playersList subs is required
      return _.find(players, function(player) {return player._id === playerId}).name;
   }
});


//============================================================================//
// PLAYERS TEMPLATE
//============================================================================//
/*
 * Function to draw the area chart
 */
function built3d(_situation, _title, _totalVotes, _data) {

   $('#chart-container-' + _situation).highcharts({
      chart: {
         type: 'column'
      },
      title: {
         text: _title + '...'
      },
      subtitle: {
         text: _totalVotes + ' votos'
      },
      xAxis: {
         type: 'category',
         labels: {
            rotation: -45,
            style: {
               fontSize: '9px',
               fontFamily: 'Verdana, sans-serif'
            }
         }
      },
      yAxis: {
         min: 0,
         title: {
            text: 'Porcentaje'
         }
      },
      legend: {
         enabled: false
      },
      tooltip: {
         pointFormat: _title + ': <b>{point.y:.1f} %</b>'
      },
      series: [{
         name: '%',
         data: _data,
         dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: -30, // 30 pixels up from the top
            style: {
               fontSize: '11px',
               fontFamily: 'Verdana, sans-serif'
            }
         }
      }]
   });
}
//----------------------------------------------------------------------------//
Template.chart.onCreated(function() {

   // Current template instance
   var instance = this;

   // Declare reactive vars
   instance.totalVotes = new ReactiveVar(0);
   instance.players_goingOut = new ReactiveVar([]);
   instance.players_goingIn = new ReactiveVar([]);

   // Set reactive vars
   instance.autorun(function() {
      const stats = Stats.findOne({});
      instance.totalVotes.set(stats.totalVotes);
   });

   // Set reactive vars
   instance.autorun(function() {
      const players = Players.find().fetch();
      instance.players_goingOut.set(_.filter(players, function(obj) {return obj.status === 'playing'}));
      instance.players_goingIn.set(_.filter(players, function(obj) {return obj.status === 'substitute'}));
   });

});
//----------------------------------------------------------------------------//
/*
 * Call the function to built the chart when the template is rendered
 */
Template.chart.onRendered(function() {

   var instance = this;
   const dataContext = Template.currentData();
   const situation = dataContext.situation;
   const title = situation === 'goingOut' ? 'Sacalo a' : 'Ponelo a';

   instance.autorun(function(){
      const totalVotes = instance.totalVotes.get();
      const players = instance['players_' + situation].get();
      //const players = instance['players_goingOut'].get();
      var data = [];

      // Set player-buttons data
      _.each(players, function(player) {
         data.push([
            player.name,
            parseInt((totalVotes === 0) ? 0 : (100 * (player.votes / totalVotes)).toPrecision(4), 10),
            //parseInt(player[situation]),
         ]);
      });

      // Sort player-buttons by decreasing order
      //_.sortBy(data, function(obj){return -obj.percentage;});
      console.log('title: ', title);
      console.log('totalVotes: ', totalVotes);
      console.log('data: ', data);

      built3d(situation, title, totalVotes, data);
   });
});
//----------------------------------------------------------------------------//
// CONTEXT: this = {situation="goingIn/goingOut"}
/*Template.chart.helpers({

   title: function(situation) { // reactive source
      return situation === 'goingOut' ? 'Sacalo' : 'Ponelo';
   },

   totalVotes: function(situation) { // reactive source
      return Template.instance()['totalVotes_' + situation].get();
   },

   players: function (situation) { // reactive source
      // Definitions
      const userVotes = Template.instance().userVotes.get();
      const totalVotes = Template.instance()['totalVotes_' + situation].get();
      const players = Template.instance()['players_' + situation].get();
		var playerButtons = [];

      // Set player-buttons data
      _.each(players, function(player) {
         playerButtons.push({
            _id: player._id,
            name: player.name,
            percentage: (totalVotes === 0) ? 0 : (100 * (player[situation] / totalVotes)).toPrecision(4),
            selected: _.indexOf(userVotes[situation], player._id) !== -1 ? 'selected' : '',
            situation: situation
         });
		});

      // Sort player-buttons by decreasing order
      return _.sortBy(playerButtons, function(obj){return -obj.percentage;});
   }
});*/


//============================================================================//
// BUTTON TEMPLATE
//============================================================================//
// CONTEXT: this = {playerId="String" playerName="String" percentage="Number" selected="Class" situation="goingIn/goingOut"
/*Template.button.helpers({

   isSelected: function () {
      return this.selected === 'selected';
   }

});
//----------------------------------------------------------------------------//
Template.button.events({

   'click button': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this.playerId, function(err) {
         if (err) {
            // TODO: handle error
            console.log(err);
         } //else {
            //processMessage(message);
         //}
      });
   }

});*/



/*
//============================================================================//
// PLAYERS TEMPLATE
//============================================================================//
Template.players.onCreated(function() {

   // Current template instance
   var instance = this;

   // Declare reactive vars
   instance.totalVotes_goingOut = new ReactiveVar(0);
   instance.totalVotes_goingIn = new ReactiveVar(0);
   instance.players_goingOut = new ReactiveVar([]);
   instance.players_goingIn = new ReactiveVar([]);
   instance.userVotes = new ReactiveVar({});

   // Set reactive vars
   instance.autorun(function() {
      const stats = Stats.findOne();
      instance.totalVotes_goingOut.set(stats.votesGoingOut);
      instance.totalVotes_goingIn.set(stats.votesGoingIn);
   });

   // Set reactive vars
   instance.autorun(function() {
      const players = Players.find().fetch();
      instance.players_goingOut.set(_.filter(players, function(obj) {return obj.status === 'playing'}));
      instance.players_goingIn.set(_.filter(players, function(obj) {return obj.status === 'substitute'}));
   });

   // Set reactive vars
   instance.autorun(function() {
      const curUser = Meteor.users.findOne(Meteor.userId());
      instance.userVotes.set(curUser.votes);
   });
});
//----------------------------------------------------------------------------//
// CONTEXT: this = {situation="goingIn/goingOut"}
Template.players.helpers({

   title: function(situation) { // reactive source
      return situation === 'goingOut' ? 'Sacalo' : 'Ponelo';
   },

   totalVotes: function(situation) { // reactive source
      return Template.instance()['totalVotes_' + situation].get();
   },

   players: function (situation) { // reactive source
      // Definitions
      const userVotes = Template.instance().userVotes.get();
      const totalVotes = Template.instance()['totalVotes_' + situation].get();
      const players = Template.instance()['players_' + situation].get();
		var playerButtons = [];

      // Set player-buttons data
      _.each(players, function(player) {
         playerButtons.push({
            _id: player._id,
            name: player.name,
            percentage: (totalVotes === 0) ? 0 : (100 * (player[situation] / totalVotes)).toPrecision(4),
            selected: _.indexOf(userVotes[situation], player._id) !== -1 ? 'selected' : '',
            situation: situation
         });
		});

      // Sort player-buttons by decreasing order
      return _.sortBy(playerButtons, function(obj){return -obj.percentage;});
   }
});

//============================================================================//
// BUTTON TEMPLATE
//============================================================================//
// CONTEXT: this = {playerId="String" playerName="String" percentage="Number" selected="Class" situation="goingIn/goingOut"
Template.button.helpers({

   isSelected: function () {
      return this.selected === 'selected';
   }

});
//----------------------------------------------------------------------------//
Template.button.events({

   'click button': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this.playerId, function(err) {
         if (err) {
            // TODO: handle error
            console.log(err);
         } //else {
            //processMessage(message);
         //}
      });
   }

});
*/






//var userSubsHandler = Meteor.subscribe('currentUser');
//var playersSubsHandler = Meteor.subscribe('playersList');
//var statsSubsHandler = Meteor.subscribe('stats');
//var scoreSubsHandler = Meteor.subscribe('score');
//var messagesSubsHandler = Meteor.subscribe('messages');
//var postsSubsHandler = Meteor.subscribe('postsList');
//==================================//
// STATS GOING IN TEMPLATE
//==================================//
/*Template.statsGoingIn.helpers({

   totalGoingInVotes: function() {
      var stats = Stats.findOne();
      if (!stats) {
         return;
      }

      var totalVotesGoingIn = stats.votesGoingIn;
      Session.set('goingInVotes', totalVotesGoingIn);
      return totalVotesGoingIn;
   },

   statsGoingIn: function () {
      if (playersSubsHandler.ready()) {
         var playersGoingIn = Players.find({status: 'substitute'});
         var totalVotesGoingIn = Session.get('goingInVotes');

         var goingInVotes = [];

         if (userSubsHandler.ready()) {
            console.log('in');
            var currentUserId = Meteor.userId();
            if (!currentUserId) {
               console.log('no user at buttons players going in helper');
               return;
            }

            var currentUser = Meteor.users.findOne(currentUserId);
            if (_.isUndefined(currentUser.votes)) {
               console.log('user votes not set');
               return;
            }

            var userVotes = currentUser.votes;
            var goingInVotes = userVotes.goingIn;
            console.log('votes going in:' + goingInVotes);
         }

   		var playersGoingInExt = [];
         var percentage = 0;
   		playersGoingIn.forEach(function(player) {
            percentage = (totalVotesGoingIn === 0) ? 0 : (100 * (player.goingIn / totalVotesGoingIn)).toPrecision(4);
            if (_.indexOf(goingInVotes, player._id) !== -1) {
               playersGoingInExt.push(_.extend(player, {percentage: percentage, selected: 'selected'}));
            } else {
               playersGoingInExt.push(_.extend(player, {percentage: percentage, selected: ''}));
            }
            //playersGoingInExt.push(_.extend(player, {percentage: percentage}));
   		});

         return _.sortBy(playersGoingInExt, function(obj){ return -obj.percentage; });
      } else {
         return [];
      }
   }

});
//----------------------------------//
// CONTEXT: this = {name, avatar, goingOut, goingIn, status, _id}
Template.statsGoingIn.events({

   'click button': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this._id, function(error, message) {
         if (error) {
            console.log(error);
         } else {
            processMessage(message);
         }
      });
   }

});*/

/*
Template.statsGoingOut.helpers({

   totalGoingOutVotes: function() {
      var stats = Stats.findOne();
      if (!stats) {
         return;
      }

      var totalVotesGoingOut = stats.votesGoingOut;
      Session.set('goingOutVotes', totalVotesGoingOut);
      return totalVotesGoingOut;
   },

   statsGoingOut: function () {
      var playersGoingOut = Players.find({status: 'playing'});
      var totalVotesGoingOut = Session.get('goingOutVotes');

      var goingOutVotes = [];
      if (userSubsHandler.ready()) {
         console.log('in');
         var currentUserId = Meteor.userId();
         if (!currentUserId) {
            console.log('no user at buttons players going in helper');
            return;
         }

         var currentUser = Meteor.users.findOne(currentUserId);
         if (_.isUndefined(currentUser.votes)) {
            console.log('user votes not set');
            return;
         }

         var userVotes = currentUser.votes;
         var goingOutVotes = userVotes.goingOut;
         console.log('votes going in:' + goingOutVotes);
      }

		var playersGoingOutExt = [];
      var percentage = 0;
		playersGoingOut.forEach(function(player) {
         percentage = (totalVotesGoingOut === 0) ? 0 : (100 * (player.goingOut / totalVotesGoingOut)).toPrecision(4);
         if (_.indexOf(goingOutVotes, player._id) !== -1) {
            playersGoingOutExt.push(_.extend(player, {percentage: percentage, selected: 'selected'}));
         } else {
            playersGoingOutExt.push(_.extend(player, {percentage: percentage, selected: ''}));
         }
			//playersGoingOutExt.push(_.extend(player, {percentage: percentage}));
		});

      return _.sortBy(playersGoingOutExt, function(obj){ return -obj.percentage; });
   }

});
//----------------------------------//
// CONTEXT: this = {name, avatar, goingOut, goingIn, status, _id}
Template.statsGoingOut.events({

   'click button': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this._id, function(error, message) {
         if (error) {
            console.log(error);
         } else {
            processMessage(message);
         }
      });
   }

});



//==================================//
// STATS GOING IN TEMPLATE
//==================================//
Template.statsGoingIn.helpers({

   totalGoingInVotes: function() {
      var stats = Stats.findOne();
      if (!stats) {
         return;
      }

      var totalVotesGoingIn = stats.votesGoingIn;
      Session.set('goingInVotes', totalVotesGoingIn);
      return totalVotesGoingIn;
   },

   statsGoingIn: function () {
      if (playersSubsHandler.ready()) {
         var playersGoingIn = Players.find({status: 'substitute'});
         var totalVotesGoingIn = Session.get('goingInVotes');

         var goingInVotes = [];

         if (userSubsHandler.ready()) {
            console.log('in');
            var currentUserId = Meteor.userId();
            if (!currentUserId) {
               console.log('no user at buttons players going in helper');
               return;
            }

            var currentUser = Meteor.users.findOne(currentUserId);
            if (_.isUndefined(currentUser.votes)) {
               console.log('user votes not set');
               return;
            }

            var userVotes = currentUser.votes;
            var goingInVotes = userVotes.goingIn;
            console.log('votes going in:' + goingInVotes);
         }

   		var playersGoingInExt = [];
         var percentage = 0;
   		playersGoingIn.forEach(function(player) {
            percentage = (totalVotesGoingIn === 0) ? 0 : (100 * (player.goingIn / totalVotesGoingIn)).toPrecision(4);
            if (_.indexOf(goingInVotes, player._id) !== -1) {
               playersGoingInExt.push(_.extend(player, {percentage: percentage, selected: 'selected'}));
            } else {
               playersGoingInExt.push(_.extend(player, {percentage: percentage, selected: ''}));
            }
            //playersGoingInExt.push(_.extend(player, {percentage: percentage}));
   		});

         return _.sortBy(playersGoingInExt, function(obj){ return -obj.percentage; });
      } else {
         return [];
      }
   }

});
//----------------------------------//
// CONTEXT: this = {name, avatar, goingOut, goingIn, status, _id}
Template.statsGoingIn.events({

   'click button': function (event) {
      event.preventDefault();

      Meteor.call('addRemoveVote', this._id, function(error, message) {
         if (error) {
            console.log(error);
         } else {
            processMessage(message);
         }
      });
   }

});
*/
