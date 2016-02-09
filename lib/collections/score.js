//======================================================================
// POST SCHEMA:
//======================================================================
Score = new Mongo.Collection("score");

Score.attachSchema(new SimpleSchema({

   argentina: {
      type: Number,
      min: 0
   },

   rival: {
      type: Number,
      min: 0
   }

}));

//Score.attachSchema(Schema.Sc);
