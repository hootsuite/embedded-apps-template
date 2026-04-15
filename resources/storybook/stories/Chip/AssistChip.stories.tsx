import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Glyph } from '@fp-icons/icon-base';
import { fn } from 'storybook/test';

import { AssistChip } from 'hootsuite-bento';

const svgExample: Glyph = ({ html }) =>
  html`<polygon points="16.25 13.75 10 6.25 3.75 13.75" />`;

const meta = {
  title: 'Bento/Chip/AssistChip',
  component: AssistChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    iconProps: {
      options: ['None', 'Example (MaterialSymbol)', 'Example (SVG)'],
      mapping: {
        None: undefined,
        'Example (MaterialSymbol)': { name: 'favorite' },
        'Example (SVG)': { glyph: svgExample },
      },
    },
  },
} satisfies Meta<typeof AssistChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Default',
    onPress: fn(),
  },
};
