import { Components } from '@mui/material';

import type { Theme } from '../baseTheme';

export const MuiCircularProgress: Components<Theme>['MuiCircularProgress'] = {
  styleOverrides: {
    root({ ownerState, theme }) {
      // В данном случае появилась необходимость использования data- атрибута
      const { 'data-color': color } = ownerState;

      return {
        color:
          color === 'primary'
            ? theme.palette.grey[900]
            : theme.palette.primary.contrastText,
      };
    },
  },
};

export default MuiCircularProgress;
