# gulp-starter

Gulp easy starter for frontend workflow

# install

Install all dependencies and gulp globally

```
npm install && npm install -g gulp
```

# Prepare directories and paths

Open gulpfile.js and edit lines from 14 to 21

```javascript
dirStatic = './static', // all static files
dirSrc = dirSatic + './src/', // your source directory
dirDist = dirStatic, // compiled static directory

jsVendorsToCompile = ['js/vendor/*.js'], // 3rd party scripts
jsToCompile = ['**/*.js'], // your scripts

scssVendorsToCompile = ['scss/vendor/*.css'], // 3rd party styles
scssToCompile = ['scss/*.scss']; // your styles
```


# watch with browser sync

```javascript
gulp watch // only watch
gulp watch:sync // with browsersync on localhost:3000
gulp watch:sync --host myhost.local:8000 // with your specific host
```

# Other commands

Compile JS

```javascript
gulp compile:js
```

Compile SCSS

```javascript
gulp compile:scss
```

Watch JS without browser sync

```javascript
gulp watch:js
```

Watch SCSS without browser sync

```javascript
gulp watch:scss
```

Default (compile:js and compile:scss):

```javascript
gulp
```

# On production

Access gulp with npm scripts

```javascript
npm run gulp [task]
```
