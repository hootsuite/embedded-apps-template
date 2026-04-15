import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Box, Button, CardSurface, Flex } from 'hootsuite-bento';

const surfaceDecorator: Decorator = Story => (
  <Box padding="4" backgroundColor="fill-app" color="text-base">
    <Story />
  </Box>
);

const meta = {
  title: 'Bento/CardSurface',
  component: CardSurface,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [surfaceDecorator],
  argTypes: {
    hasPadding: { control: 'boolean' },
    stroke: {
      control: 'inline-radio',
      options: ['none', 'subtle'],
    },
  },
  args: {
    style: {
      width: '300px',
      height: '200px',
    },
  },
} satisfies Meta<typeof CardSurface>;

export default meta;
type Story = StoryObj<typeof CardSurface>;

export const Base: Story = {
  args: {},
  render: args => (
    <Flex gap="4">
      <CardSurface
        style={{ width: '250px', height: '200px' }}
        onPress={fn()}
        {...args}
      >
        move the mouse over us
      </CardSurface>
      <CardSurface
        style={{ width: '250px', height: '200px' }}
        onPress={fn()}
        {...args}
      >
        click me! (or press space/enter when focused)
      </CardSurface>
      <CardSurface
        style={{ width: '250px', height: '200px' }}
        onPress={fn()}
        {...args}
      >
        we can be focused
      </CardSurface>
    </Flex>
  ),
};

export const NonClickableCards: Story = {
  render: args => (
    <Flex gap="4">
      <CardSurface style={{ width: '250px', height: '250px' }} {...args}>
        <Flex flexDirection="column" justifyContent="space-between">
          You use non-clickable cards when you have other interactive elements
          inside the card.
          <br />
          <br />
          The content layout is up to you.
          <Flex justifyContent="end">
            <Button>Click me</Button>
          </Flex>
        </Flex>
      </CardSurface>
      <CardSurface stroke="subtle" style={{ width: '250px', height: '250px' }} {...args}>
        <Flex flexDirection="column" gap="2">
          <Flex justifyContent="end">
            <Button>or click me!</Button>
          </Flex>
          Notice how you can&apos;t focus anymore the whole card, because the
          focus moves between interactive elements
        </Flex>
      </CardSurface>
    </Flex>
  ),
};

export const SelectedCards: Story = {
  args: {},
  render: args => (
    <Flex gap="4">
      <CardSurface
        onPress={fn()}
        style={{ width: '250px', height: '250px' }}
        {...args}
      >
        Not selected
      </CardSurface>
      <CardSurface
        onPress={fn()}
        isSelected
        style={{ width: '250px', height: '250px' }}
        {...args}
      >
        Selected <br />
        (`isSelected` set to `true`)
      </CardSurface>
    </Flex>
  ),
};

export const OptionalPadding: Story = {
  args: {},
  render: args => (
    <CardSurface
      hasPadding={false}
      style={{ width: '250px', height: '250px' }}
      {...args}
    >
      No padding
      <br />
      (`hasPadding` set to `false`)
    </CardSurface>
  ),
};
