const { buildTs, copy, rmDist } = require('@self-kit/commander');

rmDist();

copy({
  sourcesDirPath: './src/declaration',
});

buildTs({
  releaseTag: process.env.RELEASE_TAG,
  packageExports: {
    './server': './server/index.js',
  },
});
