import type { Preview } from '@storybook/react-webpack5';
import { loadTheme } from 'hootsuite-bento';

loadTheme('light');

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
