module.exports = {
  'packages/ui/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/ui',
    'npm run lint:styles --workspace=@self-kit/ui',
    () => 'npm run lint:types --workspace=@self-kit/ui',
  ],
  'packages/icons/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/icons',
    () => 'npm run lint:types --workspace=@self-kit/icons',
  ],
  'packages/form/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/form',
    () => 'npm run lint:types --workspace=@self-kit/form',
  ],
  'packages/validations/**/*.{js,ts}': [
    'npm run lint --workspace=@self-kit/validations',
    () => 'npm run lint:types --workspace=@self-kit/validations',
  ],
  'commander/**/*.{js}': ['npm run lint --workspace=@self-kit/commander'],
};
