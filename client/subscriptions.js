Meteor.subscribe("tasks", function () {
  return TaskCollection.find({
    user_id: this.userId
  });
});