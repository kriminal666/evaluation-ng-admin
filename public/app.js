/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.config(function (NgAdminConfigurationProvider) {
        var nga = NgAdminConfigurationProvider;
        // set the main API endpoint for this admin
        var app = nga.application('My backend')
            .baseApiUrl('http://evaluation.dev/api/');

        var evaluation = nga.entity('evaluations').identifier(nga.field('evaluationId'));
        app.addEntity(evaluation);

        // set the list of fields to map in each post view
        evaluation.dashboardView().fields(/* see example below */);

        evaluation.dashboardView() // customize the dashboard panel for this entity
            .title('Recent evaluations')
            .order(1) // display the post panel first in the dashboard
            .perPage(20) // limit the panel to the 20 latest posts
            .fields([nga.field('evaluationId').isDetailLink(true)]);

        evaluation.listView()
            .title('All evaluation') // default title is "[Entity_name] list"
            .description('List of evaluation with infinite pagination') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('evaluationId').label('Id'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('academicPeriodId', 'number'), // the default list field type is "string", and displays as a string
                nga.field('studentId', 'number'), // the default list field type is "string", and displays as a string
                nga.field('subModuleId', 'number'),
                nga.field('markId', 'number'),
                nga.field('creationDate'),
                nga.field('creationUserId', 'number'),
                nga.field('updateDate'),
                nga.field('lastUpdateUserId', 'number'),
                nga.field('deleted_at'),
                
            ])
            .listActions(['show', 'edit', 'delete']);
        evaluation.creationView().fields(
            [
                nga.field('markId', 'number'), // the default list field type is "string", and displays as a string
                nga.field('academicPeriodId', 'number'), // the default list field type is "string", and displays as a string
                nga.field('subModuleId', 'number'),
                nga.field('studentId', 'number'),
                nga.field('lastUpdateUserId', 'number'),
            ]
        );

        evaluation.editionView()
            .title('Edit evaluation "{{ entry.values.evaluationId }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
            .fields([
                evaluation.creationView().fields(), // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
            ]);

        evaluation.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .fields([
                nga.field('evaluationId'),
                evaluation.editionView().fields(), // reuse fields from another view in another order
            ]);

             var gradeScale = nga.entity('gradescales').identifier(nga.field('gradeScaleId'));
        app.addEntity(gradeScale);

        // set the list of fields to map in each post view
        gradeScale.dashboardView().fields(/* see example below */);

        gradeScale.dashboardView() // customize the dashboard panel for this entity
            .title('Recent Grade Scales')
            .order(1) // display the post panel first in the dashboard
            .perPage(20) // limit the panel to the 20 latest posts
            .fields([nga.field('gradeScaleId').isDetailLink(true)]);

        gradeScale.listView()
            .title('All grade scales') // default title is "[Entity_name] list"
            .description('List of grade scale with infinite pagination') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('gradeScaleId').label('Id'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('description'), // the default list field type is "string", and displays as a string
                nga.field('creationDate'),
                nga.field('creationUserId', 'number'),
                nga.field('updateDate'),
                nga.field('lastUpdateUserId', 'number'),
                nga.field('deleted_at'),
                
            ])
            .listActions(['show', 'edit', 'delete']);
        gradeScale.creationView().fields(
            [
                nga.field('description'), // the default list field type is "string", and displays as a string
                nga.field('lastUpdateUserId', 'number'),
            ]
        );

        gradeScale.editionView()
            .title('Edit grade scale "{{ entry.values.gradeScaleId }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
            .fields([
                evaluation.creationView().fields(), // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
            ]);

        gradeScale.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .fields([
                nga.field('gradeScaleId'),
                evaluation.editionView().fields(), // reuse fields from another view in another order
            ]);


        nga.configure(app);
    });

}());
