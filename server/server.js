Meteor.startup(function(){
  if(TaskCollection.find().fetch().length === 0){
    TaskCollection.insert({
      title: "Science Homework",
      description: "Just do it",
      show: true,
      added: Date.now()
    });
  }
});

Meteor.methods({
  'submitPost': function (title, description) {
    console.log('submit post');
    console.log(Meteor.user().username);

    TaskCollection.insert({
      username: Meteor.user().username,
      title: title,
      description: description
    });
  }
});