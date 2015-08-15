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

Template.profile.events({
  'submit #passwordForm': function (evt, tmpl) {
    evt.preventDefault();
      var oldPassword = event.target.currentPassword.value;
      var newPassword = event.target.newPassword.value;
      var confirmPass = event.target.confirmPass.value;

    Session.set("Error", null);

    console.log(Meteor.user().password);
    // if(oldPassword !== Meteor.user().password

    if(newPassword === confirmPass) {
      Accounts.changePassword(oldPassword, newPassword, function (error) {
        if(error) {

          if(error.reason === "Incorrect password") {
            Session.set("Error", "Your current password is incorrect.");
          } else {
            Session.set("Error", error.reason);
          }

        } else {
          Session.set("Error", "Password was successfully changed!");
        }
      });

    } else {
      Session.set("Error", "New password and password confirmation do not match");
    }
  }
});

Template.profile.helpers({
  errorPassword: function () {
    return Session.get("Error");
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
  // 'click .post_it': function ( evt, tmpl ) {
  //   console.log("hello");
  //     if(evt.removeOnSpill === true) {
  //       TaskCollection.remove(this.id);
  //     }
  //  },

   'submit #inputForm': function (evt, tmpl) {
    evt.preventDefault();
      var title = tmpl.find('#title').value;
      var description = tmpl.find('#description').value;

      Meteor.call('submitPost', title, description);
   }
 });

Template.dragList.onRendered(function(){

  dragula([document.querySelector('#toDo'), document.querySelector('#inProgress'), document.querySelector('#done'), document.querySelector('#trash_can')], { //removeOnSpill: true,
    accepts: function(element, target, source) {
      return true;
    }

  }).on('drop', function (element, target, source) {
    if(target === document.querySelector('#trash_can')) {
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


