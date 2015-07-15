'use strict';

Accounts.onCreateUser(function(options, user){
    
    if(!options.password || options.password.length === 0)
        throw new Meteor.Error('Password was not provided');
    if(options.username.length < 5 || options.username.length > 32)
        throw new Meteor.Error('Username did not meet the length requirement');
    
    return user;
});

Meteor.methods({
    doFormCheck: function(input) {
        var validateEmail = function(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        };

        if (input.name === 'username') {
            var getUsername = Meteor.users.findOne({
                username: input.value
            });
            if (getUsername) {
                input.error = 'Username in use already';
                return input;
            }
        }

        if (input.name === 'email') {
            var getEmail = Meteor.users.findOne({
                emails: {
                    $elemMatch: {
                        address: input.value
                    }
                }
            });

            if (getEmail) {
                input.error = 'Email in use already';
                return input;
            }
        }

        if (input.requried && input.value.length === 0) {
            input.error = 'Field is empty';
            return input;
        }

        if (input.minLength && input.value.length < input.minLength) {
            input.error = 'Minimum length not met (' + input.minLength + ')';
            return input;
        }

        if (input.maxLength && input.value.length > input.maxLength) {
            input.error = 'Maximum length exceeded (' + input.minLength + ')';
            return input;
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            input.error = 'Not a valid email';
            return input;
        }

        if (input.confirm && input.cvalue !== input.value) {
            input.error = 'Confirmation does not match';
            return input;
        }

        input.error = false;
        return input;
    }
});