import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, Tooltip } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Tooltip',
  component: Tooltip.Content,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story => (
      <Tooltip.Provider>
        <Button>Confirm</Button>
        <Story />
      </Tooltip.Provider>
    )) as Decorator,
  ],
} satisfies Meta<typeof Tooltip.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { children: 'Confirming the action' },
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
    },
    children: { description: "The tooltip's content" },
  },
};
