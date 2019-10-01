const gulp = require('gulp');
const rollup = require('rollup');
const node_resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('rollup-plugin-commonjs');

gulp.task('build', async () => {
    return rollup.rollup({
        input: '../src/App.ts',
        treeshake: true,
        plugins: [
            commonjs(),
            node_resolve(),
            typescript({
                check: false,
                tsconfigOverride: {
                    compilerOptions: {
                        removeComments: true
                    }
                },
                include: /.*(.ts)$/
            }),
        ],
        onwarn: function (warning) {
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            console.warn(warning.message);
        }
    }).then(bundle => {
        return bundle.write({
            file: '../bin/js/bundle.js',
            format: 'iife',
            name: 'paw',
            sourcemap: true
        })
    });
});

gulp.task('watch', () => {
    gulp.watch('../src/**/*.ts', gulp.series(['build']));
});

gulp.task('default', gulp.series(['watch']));