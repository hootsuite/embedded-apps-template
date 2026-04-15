import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Box, IconButton } from 'hootsuite-bento';

const overlayDecorator: Decorator = (Story, { args: { variant } }) =>
  variant === 'overlay-filled' ||
  variant === 'overlay-filled-inverse' ||
  variant === 'overlay-ghost' ||
  variant === 'overlay-ghost-inverse' ? (
    <Box
      padding="4"
      attributes={{
        style: {
          backgroundImage: `url('https://picsum.photos/id/${
            String(variant).includes('inverse') ? '344' : '120'
          }/1000/100?blur=10')`,
          backgroundSize: 'cover',
        },
      }}
    >
      <Story />
    </Box>
  ) : (
    <Story />
  );

const meta = {
  title: 'Bento/Button/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [overlayDecorator],
  argTypes: {
    variant: { control: 'inline-radio' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
    },
    size: { control: 'inline-radio' },
    iconProps: { control: 'object' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    onPress: { control: false },
    onClick: { control: false },
    role: { control: 'text' },
    'aria-current': { control: 'text' },
  },
  args: {
    iconProps: { name: 'favorite' },
    'aria-label': 'Click this button to trigger an action',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { onPress: fn() },
};

export const Emoji: Story = {
  args: { emoji: '👍', iconProps: undefined },
};

export const IconButtonAsLink: Story = {
  args: {
    iconProps: { name: 'favorite' },
    'aria-label': 'Click this button to trigger an action',
    href: 'https://www.google.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    role: 'link',
  },
};
