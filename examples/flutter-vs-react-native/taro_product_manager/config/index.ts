export default {
  projectName: 'taro_product_manager',
  date: '2026-05-30',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-platform-weapp', '@tarojs/plugin-framework-react'],
  defineConstants: {},
  copy: {
    patterns: [],
  },
  framework: 'react',
  compiler: 'webpack5',
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
      },
    },
  },
  h5: {},
}
