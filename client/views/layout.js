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
    return TaskCollection.find({state: "toDo"}).fetch();
  }
});

Template.inProgress.helpers({
  "tasks": function() {
    return TaskCollection.find({state: "inProgress"}).fetch();
  }
});

Template.done.helpers({
  "tasks": function() {
    return TaskCollection.find({state: "done"}).fetch();
  }
});

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

Template.dragList.onRendered(function(){

  dragula([document.querySelector('#toDo'), document.querySelector('#inProgress'), document.querySelector('#done'), document.querySelector('#trash')], { removeOnSpill: true,
    accepts: function(element, target, source) {
      return true;
    }

  }).on('drop', function (element, target, source) {
    if(target === document.querySelector('#trash')) {
      console.log(element);
      TaskCollection.remove({_id: element.id});
    } else if
      (target === document.querySelector('#toDo')) {
      TaskCollection.update({_id: element.id}, {$set: {state: "toDo"}});
    } else if
      (target === document.querySelector('#inProgress')) {
      TaskCollection.update({_id: element.id}, {$set: {state: "inProgress"}});
    } else if
      (target === document.querySelector('#done')) {
      TaskCollection.update({_id: element.id}, {$set: {state: "done"}});
    }
  });

});


