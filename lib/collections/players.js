//======================================================================
// COLLECTION:
//======================================================================
Players = new Mongo.Collection("players");

//======================================================================
// DENY RULE:
//======================================================================
/*
SOURCE: https://themeteorchef.com/recipes/building-a-user-admin/
To save face, we can “lock down” all of our rules when we define our collection
to prevent any client-side database operations from taking place. This means
that when we interact with the database, we’re required to do it from the server
(a trusted environment) via methods.
SOURCE: http://docs.meteor.com/#/full/deny
When a client tries to write to a collection, the Meteor server first checks the
collection's deny rules. If none of them return true then it checks the
collection's allow rules. Meteor allows the write only if no deny rules return
true and at least one allow rule returns true.
*/
Players.deny({
   insert: function() {return true},
   update: function() {return true},
   remove: function() {return true}
});

//======================================================================
// SCHEMA:
//======================================================================
Players.attachSchema(new SimpleSchema({

   name: {
      type: String,
      max: 50,
      denyUpdate: true
   },

   avatar: {
      type: String,
      denyUpdate: true
   },

   votes: {
      type: Number,
      label: "Number of votes to remove/add this player",
      min: 0,
      defaultValue: 0
   },

   status: {
      type: String,
      allowedValues: ['playing', 'substitute', 'out']
   }

}));
