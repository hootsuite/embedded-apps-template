import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { InlineDropdown, type InlineDropdownProps } from 'hootsuite-bento';

const meta = {
  title: 'Bento/InlineDropdown',
  component: InlineDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: { control: 'boolean' },
    iconProps: {
      options: ['None', 'Example (MaterialSymbol)', 'Example (SVG)'],
      mapping: {
        None: undefined,
        'Example (MaterialSymbol)': { name: 'favorite' },
      },
    },
    disabledKeys: {
      options: ['None', 'Example'],
      mapping: {
        None: undefined,
        Example: ['menu-item-2'],
      },
    },
    selectedKey: {
      options: ['None', 'Example'],
      mapping: {
        None: undefined,
        Example: 'menu-item-1',
      },
    },
  },
} satisfies Meta<typeof InlineDropdown>;

export default meta;
type Story = StoryObj<typeof InlineDropdown>;

const inlineDropdownItems = [
  <InlineDropdown.Item key='menu-item-1'>Menu item 1</InlineDropdown.Item>,
  <InlineDropdown.Item key='menu-item-2'>Menu item 2</InlineDropdown.Item>,
  <InlineDropdown.Item key='menu-item-3'>Menu item 3</InlineDropdown.Item>,
];

export const Base: Story = {
  render: (props: InlineDropdownProps) => (
    <InlineDropdown
      {...props}
      onChange={props.onChange ?? fn()}
      defaultSelectedKey='menu-item-1'
      aria-label='Select item'
    >
      {inlineDropdownItems}
    </InlineDropdown>
  ),
};

export const Disabled: Story = {
  render: (props: InlineDropdownProps) => (
    <InlineDropdown
      {...props}
      onChange={props.onChange ?? fn()}
      defaultSelectedKey='menu-item-1'
      aria-label='Select item'
      isDisabled
    >
      {inlineDropdownItems}
    </InlineDropdown>
  ),
};
