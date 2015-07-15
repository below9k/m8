'use strict';

Package.describe({
    name: 'm8:reconnect',
    summary: 'Display disconnect notification + Allow manual reconnect',
    version: '1.0.0',
    git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.2.1');
    api.use('underscore');
    api.use('templating');
    api.use('peerlibrary:blaze-components');
    api.use('stylus');

    // Add files used on the client
    api.addFiles([
        'client/components/reconnect/reconnect.html',
        'client/components/reconnect/reconnect.js',
        'client/components/reconnect/reconnect.styl',
    ], 'client');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('m8:reconnect');
});
