import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { FilterChip } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Chip/FilterChip',
  component: FilterChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: props => (
    <FilterChip.Toolbar>
      <FilterChip {...props}>{props.children}</FilterChip>
    </FilterChip.Toolbar>
  ),
  argTypes: {
    defaultSelected: { type: 'boolean' },
    isSelected: { type: 'boolean' },
    isDisabled: { type: 'boolean' },
    isReadOnly: { type: 'boolean' },
  },
  args: {
    children: 'Hello',
    isDisabled: false,
    isReadOnly: false,
    onChange: fn(),
  },
};

export const WithLongText: Story = {
  render: () => (
    <FilterChip.Toolbar>
      <FilterChip>
        This is a very long text that has many unnecesary words and goes on
        without pause at all
      </FilterChip>
    </FilterChip.Toolbar>
  ),
};

export const WithGroupState: Story = {
  render: () => {
    const filterChipState = FilterChip.useFilterChipGroupState({
      selectedKeys: ['w'],
    });

    return (
      <FilterChip.Toolbar>
        <FilterChip {...filterChipState('h')}>Hello</FilterChip>
        <FilterChip {...filterChipState('w')}>World</FilterChip>
      </FilterChip.Toolbar>
    );
  },
};

export const DynamicOptions: Story = {
  render: () => {
    const [recipients, setRecipients] = useState([
      { name: 1, send: false },
      { name: 2, send: false },
    ]);
    const idRef = useRef(2);

    const setSend = (name: number) => (send: boolean) =>
      setRecipients(current =>
        current.map(r => (r.name === name ? { ...r, send } : r))
      );

    const addNew = () => {
      setRecipients(c => [...c, { name: ++idRef.current, send: false }]);
    };

    return (
      <>
        <h1>Send Message</h1>
        <h3>Recipients:</h3>
        <FilterChip.Toolbar>
          {recipients.map(r => (
            <FilterChip
              key={r.name}
              isSelected={r.send}
              onChange={setSend(r.name)}
            >
              {r.name}
            </FilterChip>
          ))}
        </FilterChip.Toolbar>
        <button type="button" onClick={addNew}>
          Add
        </button>
      </>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <FilterChip.Toolbar>
      <FilterChip isDisabled key="yellow">
        Yellow
      </FilterChip>
      <FilterChip defaultSelected key="blue">
        Blue
      </FilterChip>
      <FilterChip key="red">Red</FilterChip>
      <FilterChip defaultSelected isDisabled key="green">
        Green
      </FilterChip>
      <FilterChip key="cyan">Cyan</FilterChip>
      <FilterChip key="magenta">Magenta</FilterChip>
    </FilterChip.Toolbar>
  ),
};
