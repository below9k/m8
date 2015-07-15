'use strict';

var Profile = BlazeComponent.extendComponent(

    function ProfileConstructor(options) {
        var me = this;

        me.profile = new ReactiveVar(Meteor.user().profile);

    }, {
        events: function() {
            return [{}];
        },
        /*
         *  Data Context Helpers
         */
        getProfile: function(){
            var me = this,
                profile = me.profile.get();
            console.log(profile);
            return profile;
        }
    }
).register('Profile');