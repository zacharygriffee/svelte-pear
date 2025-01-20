import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';

export default {
    input: 'src/app.js',
    output: {
        dir: 'build/',
        format: 'es',
        name: 'app',
        sourcemap: true,
    },

    plugins: [
        alias({
            entries: [
                { find: '$lib', replacement: './src/lib' },
                { find: '$src', replacement: './src' },
            ]
        }),
        svelte({
            emitCss: false,
            compilerOptions: {
                css: "injected"
            }
        }),
        resolve({
            browser: true, // Required to detect client vs server side in some libraries
            dedupe: ['svelte'],
        }),
        commonjs()
    ],
};
