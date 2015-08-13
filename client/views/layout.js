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

Template.layout.events({
   "keypress #login-password": function (evt,tmpl) {
    if(evt.keyCode === 13) {
      window.location.href="/dashboard";
    }
   },

   "click #login-buttons-password": function (evt, tmpl) {
    window.location.href="/dashboard";
   },

   'submit #inputForm': function (evt, tmpl) {
    evt.preventDefault();
      var title = tmpl.find('#title').value;
      var description = tmpl.find('#description').value;

      Meteor.call('submitPost', title, description);
   }

});

Template.toDo.tasks = function () {
  return TaskCollection.find();
};


