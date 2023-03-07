const { buildTs, rmDist } = require('@self-kit/commander');

rmDist();

buildTs({
  releaseTag: process.env.RELEASE_TAG,
});
