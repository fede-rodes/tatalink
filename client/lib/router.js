/* HOME */
FlowRouter.route('/', {
   name: 'home',
   action() {
      BlazeLayout.render('appBody', {template: 'home'});
   }
});
/* HOW IT WORKS */
FlowRouter.route('/how-it-works', {
   name: 'how-it-works',
   action() {
      BlazeLayout.render('appBody', {template: 'howItWorks'});
   }
});
/* VOTES */
FlowRouter.route('/votes', {
   name: 'votes',
   action() {
      BlazeLayout.render('appBody', {template: 'votes'});
   }
});
/* HASHTAGS */
/*FlowRouter.route('/hashtags', {
   name: 'hashtags',
   action() {
      BlazeLayout.render('appBody', {template: 'hashtags'});
   }
});*/
/* COMMENTS */
FlowRouter.route('/comments', {
   name: 'comments',
   action() {
      BlazeLayout.render('appBody', {template: 'comments'});
   }
});
