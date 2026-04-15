import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { DisplayToggleButton } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Button/DisplayToggleButton',
  component: DisplayToggleButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DisplayToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
