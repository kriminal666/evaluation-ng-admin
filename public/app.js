/*global angular*/
(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);

    app.config(function (NgAdminConfigurationProvider) {
        var nga = NgAdminConfigurationProvider;
        // set the main API endpoint for this admin
        var app = nga.application('My backend')
            .baseApiUrl('http://evaluation.dev/api/');

        var evaluation = nga.entity('evaluations').identifier(nga.field('evaluation_id'));
        app.addEntity(evaluation);

        // set the list of fields to map in each post view
        evaluation.dashboardView().fields(/* see example below */);

        evaluation.dashboardView() // customize the dashboard panel for this entity
            .title('Recent evaluations')
            .order(1) // display the post panel first in the dashboard
            .perPage(20) // limit the panel to the 20 latest posts
            .fields([nga.field('evaluation_id').isDetailLink(true)]);

        evaluation.listView()
            .title('All evaluation') // default title is "[Entity_name] list"
            .description('List of evaluation with infinite pagination') // description appears under the title
            .infinitePagination(true) // load pages as the user scrolls
            .fields([
                nga.field('evaluation_id').label('Id'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('evaluation_academic_period_id'), // the default list field type is "string", and displays as a string
                nga.field('evaluation_student_id'), // the default list field type is "string", and displays as a string
                nga.field('evaluation_study_subModule_id'),
                nga.field('evaluation_mark_id'),
                nga.field('evaluation_created_at'),
                nga.field('evaluation_creationUserId'),
                nga.field('evaluation_updated_at'),
                nga.field('evaluation_lastUpdateUserId'),
                nga.field('deleted_at'),
                
            ])
            .listActions(['show', 'edit', 'delete']);
        evaluation.creationView().fields(
            [
                nga.field('evaluation_Id') // the default edit field type is "string", and displays as a text input
                    .attributes({ placeholder: 'the post title' }) // you can add custom attributes, too
                    .validation({ required: true, minlength: 3, maxlength: 100 }), // add validation rules for fields
                nga.field('evaluation_mark_id'), // the default list field type is "string", and displays as a string
                nga.field('evaluation_academic_period_id'), // the default list field type is "string", and displays as a string
                nga.field('evaluation_study_subModule_id'),
                nga.field('evaluation_student_id'),
                nga.field('evaluation_lastUpdateUserId'),
            ]
        );

        evaluation.editionView()
            .title('Edit evaluation "{{ entry.values.evaluation_id }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the top action bar. Show is disabled by default
            .fields([
                evaluation.creationView().fields(), // fields() without arguments returns the list of fields. That way you can reuse fields from another view to avoid repetition
            ]);

        evaluation.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .fields([
                nga.field('evaluation_id'),
                evaluation.editionView().fields(), // reuse fields from another view in another order
            ]);


        nga.configure(app);
    });

}());
