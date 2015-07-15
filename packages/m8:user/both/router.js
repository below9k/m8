'use strict';
/*
 *  User Control Routes
 *  user: {signin,register,signout,profile}
 *
 */

Router.route('/signin', function() {
    this.render('m8Header', {
        to: 'header'
    });
    if(!Meteor.user()){
        if (!BlazeComponent.getComponentForElement($('.wrapper').get(0))) {
            this.render(BlazeComponent.getComponent('Signin').renderComponent());
        }
    } else 
        Router.go('user.profile')
}, {
    name: 'user.signin'
});

Router.route('/register', function() {
    this.render('m8Header', {
        to: 'header'
    });
    
    if(!Meteor.user()){
        if (!BlazeComponent.getComponentForElement($('.wrapper').get(0))) {
            this.render(BlazeComponent.getComponent('Register').renderComponent());
        }
    }else{
        Router.go('user.profile');
    }
    
}, {
    name: 'user.register'
});

Router.route('/profile', function() {
    this.render('m8Header', {
        to: 'header'
    });
    
    if (Meteor.user()){
        if (!BlazeComponent.getComponentForElement($('.wrapper').get(0))) {
            this.render(BlazeComponent.getComponent('Profile').renderComponent());
        } 
    }else
        Router.go('user.signin');

}, {
    name: 'user.profile'
});

Router.route('/signout', function() {
    Meteor.logout(function() {
        Router.go('user.signin');
    });
    
    if (!BlazeComponent.getComponentForElement($('.wrapper').get(0))) {
        this.render(BlazeComponent.getComponent('Signout').renderComponent());
    }
}, {
    name: 'user.signout'
});