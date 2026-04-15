import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { HintBadge } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Badge/HintBadge',
  component: HintBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof HintBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};
