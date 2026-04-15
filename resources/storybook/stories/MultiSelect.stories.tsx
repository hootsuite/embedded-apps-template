import React from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';
import type { Selection } from '@react-types/shared';
import type { SelectMultiProps } from 'hootsuite-bento';
import { fn } from 'storybook/test';

import { MultiSelect, Select } from 'hootsuite-bento';

type MultiSelectOnSelectionChange = NonNullable<
  ComponentProps<typeof MultiSelect>['onSelectionChange']
>;

const meta = {
  title: 'Bento/MultiSelect',
  component: MultiSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { 'aria-label': 'multi select example' },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: props => (
    <MultiSelect {...(props as SelectMultiProps<object>)}>
      <Select.Item aria-label="first">
        <span>
          First <b>(custom JSX)</b>
        </span>
      </Select.Item>
      <Select.Section title="Group 1">
        <Select.Item>Second</Select.Item>
        <Select.Item>Third. Quite long. Very long indeed</Select.Item>
      </Select.Section>
    </MultiSelect>
  ),
};

export const ControlledSelection: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<SelectMultiProps<object>>();

    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() =>
              updateArgs({ selectedKeys: new Set(['1', '2', '3']) })
            }
          >
            Select All
          </button>
          <button
            type="button"
            onClick={() => updateArgs({ selectedKeys: new Set() })}
          >
            Clear Selection
          </button>
        </div>

        <MultiSelect
          {...args}
          onSelectionChange={
            ((keys: Selection) => {
              updateArgs({ selectedKeys: keys });
              fn()(keys);
            }) as MultiSelectOnSelectionChange
          }
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
          <Select.Item key="3">Option 3</Select.Item>
        </MultiSelect>
      </div>
    );
  },
};

export const DefaultValuesOnMultiselect: Story = {
  render: props => (
    <MultiSelect
      {...(props as SelectMultiProps<object>)}
      defaultSelectedKeys={['Second', 'first']}
      disallowEmptySelection
    >
      <Select.Item aria-label="first" textValue="first" key="first">
        first
      </Select.Item>
      <Select.Item key="Second">Second</Select.Item>
      <Select.Item key="Third">Third</Select.Item>
    </MultiSelect>
  ),
};
