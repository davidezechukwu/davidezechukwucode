# Angularclient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 
npm install -g @angular/cli

Available Commands:
  add Adds support for an external library to your project.
  analytics Configures the gathering of Angular CLI usage metrics. See https://angular.io/cli/usage-analytics-gathering.
  build (b) Compiles an Angular app into an output directory named dist/ at the given output path. Must be executed from within a workspace directory.
  deploy Invokes the deploy builder for a specified project or for the default project in the workspace.
  config Retrieves or sets Angular configuration values in the angular.json file for the workspace.
  doc (d) Opens the official Angular documentation (angular.io) in a browser, and searches for a given keyword.
  e2e (e) Builds and serves an Angular app, then runs end-to-end tests.
  extract-i18n (i18n-extract, xi18n) Extracts i18n messages from source code.
  generate (g) Generates and/or modifies files based on a schematic.
  help Lists available commands and their short descriptions.
  lint (l) Runs linting tools on Angular app code in a given project folder.
  new (n) Creates a new workspace and an initial Angular application.
  run Runs an Architect target with an optional custom builder configuration defined in your project.
  serve (s) Builds and serves your app, rebuilding on file changes.
  test (t) Runs unit tests in a project.
  update Updates your application and its dependencies. See https://update.angular.io/
  version (v) Outputs Angular CLI version.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

If you have warnings like this, 
You can read up about it here https://sass-lang.com/documentation/breaking-changes/slash-div
and you can use this to remedy it 
$ npm install -g sass-migrator
$ sass-migrator division **/*.scss

EXEC(0,0): warning : Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
		Recommendation: math.div($padding-y, 2)
		More info and automated migrator: https://sass-lang.com/d/slash-div
		   ÔòÀ
		74 Ôöé $padding-y-sm: $padding-y / 2 !default;
		   Ôöé                ^^^^^^^^^^^^^^
		   ÔòÁ
		    node_modules\@progress\kendo-theme-bootstrap\scss\_variables.scss 74:16   @import
		    node_modules\@progress\kendo-theme-bootstrap\scss\core\_index.scss 3:9    @import
		    node_modules\@progress\kendo-theme-bootstrap\scss\button\_index.scss 1:9  @import
		    src\visuals\scss\all.scss 4:9                                           root stylesheet
EXEC(0,0): warning : Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
		Recommendation: math.div($border-radius, 2)
		More info and automated migrator: https://sass-lang.com/d/slash-div
		   ÔòÀ
		80 Ôöé $border-radius-sm: $border-radius / 2 !default;
		   Ôöé                    ^^^^^^^^^^^^^^^^^^
		   ÔòÁ
		    node_modules\@progress\kendo-theme-bootstrap\scss\_variables.scss 80:20   @import
		    node_modules\@progress\kendo-theme-bootstrap\scss\core\_index.scss 3:9    @import
		    node_modules\@progress\kendo-theme-bootstrap\scss\button\_index.scss 1:9  @import
		    src\visuals\scss\all.scss 4:9                                           root stylesheet
