import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import type { Glyph } from '@fp-icons/icon-base';
import { fn } from 'storybook/test';

import { Box, Button } from 'hootsuite-bento';

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

const svgExample: Glyph = ({ html }) =>
  html`<polygon points="16.25 13.75 10 6.25 3.75 13.75" />`;

const meta = {
  title: 'Bento/Button/FormButton',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [overlayDecorator],
  argTypes: {
    variant: {
      control: 'inline-radio',
      description: 'The variant of the button',
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description: 'The behavior of the button when used in an HTML form',
    },
    size: {
      control: 'inline-radio',
      description: 'The size of the button',
    },
    iconProps: {
      options: ['None', 'Example (MaterialSymbol)', 'Example (SVG)'],
      description: 'The icon to be displayed to the left of the button text',
      mapping: {
        None: undefined,
        'Example (MaterialSymbol)': { name: 'favorite' },
        'Example (SVG)': {
          glyph: svgExample,
        },
      },
    },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    onPress: { control: false },
    onClick: { control: false },
    role: { control: 'text' },
    'aria-current': { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Default',
    iconProps: undefined,
    onPress: fn(),
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Default',
    iconProps: { name: 'favorite' },
    onPress: fn(),
  },
  argTypes: {
    iconProps: { control: false },
  },
};

export const WithLongText: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus tortor id ante sodales, at pellentesque ipsum placerat.',
    onPress: fn(),
  },
};

export const ButtonAsLink: Story = {
  args: {
    children: 'Anchor link',
    href: 'https://www.google.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    role: 'link',
  },
};
