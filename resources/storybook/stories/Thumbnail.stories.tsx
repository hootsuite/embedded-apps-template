import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';

import { Flex, Thumbnail } from 'hootsuite-bento';

const centerDecorator: Decorator = Story => (
  <Flex alignItems="center" justifyContent="center" height={500} maxHeight="90vh">
    <Story />
  </Flex>
);

const meta = {
  title: 'Bento/Thumbnail',
  component: Thumbnail,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [centerDecorator],
  args: {
    state: 'enabled',
    src: 'https://picsum.photos/400/600',
    progress: 45,
    isSelected: false,
    hasIssue: false,
    mediaCount: 1,
    'aria-label': 'Thumbnail',
    size: '16',
    ratio: 'fill',
    badge: undefined,
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
