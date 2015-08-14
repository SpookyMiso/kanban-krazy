Template.layout.created = function (){
  console.log('created');
};

Template.layout.rendered = function (){
  console.log('rendered');
};

Template.layout.destroyed = function (){
  console.log('destroyed');
};

Template.layout.helpers({
  'tasks': function(){
    return TaskCollection.find().fetch();
  }
});

Template.dashboard.events({
  'click #logOut': function (evt, tmpl) {
  Meteor.logout();
  Router.go('/');
  }
});

Template.layout.events({
   'submit #inputForm': function (evt, tmpl) {
    evt.preventDefault();
      var title = tmpl.find('#title').value;
      var description = tmpl.find('#description').value;

      Meteor.call('submitPost', title, description);
   }
});

Template.toDo.helpers({
  "tasks": function() {
    return TaskCollection.find().fetch();
  }
});

Template.toDo.tasks = function () {
  return TaskCollection.find().fetch();
};

Template.toDo.events({
  'click .post_it': function ( evt, tmpl ) {
    console.log("hello");
      if(evt.removeOnSpill === true) {
        TaskCollection.remove(this.id);
      }
   },

   'submit #inputForm': function (evt, tmpl) {
    evt.preventDefault();
      var title = tmpl.find('#title').value;
      var description = tmpl.find('#description').value;

      Meteor.call('submitPost', title, description);
   }
 });

