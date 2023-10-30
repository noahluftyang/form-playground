import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './{pages,renderer}/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'styled',
});
