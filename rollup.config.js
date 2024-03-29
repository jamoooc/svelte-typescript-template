import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import { config } from 'dotenv';

const production = !process.env.ROLLUP_WATCH;

// parse .env for plugin-replace
const configToReplace = {};
for (const [key, v] of Object.entries(config().parsed)) {
  configToReplace[`process.env.${key}`] = `'${v}'`;
}

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			include: ["src/**/*.ts", "src/**/*.svelte"],
			preventAssignment: true,
			values: configToReplace,
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15
    }),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
				// hydratable: true,
				// css: css => {
				// 	css.write("public/bundle.css");
				// }
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public', { delay: 200 }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// !production &&
		// livereload({
		// 	watch: "public/App.js",
		// 	delay: 200
		// }),
	],
	watch: {
		clearScreen: false
	}
};
