# gulp-starter

Gulp starter for frontend workflow for any project.

## Installing:

First install gulp and yarn globally `npm install -g gulp yarn`
Then install all dev-dependencies for this gulpfile with command: `yarn`

## Adding new dependencies:

Instead of using npm package manager use previously installed `yarn`

Add new dependency:

```
yarn add --dev package_name
```

## Prepare directories and paths:

Open gulpfile.js and edit lines from 16 to 24:

```javascript
// Directories for static files
dirSrc = './src/',
dirStatic = dirSrc + 'static/',
dirDist = './public/wp-content/themes/custom/static/', // replace dist path

// Static files resources
jsVendorsToCompile = ['js/vendor/*.js'],
jsToCompile = ['js/*.js'],
cssVendorsToCompile = ['scss/vendor/*.css'],
scssToCompile = ['scss/styles.scss'];
```

## watch with browser sync:

```javascript
gulp watch // only watch
gulp watch:sync // with browsersync on localhost:3000
gulp watch:sync --host myhost.local:8000 // with your specific host
```

## Other commands:

* Compile JS: `gulp compile:js`
* Compile SCSS: `gulp compile:scss`
* Watch JS without browser sync: `gulp watch:js`
* Watch SCSS without browser sync: `gulp watch:scss`
* Upgrade static files build timestamp: `gulp timestamp`
* Default (compile:js and compile:scss): `gulp`

# On production

Access gulp with npm scripts: `npm run gulp [task_name]` or `npm run gulp` for default action.
