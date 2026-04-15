import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Select, SingleSelect } from 'hootsuite-bento';

const meta = {
  title: 'Bento/SingleSelect',
  component: SingleSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    'aria-label': 'example select',
    hasChipLayout: false,
    isInline: true,
    disallowEmptySelection: false,
    isDisabled: false,
    isInvalid: false,
    showSelection: false,
    emptyTriggerText: 'Select an option',
  },
} satisfies Meta<typeof SingleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: props => (
    <SingleSelect {...props}>
      <Select.Item textValue="First">
        <span>
          First (I have complex html so the selected label comes from{' '}
          <b>(aria-label)</b>)
        </span>
      </Select.Item>
      <Select.Section title="Group 1">
        <Select.Item>Second</Select.Item>
        <Select.Item>Third. Quite long. Very long indeed</Select.Item>
      </Select.Section>
    </SingleSelect>
  ),
};

export const DefaultValueOnSingleSelect: Story = {
  render: props => (
    <SingleSelect
      {...props}
      defaultSelectedKeys={['second']}
      disallowEmptySelection
    >
      <Select.Section title="Group 1">
        <Select.Item key="second">Second</Select.Item>
        <Select.Item key="third">Third</Select.Item>
      </Select.Section>
    </SingleSelect>
  ),
};
