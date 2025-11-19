import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const baseConfig = {
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
    terser(),
  ],
};

const createConfig = (input, output) => ({
  input,
  output: Array.isArray(output) ? output : [output],
  ...baseConfig,
});

export default [
  createConfig('src/index.ts', [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      sourcemap: true,
      name: 'MuiCascade',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
        '@mui/material': 'MUI',
        '@mui/material/styles': 'styles',
        '@mui/icons-material': 'MUIicons',
        '@emotion/react': 'EmotionReact',
        '@emotion/styled': 'EmotionStyled',
        '@mui/system': 'MUIsystem',
        'react-syntax-highlighter': 'ReactSyntaxHighlighter',
        'react-syntax-highlighter/dist/esm/styles/prism': 'prism',
      },
    },
  ]),
  createConfig('src/navigation.ts', {
    file: 'dist/navigation.js',
    format: 'esm',
    sourcemap: true,
  }),
  createConfig('src/docs/ButtonDoc.tsx', {
    file: 'dist/ButtonDoc.js',
    format: 'esm',
    sourcemap: true,
  }),
  createConfig('src/docs/CardDoc.tsx', {
    file: 'dist/CardDoc.js',
    format: 'esm',
    sourcemap: true,
  }),
  createConfig('src/docs/InputDoc.tsx', {
    file: 'dist/InputDoc.js',
    format: 'esm',
    sourcemap: true,
  }),
  createConfig('src/docs/ModalDoc.tsx', {
    file: 'dist/ModalDoc.js',
    format: 'esm',
    sourcemap: true,
  }),
  createConfig('src/docs/ComponentDoc.tsx', {
    file: 'dist/ComponentDoc.js',
    format: 'esm',
    sourcemap: true,
  }),
];
