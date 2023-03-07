module.exports = {
  'packages/ui/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/ui',
    () => 'npm run lint:types --workspace=@self-kit/ui',
  ],

  'packages/components/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/components',
    () => 'npm run lint:types --workspace=@self-kit/components',
  ],
  'packages/components/**/styles.{ts,tsx}': [
    'npm run lint:styles --workspace=@self-kit/components',
  ],

  'packages/icons/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/icons',
    () => 'npm run lint:types --workspace=@self-kit/icons',
  ],

  'packages/form/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/form',
    () => 'npm run lint:types --workspace=@self-kit/form',
  ],

  'packages/features/**/*.{js,jsx,ts,tsx}': [
    'npm run lint --workspace=@self-kit/features',
    () => 'npm run lint:types --workspace=@self-kit/features',
  ],
  'packages/features/**/styles.{ts,tsx}': [
    'npm run lint:styles --workspace=@self-kit/features',
  ],

  'packages/validations/**/*.{js,ts}': [
    'npm run lint --workspace=@self-kit/validations',
    () => 'npm run lint:types --workspace=@self-kit/validations',
  ],

  'commander/**/*.{js}': ['npm run lint --workspace=@self-kit/commander'],

  'PRTitleLinter/**/*.{js}': [
    'npm run lint --workspace=@self-kit/PRTitleLinter',
  ],
};
