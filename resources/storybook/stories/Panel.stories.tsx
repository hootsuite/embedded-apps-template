import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';

import { Box, Flex, Panel } from 'hootsuite-bento';

const raisedDecorator: Decorator = Story => (
  <Box padding="4" backgroundColor="fill-raised">
    Surface backgroundColor: &apos;fill-raised&apos;
    <br />
    <br />
    <Story />
  </Box>
);

const baseDecorator: Decorator = Story => (
  <Box padding="4" backgroundColor="fill-base">
    Surface backgroundColor: &apos;fill-base&apos;
    <br />
    <br />
    <Story />
  </Box>
);

const meta = {
  title: 'Bento/Panel',
  component: Panel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    fill: { control: 'inline-radio', options: ['base', 'raised'] },
    stroke: { control: 'inline-radio', options: ['none', 'base', 'subtle'] },
    hasPadding: { control: 'boolean' },
  },
  args: {
    style: {
      width: '150px',
      height: '100px',
    },
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => (
    <Flex gap="4">
      <Panel {...args} fill="base" stroke="none">
        border none
      </Panel>
      <Panel {...args} fill="base" stroke="subtle">
        border subtle
      </Panel>
      <Panel {...args} fill="base" stroke="base">
        border base
      </Panel>
    </Flex>
  ),
  decorators: [raisedDecorator],
};

export const ShowcasePanelsWithBackgroundRaised: Story = {
  render: args => (
    <Flex gap="4">
      <Panel {...args} fill="raised" stroke="none">
        border none
      </Panel>
      <Panel {...args} fill="raised" stroke="subtle">
        border subtle
      </Panel>
      <Panel {...args} fill="raised" stroke="base">
        border base
      </Panel>
    </Flex>
  ),
  decorators: [baseDecorator],
};

export const ShowcasePanelsWithoutPadding: Story = {
  args: {
    hasPadding: false,
    fill: 'base',
    stroke: 'base',
    style: {
      width: '450px',
      height: '150px',
    },
  },
  render: args => (
    <Panel {...args}>
      <div style={{ padding: '8px' }}>
        Child component controls it&apos;s own padding
      </div>
    </Panel>
  ),
};
