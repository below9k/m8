'use strict';

Package.describe({
    name: 'm8:user',
    summary: 'User Controls',
    version: '0.0.1',
    git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.2.1');
    api.use('underscore');
    api.use('templating');
    api.use('stylus');
    api.use('accounts-password');
    api.use('iron:router');
    api.use('reactive-var');
    api.use('peerlibrary:blaze-components');

    api.addFiles([
        'client/profile/profile.html',
        'client/profile/profile.js',
        'client/profile/profile.styl',

        'client/register/register.html',
        'client/register/register.js',
        'client/register/register.styl',

        'client/signin/signin.html',
        'client/signin/signin.js',
        'client/signin/signin.styl',
        
        'client/signout/signout.html',
        'client/signout/signout.js',
        'client/signout/signout.styl'
    ], 'client');

    api.addFiles([
        'server/register.js'
    ], 'server');

    api.addFiles([
        'both/router.js'
    ], ['client', 'server']);
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('m8:user');
});