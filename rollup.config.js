import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/app.js',
    output: {
        file: 'build/bundle.js',
        format: 'es',
        name: 'app',
        sourcemap: true,
    },
    plugins: [
        svelte({
            emitCss: false,
            compilerOptions: {
                css: "injected"
            }
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs()
    ],
};
