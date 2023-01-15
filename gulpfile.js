import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import {deleteAsync} from 'del';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import terser from 'gulp-terser';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Html

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/script.js')
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
  }

// Images 

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,webp}')
  .pipe(gulp.dest('build/img'));
}

// Webp

const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp : {},
  }))
  .pipe(gulp.dest('build/img'));
}

//Svg

const svg = () => {
  return gulp.src('source/img/**/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

export const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({ 
    inlineSvg: true 
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}

//Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest'
    ], {
    base: 'source'
    })
    .pipe(gulp.dest('build'))
    done();
    }  

//Clean

const clean = () => {
  return  deleteAsync('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
  }

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  //gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

//Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  svg,
  gulp.parallel(
  styles,
  html,
  //scripts,
  sprite,
  createWebp
));

export default gulp.series(
  clean,
  copy,
  copyImages,
  svg,
  gulp.parallel(
  styles,
  html,
  //scripts,
  sprite,
  createWebp
  ),
  gulp.series(
  server,
  watcher
));
