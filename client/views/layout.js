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

});

