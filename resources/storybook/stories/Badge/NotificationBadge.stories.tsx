import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { NotificationBadge } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Badge/NotificationBadge',
  component: NotificationBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    iconProps: { name: 'check_circle' },
    type: 'positive',
  },
};
