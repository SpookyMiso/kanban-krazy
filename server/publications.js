Meteor.publish("tasks", function(){
  return TaskCollection.find({userId: this.userId});
});