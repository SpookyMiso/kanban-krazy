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