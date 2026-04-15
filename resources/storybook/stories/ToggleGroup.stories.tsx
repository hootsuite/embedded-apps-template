import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Key } from '@react-types/shared';
import { fn } from 'storybook/test';

import { ToggleGroup } from 'hootsuite-bento';

const toggleGroupButtons = [
  { id: 'button1', text: 'Option 1' },
  { id: 'button2', text: 'Option 2' },
  { id: 'button3', text: 'Option 3' },
];

const meta = {
  title: 'Bento/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    buttons: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    buttons: [...toggleGroupButtons],
    selectedKeys: new Set<Key>(['button1']),
    onSelectionChange: fn(),
  },
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
      new Set(['button1'])
    );

    return (
      <ToggleGroup
        buttons={[...toggleGroupButtons]}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />
    );
  },
};
