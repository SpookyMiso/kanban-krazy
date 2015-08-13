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
    console.log(title);
    console.log(description);

    TaskCollection.insert({
      title: title,
      description: description
    });
  }
});