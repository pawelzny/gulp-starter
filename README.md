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
dirSrc = './src/', // your source directory
dirDist = './public/dist/', // your distribution directory with compiled files
dirTemplate = './', // your template directory
pathLayoutMaster = dirTemplate + 'index.html', // path to your master layout file where assets are linked

jsToCompile = ['**/*.js'], // array of JS files which have to be compiled
scssToCompile = ['scss/*.scss']; // array of SCSS files which have to be compiled
```

# Build assets
with NPM
```
npm run build
```
or with Gulp
```
gulp
```
# watch with browser sync
with NPM
```
npm run watch
```
or with Gulp
```
gulp watch
```
# Other commands
Build JS and update timestamps
```
gulp build-js
```
Build CSS and update timestamp
```
gulp build-css
```
Update timestamps in master layout
```
gulp build-timestamp
```
Compile JS
```
gulp compile-js
```
Compile SCSS
```
gulp compile-scss
```
Watch JS without browser sync
```
gulp watch-js
```
Watch SCSS without browser sync
```
gulp watch-scss
```
