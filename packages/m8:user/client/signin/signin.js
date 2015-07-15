'use strict';

var Signin = BlazeComponent.extendComponent(

    function SigninConstructor(options) {
        var me = this;

        me.loginStatus = new ReactiveVar(false);

        me.fields = new ReactiveVar([{
            name: 'username',
            placeholder: 'Username',
            label: 'Username',
            type: 'text',
            index: 0
        }, {
            name: 'password',
            placeholder: 'Password',
            label: 'Password',
            type: 'password',
            index: 1
        }]);

    }, {
        events: function() {
            return [{
                'click #doLogin, keyup div': this.onDoLoginClicked,
                'change input': this.onInputChanged
            }];
        },
        /*
         * Data Context Helpers
         */
        getFields: function() {
            var me = this,
                fieldsList = me.fields.get();

            return fieldsList;
        },
        getLoginStatus: function() {
            var me = this,
                status = me.loginStatus.get();

            return status;
        },
        /*
         *  Template Helpers
         */
        goProfile: function() {
            Router.go('user.profile');
        },
        /*
         *  Event Helpers
         */
        onInputChanged: function(event) {
            var me = this,
                input = me.currentData(),
                fieldsList = me.fields.get();

            input.value = event.target.value;
            fieldsList[input.index] = input;

            me.fields.set(fieldsList);
        },
        onDoLoginClicked: function(event) {
            var me = this,
                fieldsList = me.fields.get(),
                username, password;

            if ((event.type === 'keyup' && event.which === 13) || event.type === 'click') {
                for (var i in fieldsList) {
                    if (fieldsList[i].name === 'username') username = fieldsList[i].value;
                    if (fieldsList[i].name === 'password') password = fieldsList[i].value;
                }

                Meteor.loginWithPassword(username, password, function(err) {
                    if (err) {
                        me.loginStatus.set(err);
                    }
                })
            }
        }
    }
).register('Signin');