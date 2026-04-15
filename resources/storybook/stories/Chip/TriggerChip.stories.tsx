import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { TriggerChipProps } from 'hootsuite-bento';
import { fn } from 'storybook/test';

import { TriggerChip } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Chip/TriggerChip',
  component: TriggerChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Choose Options',
    showValues: false,
    isDisabled: false,
  },
} satisfies Meta<typeof TriggerChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: 'Trigger Chip',
    showValues: false,
    isDisabled: false,
  },
  render: (args: TriggerChipProps) => (
    <TriggerChip {...args} onClick={fn()} />
  ),
};
