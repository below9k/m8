var templateName = 'm8HeaderDropDown';

Template[templateName].helpers({
    dropdown_title: function(){
        if(Meteor.userId()){
            return {
                text: 'User Profile'
            };
        }else{
            return {
                text: 'Sign Up/Log In'
            };
        }
    },
    dropdown_selection: function() {
        if (Meteor.userId()) {
            return [{
                name: 'Profile',
                icon: 'user',
                route: 'user.profile'
            }, {
                name: 'Sign Out',
                icon: 'sign out',
                route:'user.signout'
            }];
        } else {
            return [{
                name: 'Sign In',
                icon: 'sign in',
                route: 'user.signin'
            }, {
                name: 'Register',
                icon: 'add user',
                route: 'user.register'
            }];
        }
    }
});

Template[templateName].rendered = function() {
    $('.ui.dropdown').dropdown();
};