import { defineConfig } from '@vscode/test-cli';

   export default defineConfig({
     files: 'out/test/**/*.test.js',
     coverage: {
       reporter: ['lcov', 'text'],
       include: ['out/**/*.js'],
       exclude: ['**/node_modules/**', 'out/test/**'],
     },
});
