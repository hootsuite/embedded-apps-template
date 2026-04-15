import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SkeletonBaseProps } from 'hootsuite-bento';

import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonRectangle,
  SkeletonText,
  token,
} from 'hootsuite-bento';

const meta: Meta<SkeletonBaseProps> = {
  title: 'Bento/Skeleton/SkeletonExamples',
  argTypes: {
    isAnimated: { control: 'boolean' },
  },
  args: { isAnimated: false },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SkeletonBaseProps>;

export const CardContentIsLoading: Story = {
  name: 'Card content is loading',
  render: ({ isAnimated }: SkeletonBaseProps) => (
    <Flex
      as="article"
      width={350}
      maxWidth="100%"
      backgroundColor="fill-base"
      flexDirection="column"
      gap="hs-sys-spacing-horizontal-to-element-medium"
      padding="hs-sys-spacing-horizontal-to-element-medium"
      attributes={{
        style: {
          boxShadow: `0 0 0 1px ${token('hs-global-color-border-subtle')}`,
        },
      }}
    >
      <Flex
        alignItems="center"
        gap="hs-sys-spacing-horizontal-to-element-medium"
      >
        <SkeletonCircle isAnimated={isAnimated} />
        <Box flex="1">
          <SkeletonText isAnimated={isAnimated} />
        </Box>
      </Flex>
      <Flex
        flexDirection="column"
        gap="hs-sys-spacing-vertical-to-element-x-small"
      >
        <SkeletonText isAnimated={isAnimated} />
        <SkeletonText width={220} isAnimated={isAnimated} />
      </Flex>
      <SkeletonRectangle height={200} isAnimated={isAnimated} />
      <SkeletonRectangle height={100} width={220} isAnimated={isAnimated} />
      <span
        style={{
          position: 'absolute',
          top: 'auto',
          overflow: 'hidden',
          width: '1px',
          height: '1px',
          whiteSpace: 'nowrap',
        }}
      >
        The card content is still loading
      </span>
    </Flex>
  ),
};
