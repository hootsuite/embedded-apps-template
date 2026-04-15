import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Tag, TagGroup } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { label: 'Static' },
};

export const TagWithWrapper: Story = {
  args: { label: 'Tag' },
  render: args => (
    <TagGroup>
      <Tag {...args} />
      <Tag {...args} />
      <Tag {...args} />
      <Tag {...args} />
      <Tag {...args} />
    </TagGroup>
  ),
};

export const Interactive: Story = {
  args: { label: 'Interactive', onPress: fn() },
};

export const WithCategoricalColor: Story = {
  args: { label: 'With color', color: '1' },
};

export const Dismissible: Story = {
  args: { label: 'Dismissible', onClose: fn() },
};

export const WithIcon: Story = {
  args: { label: 'With icon', iconProps: { name: 'favorite' } },
};

export const DismissibleWithIcon: Story = {
  args: {
    label: 'Dismissible with icon',
    onClose: fn(),
    iconProps: { name: 'favorite' },
  },
};

export const WithAvatar: Story = {
  args: {
    label: 'With avatar',
    avatarProps: {
      name: 'Foo Bar',
      src: 'https://picsum.photos/100',
    },
  },
};
