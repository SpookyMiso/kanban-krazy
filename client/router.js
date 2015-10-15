Router.configure({
  layoutTemplate: "layout"
});

Router.route('/', {
  name: 'login',
  onBeforeAction: function(){
    if(Meteor.user()) {
      this.redirect('/dashboard');
    } else {
      // take to dashboard
      this.next();
    }
  }
});

Router.route('/dashboard', function () {
  // render the PageOne template
  this.render('dashboard');
});

Router.route('/profile/edit', function () {
  this.render('profile');
});

Router.onBeforeAction(function () {
  //if there is no user logged in and if no one is in the process of logging in
  if(!Meteor.user() && !Meteor.loggingIn()) {
    //take to login
    this.render('login');
  } else {
    // take to dashboard
    this.next();
  }
}, {
  //using template name :D
  except: ['login']
});