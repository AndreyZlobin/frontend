const fs = require('fs');

const { PACKAGES_NAMES } = require('../../constants');

const readPackageJSON = (packageJSONPath) =>
  JSON.parse(fs.readFileSync(packageJSONPath));

// обновляет до последней версии пакеты, которые есть в репозитории
const updateDepsVersions = (packageDeps, rootPackageVersion) =>
  PACKAGES_NAMES.reduce((newPackageDeps, packageName) => {
    if (!newPackageDeps[packageName]) {
      return newPackageDeps;
    }

    return { ...newPackageDeps, [packageName]: `^${rootPackageVersion}` };
  }, packageDeps);

const updatePackagesVersions = (packageJSONPath, rootPackageVersion) => {
  const packageData = readPackageJSON(packageJSONPath);

  fs.writeFileSync(
    packageJSONPath,
    JSON.stringify(
      {
        ...packageData,
        dependencies: updateDepsVersions(
          packageData.dependencies || {},
          rootPackageVersion,
        ),
        version: rootPackageVersion,
      },
      null,
      2,
    ),
  );

  return readPackageJSON(packageJSONPath);
};

const modifyPackageJSON = ({
  /**
   * @description Флаг, указывающий, на то содержит ли пакет только статичные файлы (изображения, шрифты...)
   * */
  isStaticPackage = false,
  /**
   * @description Новая версия пакета
   * @example modifyPackageJSON({ releaseTag: '1.1.0' })
   * */
  releaseTag,
}) => {
  if (!releaseTag) {
    throw Error('modifyPackageJSON: releaseTag is not defined');
  }

  console.log('Starting modifyPackageJSON...');
  console.log('Update packages versions and deps');

  const packageData = updatePackagesVersions('./package.json', releaseTag);

  const {
    scripts,
    devDependencies,
    keywords = [],
    ...restPackageData
  } = packageData;

  console.log('Write data to lib package.json');

  const modifiedPackageData = {
    ...restPackageData,
    version: releaseTag,
    author: 'zlobin_andy',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/AndreyZlobin/frontend',
    },
    bugs: {
      url: 'https://github.com/AndreyZlobin/frontend/issues',
    },
    keywords,
    sideEffects: false,
    // обнуляем main, если оно есть
    main: undefined,
  };

  if (!isStaticPackage) {
    Object.assign(modifiedPackageData, {
      types: './esm/index.d.ts',
      main: './index.js',
      module: './esm/index.js',
      browser: './esm/index.js',
      exports: {
        '.': {
          import: './esm/index.js',
          require: './index.js',
        },
        './server': {
          import: './esm/server/index.js',
          require: './server/index.js',
        },
      },
    });
  }

  fs.writeFileSync(
    './lib/package.json',
    JSON.stringify(modifiedPackageData, null, 2),
  );

  console.log('Finish modifyPackageJSON');
};

module.exports = { modifyPackageJSON };
