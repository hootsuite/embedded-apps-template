import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { InputPayment } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Input/InputPayment',
  component: InputPayment,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  render: props => (
    <div style={{ minWidth: 250 }}>
      <InputPayment {...props} />
    </div>
  ),
  argTypes: {
    defaultValue: {
      control: { type: 'select' },
      options: [
        '',
        '(visa) 4444 4444 4444 4444',
        '(mastercard) 5555 5555 5555 5555',
        '(american express) 3700 0000 0000 0000',
        '(discover) 6555 5555 5555 5555',
        '(jcb) 1800 0000 0000 0000',
      ],
    },
    status: { control: { type: 'select' }, options: ['', 'error', 'success'] },
    isDisabled: { control: 'boolean' },
    isInline: { control: 'boolean' },
  },
  args: {
    isDisabled: false,
    isInline: false,
    'aria-label': 'payment input',
    placeholder: 'Card number',
  },
} satisfies Meta<typeof InputPayment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = { args: {} };
