import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { InputSearch } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Input/InputSearch',
  component: InputSearch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  render: props => (
    <div style={{ minWidth: 250 }}>
      <InputSearch {...props} />
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
    onClearButtonClicked: { table: { disable: true } },
  },
  args: {
    isDisabled: false,
    isInline: false,
    'aria-label': 'search input',
    placeholder: 'Search',
    onClearButtonClicked: fn(),
  },
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = { args: {} };
