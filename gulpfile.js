const Gulp = require("gulp");
const SourceMap = require("gulp-sourcemaps");
const Typedoc = require("gulp-typedoc");
const Typescript = require("gulp-typescript");

const tsConfig = Typescript.createProject("tsconfig.json");
const tsDocConfig = Typescript.createProject("tsconfig.doc.json");

function build() {
    return Gulp.src("src/**", { base: "src" })
        .pipe(SourceMap.init())
        .pipe(tsConfig())
        .pipe(SourceMap.write(".", { includeContent: false, sourceRoot: f => f.cwd + '/src' }))
        .pipe(Gulp.dest("lib"));
}

function watch() {
    return Gulp.watch("src/**/*.ts", build);
}

function typedoc() {
    return Gulp
        .src(["src/**/*.ts"])
        .pipe(tsDocConfig())
        .pipe(Typedoc({
            module: "commonjs",
            target: "es6",
            out: "docs/",
            name: "Node.JS osu!api v2 wrapper",
            mode: "library"
        }));
};

exports.default = exports.build = build;
exports.typedoc = typedoc;
exports.watch = watch;