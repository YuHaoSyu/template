import loadPlugins from 'gulp-load-plugins'
import g from 'gulp' //加載gulp-前綴相關套件 使用套件以 $ 引用
import autoprefixer from 'autoprefixer'
import bower from 'main-bower-files'
import server from 'browser-sync'
import minimist from 'minimist'
import del from 'del'
import imageminJpegRecompress from 'imagemin-jpeg-recompress'
import imageminPngquant from 'imagemin-pngquant'
let sync = server.create()
const $ = loadPlugins()

let b4Path = './bootstrap/js/'
let b4JS = '_bootstrap.js'
let options = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: 'develop' }
})
let bool = options.env === 'build' //判斷環境變數  true: gulp env --build  false: gulp
// 單一任務 gulp pug --env build

function eslintFixed(file) {
  return file.eslint != null && file.eslint.fixed
}

export const pug = cb => {
  g.src('./src/*.pug')
    .pipe($.plumber()) // gulp-plumber: 編輯錯誤避免中斷cmd執行
    .pipe($.pug({ pretty: !bool })) // gulp-pug: pretty壓縮html檔
    .pipe($.replace('../img/', './img/'))
    .pipe($.replace('.pug', '.html'))
    .pipe(
      $.if(
        !bool,
        $.replace(/"inline\((.*)\)"/, '$1'),
        $.base64Inline('../dist', { prefix: '', suffix: '' })
      )
    )
    // .pipe($.if(!bool, $.replace("g')", 'g')))
    .pipe(g.dest('./dist/'))
    .pipe(sync.stream()) //browserSync:更新檔案後重整preview
  cb()
}

export const imgInline = cb => {
  g.src('./dist/**/*.html')
    .pipe($.base64Inline('../dist', { prefix: '', suffix: '' }))
    .pipe(g.dest('./dist/'))
  cb()
}

export const sass = cb => {
  g.src('./src/sass/**/*.s+(a|c)ss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init()) //gulp-sourcemaps: 初始化
    // .pipe($.sass({outputStyle: 'nested', includePaths: ['./node_modules/bootstrap/scss']}))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.replace('../../img/', '../img/'))
    .pipe($.postcss([autoprefixer()])) //gulp-postcss+autoprefixer設定瀏覽器版號
    // .pipe($.if(bool, $.base64Inline('../dist'), $.replace('inline("', 'url("')))
    .pipe($.if(bool, $.cleanCss({ level: 2 }), $.sourcemaps.write('.')))
    .pipe($.if(bool, $.purgecss({ content: ['./dist/**/*.html', './dist/**/*.vue', './dist/**/*.js'] })))
    .pipe(g.dest('./dist/css', { sourcemaps: false }))
    .pipe(sync.stream())
  cb()
}

export const babel = cb => {
  g.src('./src/js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.eslint({ fix: true, globals: ['wow','WOW','jQuery', '$'], rules:{ 'no-undef': 0,'no-unused-vars': 0 }  }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe($.if(eslintFixed, g.dest('./src/js/')))
    .pipe($.babel({ presets: ['@babel/preset-env']})) //["@babel/preset-env"] //gulp-babel @babel/preset-env @babel/core
    .pipe($.concat('script.js')) //gulp-concat:合併檔案
    .pipe($.if(bool, $.uglify({ compress: { drop_console: true } }), $.sourcemaps.write('.'))) //gulp-uglify: 壓縮js並清除console
    .pipe(g.dest('./dist/js', { sourcemaps: false }))
    .pipe(sync.stream())
  cb()
}

export const vendors = cb => {
  g.src([...bower(), b4Path + b4JS]) //main-bower-files:抓取套件主檔案
    .pipe($.order(['svgxuse.js', 'jquery.js', 'popper.js', b4JS]))
    .pipe($.concat('vendors.js'))
    .pipe( $.uglify())
    .pipe(g.dest('./dist/js', { sourcemaps: false }))
  cb()
}

export const browserSync = cb => {
  sync.init({port:80, server: { baseDir: './dist' }, reloadDebounce: 1500 })
  cb()
}
export const imageMin = cb => {
  g.src('./src/img/**/*.{jpg,png,gif}')
    .pipe(
      $.if(
        bool,
        $.imagemin([
          $.imagemin.gifsicle(),
          $.imagemin.svgo(),
          imageminJpegRecompress({
            loops: 6,
            min: 40,
            max: 85,
            quality: 'low'
          }),
          imageminPngquant({ speed: 1, quality: [0.4, 0.6] })
        ])
      )
    )
    .pipe(g.dest('./dist/img'))
    .pipe(sync.stream())
  cb()
}

export const clean = cb => {
  del(['./temp/**', './dist/**', './client/**'], { read: false })
  cb()
}

export const inlineSVG = cb => {
  g.src('./src/img/inlineSVG/**/*.svg')
  .pipe($.imagemin([$.imagemin.svgo()]))
  .pipe($.inlineSvg({ filename: '_sprite.scss' }))
  .pipe($.replace(/ width=\'\d+\'/,''))
  .pipe($.replace(/ height=\'\d+\'/,''))
  .pipe($.replace(" stroke-miterlimit='10'",''))
  .pipe($.replace(" stroke-linecap='butt'",''))
  .pipe($.replace(" stroke-linejoin='round'",''))
  .pipe(g.dest('./src/sass/icon'))
  cb()
}
export const sprite = cb => {
  g.src('./src/img/spriteSVG/**/*.svg')
    .pipe($.if(bool, $.imagemin([$.imagemin.svgo()])))
    .pipe($.svgSprite({ mode: { symbol: true } }))
    .pipe($.concat('sprite.svg'))
    .pipe($.if(bool, $.replace(' xmlns="http://www.w3.org/2000/svg"','')))
    .pipe($.if(bool, $.replace(' stroke-miterlimit="10"','')))
    .pipe($.if(bool, $.replace(' stroke-linecap="butt"','')))
    .pipe($.if(bool, $.replace(' stroke-linejoin="round"','')))
    .pipe($.if(bool, $.replace('<?xml version="1.0" encoding="utf-8"?>','')))
    .pipe($.if(bool, $.replace(' xmlns:xlink="http://www.w3.org/1999/xlink"','')))
    .pipe(g.dest('./dist/img'))
    .pipe(sync.stream())
  cb()
}

export function watch() {
  g.watch('./src/**/*.pug', pug)
  g.watch('./src/sass/**/*.s+(a|c)ss', sass)
  g.watch('./src/js/**/*.js', babel)
  g.watch('./src/img/**/*.{jpg,png,gif}', imageMin)
  g.watch('./src/img/spriteSVG/**/*.svg', sprite)
}

exports.reload = g.parallel(watch, browserSync)
exports.compiler = g.parallel(pug, sass, babel, vendors, imageMin)
exports.default = g.parallel(
  pug,
  sass,
  babel,
  vendors,
  imageMin,
  sprite,
  watch,
  browserSync
)
exports.build = g.series(clean, imageMin, vendors, babel, pug, sass)

//eslintOption