import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Glyph } from '@fp-icons/icon-base';

import { Badge } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Badge/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'inline-radio' },
    children: { control: 'text' },
    role: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: 'Published',
    type: 'positive',
  },
};

export const TextWithIcon: Story = {
  args: {
    iconProps: {
      name: 'check_circle',
      fill: true,
      'aria-label': 'icon with extra details',
    },
    children: 'Published',
    type: 'positive',
  },
};

export const IconOnly: Story = {
  args: {
    iconProps: { name: 'check_circle', fill: true, 'aria-label': 'Published' },
    type: 'positive',
  },
};

const customBadgeGlyph: Glyph = ({ html }) =>
  html`<polygon points="16.25 13.75 10 6.25 3.75 13.75" />`;

export const SVGIconOnly: Story = {
  args: {
    iconProps: { glyph: customBadgeGlyph, 'aria-label': 'Published' },
    type: 'positive',
  },
};
