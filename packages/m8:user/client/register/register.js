'use strict';

var Register = BlazeComponent.extendComponent(

    function RegisterConstructor(options) {
        var me = this;

        me.fields = new ReactiveVar([{
            name: 'username',
            label: 'Username',
            placeholder: 'Username',
            type: 'text',
            maxLength: 32,
            minLength: 5,
            index: 0
        }, {
            name: 'password',
            label: 'Password',
            placeholder: 'Password',
            type: 'password',
            confirm: true,
            minLength: 5,
            index: 1
        }, {
            name: 'email',
            label: 'Email',
            placeholder: 'your@email.com',
            type: 'email',
            minLength: 5,
            index: 2
        }]);

    }, {
        events: function() {
            return [{
                'click #doRegister': this.onDoRegisterClicked,
                'change input': this.onInputChanged
            }];
        },
        /*
         *  Data Context Helpers
         */
        getFields: function() {
            var me = this,
                fields = me.fields.get();

            return fields;
        },
        /*
         *  Event Helpers
         */
        onInputChanged: function(event) {
            var me = this,
                fieldsList = me.fields.get(),
                input = me.currentData(),
                res;

            if (event.target.id.indexOf('_confirm') !== -1) {
                input.cvalue = event.target.value;
            } else {
                input.value = event.target.value;
            }

            Meteor.call('doFormCheck', input, function(err, res) {
                fieldsList[input.index] = res;
                me.fields.set(fieldsList);
            });
        },
        onDoRegisterClicked: function(event) {
            var me = this,
                fieldsList = me.fields.get(),
                checked = 0,
                account = {};



            for (var i in fieldsList) {

                if (fieldsList[i].name === 'username') account.username = fieldsList[i].value;
                if (fieldsList[i].name === 'password') account.password = fieldsList[i].value;
                if (fieldsList[i].name === 'email') account.email = fieldsList[i].value;

                Meteor.call('doFormCheck', fieldsList[i], function(err, res) {
                    if (!err)
                        fieldsList[i] = res;
                    else
                        throw new Meteor.Error('There was a problem handling the form check - ', err);

                    if (fieldsList.length >= checked) {
                        console.log(fieldsList[i].error);
                        if (!fieldsList[i].error){
                            checked++;
                            console.log('Checked:',checked);
                            if(checked === fieldsList.length){
                                console.log('Creating account');
                                Accounts.createUser(account, function(err) {
                                    if (err)
                                        throw new Meteor.Error('Error creating account', err);
                                    else
                                        console.log('Account created');
                                });
                                for(var r in fieldsList){
                                    fieldsList[r].value = '';
                                    me.fields.set(fieldsList);
                                }
                            }
                        }else
                            me.fields.set(fieldsList);
                    }
                });
            }
        }
    }
).register('Register');