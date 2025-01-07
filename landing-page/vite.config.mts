import { resolve } from 'node:path';
import { withPageConfig } from '@extension/vite-config';
import react from '@vitejs/plugin-react-swc';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, 'dist'),
  },
  envDir: "../.env"
}, true);
