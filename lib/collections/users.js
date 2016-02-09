//======================================================================
// COLLECTION:
//======================================================================
//Meteor.users = new Mongo.Collection("users");

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
Meteor.users.deny({
   insert: function() {return true},
   update: function() {return true},
   remove: function() {return true}
});

//======================================================================
// SCHEMA:
//======================================================================
Meteor.users.attachSchema(new SimpleSchema({

   profile: {
      type: Object
   },

   'profile.guest': {
      type: Boolean
   },

   username: {
      type: String,
      max: 50
   },

   // TODO: add max length
   votes: {
      type: [Object],
      autoValue: function() {
         if (this.isInsert) {
            return [];
         }
      }
   },

   'votes.$.goingOut': {
      type: String,
      label: 'Id of the user going out'
   },

   'votes.$.goingIn': {
      type: String,
      label: 'Id of the user going in'
   },

   'votes.$.date': {
      type: Date,
      label: 'Time in which the change has been made'
   },

   createdAt: {
      type: Date
   },

   emails: {
      type: [Object],
      // this must be optional if you also use other login services like facebook,
      // but if you use only accounts-password, then it can be required
      optional: true
   },

   'emails.$.address': {
      type: String,
      regEx: SimpleSchema.RegEx.Email
   },

   'emails.$.verified': {
      type: Boolean
   },

   services: {
      type: Object,
      blackbox: true,
      optional: true
   }

}));
