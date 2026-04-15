import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Breadcrumbs } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: props => (
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item href="/" target="_blank" icon={{ name: 'favorite' }}>
        New page
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isDisabled>Disabled</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const WithAction: Story = {
  args: { onAction: fn() },
  render: props => (
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item key={1}>Item 1</Breadcrumbs.Item>
      <Breadcrumbs.Item key={2}>Item 2</Breadcrumbs.Item>
      <Breadcrumbs.Item key={3}>Item 3</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const MoreThan3Items: Story = {
  render: props => (
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item href="/item1" target="_blank">
        Item 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item2" target="_blank">
        Item 2
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item3" target="_blank">
        Item 3
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item4" target="_blank">
        Item 4
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item5" target="_blank">
        Item 5
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};

export const MoreThan3ItemsWithAction: Story = {
  args: { onAction: fn() },
  render: props => (
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item href="/item1" target="_blank" key={1} data={{ test: 1 }}>
        Item 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item2" target="_blank" key={2}>
        Item 2
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item3" target="_blank" key={3}>
        Item 3
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item4" target="_blank" key={4}>
        Item 4
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="/item5" target="_blank" key={5}>
        Item 5
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
};
