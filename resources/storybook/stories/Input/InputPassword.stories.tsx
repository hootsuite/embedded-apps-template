import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { InputPassword } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Input/InputPassword',
  component: InputPassword,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  render: props => (
    <div style={{ minWidth: 250 }}>
      <InputPassword {...props} />
    </div>
  ),
  argTypes: {
    status: { control: { type: 'select' }, options: ['', 'error', 'success'] },
    isDisabled: { control: 'boolean' },
    isInline: { control: 'boolean' },
    style: {
      options: ['None', 'Example (change width)'],
      mapping: {
        None: undefined,
        'Example (change width)': { width: '400px' },
      },
    },
  },
  args: {
    isDisabled: false,
    isInline: false,
    'aria-label': 'password input',
    placeholder: 'Password',
  },
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = { args: {} };
