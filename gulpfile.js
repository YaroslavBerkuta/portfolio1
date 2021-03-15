const app = 'app/',
      dist = 'dist/';

const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      pug = require('gulp-pug'),
      sass = require('gulp-sass');

const config  = {
  app : {
    html : app + 'pug/index.pug',
    style : app + 'scss/style.scss',
    js : app + 'js/**/*.*',
    fonts : app + 'fonts/**/*.*',
    img : app + 'img/**/*.*'
  },
  dist : {
    html : dist,
    style : dist + 'css/',
    js : dist + 'js/',
    fonts : dist + 'fonts/',
    img : dist + 'img/'
  },
  watch : {
    html : app + 'pug/**/*.pug',
    style : app + 'scss/**/*.scss',
    js : app + 'js/**/*.*',
    fonts : app + 'fonts/**/*.*',
    img : app + 'img/**/*.*'
  }
}

const webServer = () => {
  browserSync.init({
    server: {
      baseDir: dist
    },
    port: 9000,
    host: 'localhost',
    notify: false
  })
}

const pugTask = () => {
  return gulp.src(config.app.html)
      .pipe(pug())
      .pipe(pug({
        pretty: false
      }))
      .pipe(gulp.dest(config.dist.html))
      .pipe(browserSync.reload({stream: true}))
}

const scssTask = () => {
  return gulp.src(config.app.style)
      .pipe(sass().on('error',sass.logError))
      .pipe(gulp.dest(config.dist.style))
      .pipe(browserSync.reload({stream: true}))
}

const jsTask = () => {
  return gulp.src(config.app.js)
      .pipe(gulp.dest(config.dist.js))
      .pipe(browserSync.reload({stream: true}))
}

const imgTask = () => {
  return gulp.src(config.app.img)
      .pipe(gulp.dest(config.dist.img))
      .pipe(browserSync.reload({stream: true}))
}

const fontsTask = () => {
  return gulp.src(config.app.fonts)
      .pipe(gulp.dest(config.dist.fonts))
      .pipe(browserSync.reload({stream: true}))
}



const watchFile = () => {
  gulp.watch([config.watch.html], gulp.series(pugTask));
  gulp.watch([config.watch.style], gulp.series(scssTask));
  gulp.watch([config.watch.js], gulp.series(jsTask));
  gulp.watch([config.watch.img], gulp.series(imgTask));
  gulp.watch([config.watch.fonts], gulp.series(fontsTask));
}

const start = gulp.series(pugTask, scssTask, jsTask, imgTask, fontsTask);

exports.default = gulp.parallel(start,webServer,watchFile);