'use strict';

var Reconnect = BlazeComponent.extendComponent(

    function ReconnectConstructor(args) {
        var me = this;


        me.countDown = new ReactiveVar();

        me.setCountDown = function() {
            me.countDown.set(Math.round((Meteor.status().retryTime - (new Date()).getTime()) / 1000));
        }

    }, {
        events: function() {
            return [{
                'click .reconnect': this.onReconnectClicked
            }];
        },
        /*
         *  Data Context Helpers
         */
        getStatus: function() {
            var status = Meteor.status().status;

            return status.charAt(0).toUpperCase() + status.slice(1);
        },
        getRetryTime: function() {
            // Math.round((Meteor.status().retryTime - (new Date()).getTime())/1000)
            var me = this,
                countDown = me.countDown.get();

            Meteor.setTimeout(function() {
                me.setCountDown();
            }, 1010);

            return isNaN(countDown) ? '0' : countDown;
        },
        getRetryCount: function() {
            var me = this,
                retryCount = Meteor.status().retryCount;

            switch (retryCount) {
                case 1:
                    return '1st';
                case 2:
                    return '2nd';
                case 3:
                    return '3rd';
                default:
                    return retryCount + 'th';
            }
        },
        getReason: function() {
            var me = this,
                reason = Meteor.status().reason;

            return reason;
        },
        /*
         *  Event Helpers
         */
        onReconnectClicked: function(event) {
            var me = this;

            Meteor.reconnect();

            console.log('Attempting to reconnect...');
        },
        /*
         *  Template Helpers
         */
        isServerDisconnected: function() {
            var me = this,
                status = Meteor.status();

            if (!status.connected) {
                if (status.status === 'connecting' && status.retryCount === 0)
                    return false;
                if (status.retryCount > 0)
                    return true;
                if (status.status === 'waiting')
                    return true;
            }

            return false;
        },
        isServerWaiting: function() {
            var me = this,
                status = Meteor.status();

            return status.status === 'waiting';
        },
        isServerFailed: function() {
            var me = this,
                status = Meteor.status();

            return status.status === 'failed';
        },
        isServerConnecting: function() {
            var me = this,
                status = Meteor.status();

            return status.status === 'connectiong';
        }
    }
).register('Reconnect');