import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import path from "path";

const includedModules = ['specific-library-1', 'specific-library-2']; // Replace with modules you want to include

export default {
    input: 'src/app.js',
    output: {
        dir: 'build/',
        format: 'es',
        name: 'app',
        sourcemap: true,
    },
    external: (id) => {
        if (id.startsWith('./') || id.startsWith('../') || id.startsWith(path.resolve('src'))) {
            // Always include local files (in the `src` folder)
            return false;
        }
        if (includedModules.some((module) => id === module || id.startsWith(`${module}/`))) {
            // Include specific `node_modules`
            return false;
        }
        // Exclude everything else from `node_modules`
        return id.includes('node_modules') && !id.includes('svelte');
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
