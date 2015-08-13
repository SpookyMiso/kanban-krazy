Router.route('/', function () {
  // set the layout programmatically
  this.layout('layout');

  // render the PageOne template
  this.render('login');
});

Router.route('/dashboard', function () {
  // set the layout programmatically
  this.layout('layout');

  // render the PageOne template
  this.render('dashboard');
});

Router.route('/profile/edit', function () {

  this.layout('layout');

  this.render('profile');
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
    }

  });

});
