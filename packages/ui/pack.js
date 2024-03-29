const { buildTs, copy, rmDist } = require('@self-kit/commander');

rmDist();
copy({ sourcesDirPath: './fonts' });
copy({ sourcesDirPath: './illustrations' });

copy({
  sourcesDirPath: './src',
  targetPath: '.',
  files: ['declarations.d.ts'],
});

buildTs({
  releaseTag: process.env.RELEASE_TAG,
  packageExports: {
    './server': './server/index.js',
    './fonts/*': './fonts/*',
    './illustrations/*': './illustrations/*',
  },
});
