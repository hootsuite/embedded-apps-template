import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Glyph } from '@fp-icons/icon-base';
import Icon from '@fp-icons/icon-base';
import { fn } from 'storybook/test';

import { Flex, InlineDropdown, type InlineDropdownProps } from 'hootsuite-bento';

const svgExample: Glyph = ({ html }) =>
  html`<polygon points="16.25 13.75 10 6.25 3.75 13.75" />`;

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
        'Example (SVG)': { glyph: svgExample },
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
  <InlineDropdown.Item key="menu-item-1">Menu item 1</InlineDropdown.Item>,
  <InlineDropdown.Item key="menu-item-2">Menu item 2</InlineDropdown.Item>,
  <InlineDropdown.Item key="menu-item-3">Menu item 3</InlineDropdown.Item>,
];

const inlineDropdownItemsWithIcon = [
  <InlineDropdown.Item key="menu-item-1" textValue="Menu item 1">
    <Flex gap="2" alignItems="center">
      <Icon size="20px" name="stacks" />
      <span>Menu item 1</span>
    </Flex>
  </InlineDropdown.Item>,
  <InlineDropdown.Item key="menu-item-2" textValue="Menu item 2">
    <Flex gap="2" alignItems="center">
      <Icon size="20px" name="sunny" />
      <span>Menu item 2</span>
    </Flex>
  </InlineDropdown.Item>,
  <InlineDropdown.Item key="menu-item-3" textValue="Menu item 3">
    <Flex gap="2" alignItems="center">
      <Icon size="20px" name="notifications" />
      <span>Menu item 3</span>
    </Flex>
  </InlineDropdown.Item>,
];

export const Base: Story = {
  render: (props: InlineDropdownProps) => (
    <InlineDropdown
      {...props}
      onChange={props.onChange ?? fn()}
      defaultSelectedKey="menu-item-1"
      aria-label="Select item"
    >
      {inlineDropdownItems}
    </InlineDropdown>
  ),
};

export const WithItemsWithIcon: Story = {
  render: (props: InlineDropdownProps) => (
    <InlineDropdown
      {...props}
      onChange={props.onChange ?? fn()}
      defaultSelectedKey="menu-item-1"
      aria-label="Select item"
    >
      {inlineDropdownItemsWithIcon}
    </InlineDropdown>
  ),
};

export const Disabled: Story = {
  render: (props: InlineDropdownProps) => (
    <InlineDropdown
      {...props}
      onChange={props.onChange ?? fn()}
      defaultSelectedKey="menu-item-1"
      aria-label="Select item"
      isDisabled
    >
      {inlineDropdownItems}
    </InlineDropdown>
  ),
};
