import { createTheme, Brand } from '../packages/ui/src'
import UbuntuBoldWoff from '@self-kit/fonts/src/UbuntuBold.woff';
import UbuntuBoldWoff2 from '@self-kit/fonts/src/UbuntuBold.woff2';
import UbuntuLightWoff from '@self-kit/fonts/src/UbuntuLight.woff';
import UbuntuLightWoff2 from '@self-kit/fonts/src/UbuntuLight.woff2';
import UbuntuRegularWoff from '@self-kit/fonts/src/UbuntuRegular.woff';
import UbuntuRegularWoff2 from '@self-kit/fonts/src/UbuntuRegular.woff2';
import UbuntuMediumWoff from '@self-kit/fonts/src/UbuntuMedium.woff';
import UbuntuMediumWoff2 from '@self-kit/fonts/src/UbuntuMedium.woff2';

const fontsUrls = {
  bold: {
    woff: UbuntuBoldWoff,
    woff2: UbuntuBoldWoff2
  },
  light: {
    woff: UbuntuLightWoff,
    woff2: UbuntuLightWoff2
  },
  regular: {
    woff: UbuntuRegularWoff,
    woff2: UbuntuRegularWoff2
  },
  medium: {
    woff: UbuntuMediumWoff,
    woff2: UbuntuMediumWoff2
  }
};

export const themes = [
  {
    name: 'Base theme',
    theme: createTheme({ brand: Brand.DEFAULT, fontsUrls })
  },
  {
    name: 'Primary theme',
    theme: createTheme({ brand: Brand.PRIMARY, fontsUrls })
  },
  {
    name: 'Secondary theme',
    theme: createTheme({ brand: Brand.SECONDARY, fontsUrls })
  },
  {
    name: 'Green theme',
    theme: createTheme({ brand: Brand.GREEN, fontsUrls })
  },
];

export const getTheme = (name) => {
  return themes.find((theme) => theme.name === name).theme
};
