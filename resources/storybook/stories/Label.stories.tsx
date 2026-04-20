import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { LabelProps } from 'hootsuite-bento';

import { Box, Label } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { text: 'Subscribe' },
};

export const WithHelper: Story = {
  args: {
    text: 'Subscribe',
    helper: (
      <div style={{ display: 'inline' }}>
        <Box
          display='inline'
          marginRight='hs-sys-spacing-text-to-element-x-small'
        >
          {'(helper message)'}
        </Box>
      </div>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    text: 'Subscribe',
    description: 'An optional string value that labels the element',
  },
};

export const WithHelperAndDescription: Story = {
  args: {
    text: 'Subscribe',
    helper: (
      <div style={{ display: 'inline' }}>
        <Box
          display='inline'
          marginRight='hs-sys-spacing-text-to-element-x-small'
        >
          {'(helper message)'}
        </Box>
      </div>
    ),
    description: 'An optional string value that labels the element',
  },
};

export const WithAdditionalInfo: Story = {
  args: {
    text: 'Subscribe',
    helper: (
      <div style={{ display: 'inline' }}>
        <Box
          display='inline'
          marginRight='hs-sys-spacing-text-to-element-x-small'
        >
          {'(helper message)'}
        </Box>
      </div>
    ),
    description: 'An optional string value that labels the element',
    additional: {
      text: 'Additional info title',
      description: 'Additional info description',
    },
  },
};

function SmallerContainer(props: LabelProps) {
  return (
    <div style={{ width: 400 }}>
      <Label {...props} />
    </div>
  );
}

export const WithinFixedWidthContainer: Story = {
  render: (args: LabelProps) => <SmallerContainer {...args} />,
  args: {
    text: `this is quite a long text, very long indeed, very long indeed`,
    helper: (
      <div style={{ display: 'inline' }}>
        <Box
          display='inline'
          marginRight='hs-sys-spacing-text-to-element-x-small'
        >
          {'(this is quite a long helper message, very long indeed)'}
        </Box>
      </div>
    ),
    description:
      'this is quite a long description, very long indeed very long indeed very long indeed very long indeed very long indeed!',
    additional: {
      text: 'Additional info title very long',
      description: 'Additional info description',
    },
  },
};
