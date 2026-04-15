import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Box } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Layout/Box',
  component: Box,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    color: 'text-base',
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: args => (
    <Box backgroundColor="fill-app" overflow="auto">
      <Box
        {...args}
        backgroundColor="border-focus"
        attributes={{ style: { outline: '1px solid' } }}
      >
        <Box padding="2" backgroundColor="fill-discovery">
          Child
        </Box>
      </Box>
    </Box>
  ),
  args: {
    margin: '4',
    padding: '4',
  },
  argTypes: {
    position: { table: { disable: true } },
    margin: { control: 'inline-radio' },
    padding: { control: 'inline-radio' },
  },
};

const overflowOptions = [
  undefined,
  'auto',
  'inherit',
  'initial',
  'revert',
  'unset',
  'clip',
  'hidden',
  'scroll',
  'visible',
] as const;

export const Layout: Story = {
  render: args => (
    <Box
      backgroundColor="fill-app"
      overflow="auto"
      position="relative"
      width={400}
      height={400}
    >
      <Box
        {...args}
        backgroundColor="border-focus"
        padding="4"
        margin="4"
        top={10}
        left={10}
        width={100}
        height={100}
        attributes={{ style: { outline: '1px solid' } }}
      >
        <Box
          padding="2"
          backgroundColor="fill-discovery"
          width={200}
          height={200}
        >
          Child
        </Box>
      </Box>
    </Box>
  ),
  args: {
    position: 'static',
    overflow: undefined,
    overflowX: undefined,
    overflowY: undefined,
  },
  argTypes: {
    position: { control: 'inline-radio' },
    overflow: {
      control: 'inline-radio',
      options: overflowOptions,
    },
    overflowX: { control: 'inline-radio', options: overflowOptions },
    overflowY: { control: 'inline-radio', options: overflowOptions },
  },
};

export const Color: Story = {
  args: {
    children: 'Box',
    color: 'text-positive',
    backgroundColor: 'fill-positive',
    padding: '6',
  },
};

export const Inline: Story = {
  args: {
    display: 'inline',
    children: 'Inline',
    backgroundColor: 'fill-warning',
    padding: '2',
    marginInline: '3',
  },
  render: args => (
    <Box color="text-base">
      <span>Before</span>
      <Box {...args} />
      <span>After</span>
    </Box>
  ),
};

export const Typography: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
    as: 'h3',
    typography: 'hs-sys-title-subsection',
  },
};

export const IsTruncated: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
    maxWidth: 150,
    isTruncated: true,
  },
};

export const Border: Story = {
  args: {
    borderRadius: '4',
  },
  render: args => (
    <Box backgroundColor="border-focus" padding="4">
      <Box {...args} backgroundColor="fill-app" padding="4">
        Border radius: &quot;{args.borderRadius}&quot;
      </Box>
    </Box>
  ),
};

export const Attributes: Story = {
  args: {
    children: 'Box with attributes',
    attributes: { 'data-dap-target': 'tour-guide-id' },
  },
};

export const AsUnorderedList: Story = {
  render: () => (
    <Box
      as="ul"
      typography="hs-sys-text-base-medium"
      paddingLeft="6"
      attributes={{ style: { listStyleType: 'disc' } }}
    >
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </Box>
  ),
};
