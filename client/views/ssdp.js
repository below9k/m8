var templateName = 'ssdp';

Template[templateName].helpers({
    'isCordova': function(){
        return Meteor.isCordova || false;
    }
});