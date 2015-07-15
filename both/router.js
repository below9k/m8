'use strict';

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function() {
    this.render('m8Header', {
        to: 'header'
    });
    this.render('m8Landing');
}, {
    name: 'landing'
});

Router.route('/ssdp', function() {
    this.render('m8Header', {
        to: 'header'
    });
    this.render('ssdp');
}, {
    name: 'ssdp'
});

Router.route('/c4parse', function() {
    this.render('m8Header', {
        to: 'header'
    });
    this.render('c4parse');
});