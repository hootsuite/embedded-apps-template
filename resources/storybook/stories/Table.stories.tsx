import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { TableProps } from 'hootsuite-bento';

import { Table } from 'hootsuite-bento';

type Item = { id: string; name: string; type: string; date: string };

const itemsList: Item[] = [
  { id: 'id1', name: 'Games', type: 'File folder', date: '6/7/2020' },
  { id: 'id2', name: 'Program Files', type: 'File folder', date: '4/7/2021' },
  { id: 'id3', name: 'bootmgr', type: 'System file', date: '11/20/2010' },
  { id: 'id4', name: 'log.txt', type: 'Text Document', date: '1/18/2016' },
];

const sortFn = (
  a: Item,
  b: Item,
  column: keyof Item,
  direction?: 'ascending' | 'descending'
) => {
  const first = a[column];
  const second = b[column];
  let cmp =
    column === 'date'
      ? new Date(first) < new Date(second)
        ? -1
        : 1
      : (parseInt(String(first), 10) || first) <
          (parseInt(String(second), 10) || second)
        ? -1
        : 1;

  if (direction === 'descending') {
    cmp *= -1;
  }
  return cmp;
};

const meta = {
  title: 'Bento/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<TableProps<Item>>;

export const UsingDefaultProps: Story = {
  name: 'Using default props',
  args: {
    'aria-label': 'Table Component with default props',
  },
  render: args => (
    <Table {...args}>
      <Table.Header>
        <Table.Column key="name">Name</Table.Column>
        <Table.Column key="type">Type</Table.Column>
        <Table.Column key="date">Date Modified</Table.Column>
      </Table.Header>
      <Table.Body>
        {itemsList.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.date}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithAlternatingRows: Story = {
  name: 'With alternating rows',
  args: {
    'aria-label': 'Table Component with alternating rows',
    hasAlternateRows: true,
  },
  render: args => (
    <Table {...args}>
      <Table.Header>
        <Table.Column key="name">Name</Table.Column>
        <Table.Column key="type">Type</Table.Column>
        <Table.Column key="date">Date Modified</Table.Column>
      </Table.Header>
      <Table.Body>
        {itemsList.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.date}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithNestedColumns: Story = {
  name: 'With nested columns',
  args: {
    'aria-label': 'Table Component with nested columns',
    sortDescriptor: { column: 'name', direction: 'ascending' },
  },
  argTypes: {
    selectionMode: {
      control: 'inline-radio',
      options: ['none', 'single'],
    },
  },
  render: args => {
    const [items, setItems] = useState(itemsList);

    const onSortByColumn: TableProps<Item>['onSortByColumn'] = ({
      column,
      direction,
    }) => {
      const sortedItems = [...items].sort((a, b) =>
        sortFn(a, b, column, direction)
      );
      setItems(sortedItems);
    };

    return (
      <Table {...args} onSortByColumn={onSortByColumn}>
        <Table.Header>
          <Table.Column title="Name">
            <Table.Column isRowHeader allowsSorting key="name">
              Name
            </Table.Column>
          </Table.Column>
          <Table.Column title="Information">
            <Table.Column key="type">Type</Table.Column>
            <Table.Column allowsSorting key="date">
              Date Modified
            </Table.Column>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};
