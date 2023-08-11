import { createStitches } from '@stitches/react';

import {
  colors,
  fonts,
  fontSizes,
  media,
  radii,
  sizes,
  space,
  zIndices,
  shadows,
  boxShadows
} from './tokens';

const stitchesConfig = createStitches({
  theme: {
    fonts,
    colors,
    space,
    sizes,
    fontSizes,
    radii,
    zIndices,
    shadows,
    boxShadows
  },
  media
});

export const { css, keyframes, theme } = stitchesConfig;
