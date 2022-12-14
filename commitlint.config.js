const path = require('path');

const { createConfig } = require('@self-kit/commitlint-config');
const getDirNames = require('read-dir-names');

const packagesNames = getDirNames(path.resolve(__dirname, 'packages'));
const componentsNames = getDirNames(
  path.resolve(__dirname, 'packages', 'ui', 'src'),
);
const validationRulesNames = getDirNames(
  path.resolve(__dirname, 'packages', 'validations', 'src'),
);

module.exports = createConfig({
  scopes: [...packagesNames, ...componentsNames, ...validationRulesNames],
  ticketPrefix: 'UIKIT',
});
