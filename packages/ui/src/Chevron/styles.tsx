import { ChevronDOutlineMd } from '@self-kit/icons';

import { styled } from '../styles';

import { ChevronProps } from './Chevron';

export const ChevronWrapper = styled(ChevronDOutlineMd, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<Pick<ChevronProps, 'isActive'>>`
  transform: rotateZ(${({ isActive }) => (isActive ? 180 : 0)}deg);

  transition: ${({ theme }) =>
    theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    })};
`;
