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