import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Box, Flex } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Layout/Flex',
  component: Flex,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    color: 'text-base',
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonOptions = ['inherit', 'initial', 'revert', 'unset'];

export const Base: Story = {
  render: args => (
    <Flex
      backgroundColor="fill-app"
      padding="4"
      gap="hs-sys-spacing-horizontal-to-element-medium"
      width={400}
      {...args}
    >
      <Box
        paddingBlock="2"
        paddingInline="4"
        backgroundColor="fill-warning"
        borderRadius="pills"
      >
        First child
      </Box>
      <Box
        paddingBlock="2"
        paddingInline="4"
        backgroundColor="fill-warning"
        borderRadius="pills"
      >
        Second child
      </Box>
    </Flex>
  ),
  args: {
    gap: 'hs-sys-spacing-layout-horizontal-component-default',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  argTypes: {
    gap: { control: 'inline-radio' },
    alignItems: {
      control: 'inline-radio',
      options: [
        undefined,
        'center',
        'start',
        'baseline',
        'end',
        'flex-start',
        'flex-end',
        'self-start',
        'self-end',
        'stretch',
        'normal',
        ...commonOptions,
      ],
    },
    justifyContent: {
      control: 'inline-radio',
      options: [
        undefined,
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'left',
        'right',
        'space-around',
        'space-between',
        'space-evenly',
        'stretch',
        'normal',
        ...commonOptions,
      ],
    },
    flexWrap: {
      control: 'inline-radio',
      options: [undefined, 'wrap', 'no-wrap', 'wrap-reverse', ...commonOptions],
    },
    flexDirection: {
      control: 'inline-radio',
      options: [
        undefined,
        'column',
        'column-reverse',
        'row',
        'row-reverse',
        ...commonOptions,
      ],
    },
    borderRadius: {
      control: 'inline-radio',
    },
  },
};
