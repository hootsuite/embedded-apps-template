import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Textarea } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Input/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  render: props => <Textarea {...props} />,
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['', 'error', 'success'],
    },
    isDisabled: { control: 'boolean' },
    style: { control: 'object' },
    isExpandable: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    isDisabled: false,
    isExpandable: false,
    style: undefined,
    status: undefined,
    placeholder: 'Enter your text here...',
    'aria-label': 'Example textarea',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = { args: {} };

export const Expandable: Story = {
  args: { isExpandable: true },
};

export const ErrorStatus: Story = {
  args: { status: 'error' },
};
