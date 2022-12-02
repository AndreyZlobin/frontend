import { Brand } from '../constants';

import { createTheme } from './baseTheme';

describe('createTheme', () => {
  const fontsUrls = {
    bold: {
      woff: '',
      woff2: '',
    },
    regular: {
      woff: '',
      woff2: '',
    },
    medium: {
      woff: '',
      woff2: '',
    },
    light: {
      woff: '',
      woff2: '',
    },
  };

  it('Theme merge done correctly', () => {
    const extendedTheme = createTheme({
      brand: Brand.DEFAULT,
      fontsUrls,
      options: {
        typography: { h1: { lineHeight: 12 } },
      },
    });

    expect(extendedTheme.typography.h1.lineHeight).toBe(12);
  });
});
