import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { InputText } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Input/InputText',
  component: InputText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  render: props => (
    <div style={{ minWidth: 250 }}>
      <InputText {...props} />
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
    'aria-label': { table: { disable: true } },
  },
  args: {
    isDisabled: false,
    isInline: false,
    'aria-label': 'example input',
    placeholder: 'Enter some text',
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = { args: {} };

export const DefaultValue: Story = {
  args: { defaultValue: 'Default input value' },
};

export const ErrorStatus: Story = {
  args: { status: 'error' },
};
