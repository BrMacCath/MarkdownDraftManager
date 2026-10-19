import { defineConfig } from '@vscode/test-cli';

   export default defineConfig({
     files: 'out/test/**/*.test.js',
     coverage: {
       reporter: ['lcov', 'text'],
       includeAll: true,
       include: ['out/**/*.js'],
       exclude: ['out/test/**'],
     },
});
