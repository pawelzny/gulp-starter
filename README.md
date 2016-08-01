# gulp-starter
Gulp easy starter for frontend workflow

# install
Install all dependencies and gulp globally
```
npm install && npm install -g gulp
```

# Prepare directories and paths
Open gulpfile.js and edit lines from 15 to 21
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
```
gulp watch // only watch
gulp watch:sync // with browsersync on localhost:3000
gulp watch:sync --host myhost.local:8000 // with your specific host
```
# Other commands
Compile JS
```gulp compile:js```

Compile SCSS
```gulp compile:scss```

Watch JS without browser sync
```gulp watch:js```

Watch SCSS without browser sync
```gulp watch:scss```

Default (compile:js and compile:scss):
```gulp```
