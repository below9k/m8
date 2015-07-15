'use strict';

var templateName = 'c4parse',
    parseError = new ReactiveVar(),
    projectFile = new ReactiveVar(),
    parseStep = new ReactiveVar();

Template[templateName].events({
    'change #c4p': function(event) {
        var reader = new FileReader(),
            file = event.target.files[0];

        reader.onload = function(e) {
            try {
                var zip = new JSZip(e.target.result);

                $.each(zip.files, function(i, zipFile) {
                    if (zipFile.name.indexOf('project.xml') !== -1) {
                        var x2js = new X2JS();
                        projectFile.set(x2js.xml_str2json(zipFile.asText()));
                        parseStep.set(1);
                    }
                });

            } catch (e) {
                console.log(e);
            }
        };

        reader.onerror = function(err) {
            console.log('An error occured opening the file: ', err);
        };

        reader.readAsArrayBuffer(file);
    }
});

Template[templateName].helpers({
    getParseStep: function(step) {
        return parseStep.get() === step;
    },
    getProjectFile: function() {
        var p = projectFile.get(),
            step = parseStep.get();

        if (step === 1)
            console.log(p);
    },
    getProjectFileName: function() {
        var project = projectFile.get();
        console.log(project);
        return projectFile.name || false;
    },
    systemitemsParse: function() {
        var project = projectFile.get(),
            systemitems = project.currentstate.systemitems.item,
            rooms, sites, floors, projects, buildings, devices, settings,
            currentType = systemitems.type,
            parseType = function(type) {
                switch (type) {
                    case '1':
                        return 'Project';
                    case '2':
                        return 'Site';
                    case '3':
                        return 'Building';
                    case '4':
                        return 'Floor';
                    case '5':
                        return '5';
                    case '6':
                        return 'Device';
                    case '7':
                        return 'c4i';
                    case '8':
                        return 'Room';
                    case '9':
                        return 'System Settings';
                    default:
                        return undefined;
                }
            },
            nextItemsArray = function(item){
                if(Array.isArray(item)){
                    for(var i = 0; i < item.length; i++){
                        
                    }
                }else{
                    if(item.subitems && item.subitems.item && Array.isArray(item.subitems.item)){
                        return item.subitems.item;
                    }
                }
            };
        
        
    }
});