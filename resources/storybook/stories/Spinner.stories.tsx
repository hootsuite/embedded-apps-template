import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { SpinnerProps } from 'hootsuite-bento';

import { Flex, Spinner } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio' },
    isInverse: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Inverse: Story = {
  args: { isInverse: true },
  argTypes: { isInverse: { control: 'boolean' } },
};

export const AriaLabel: Story = {
  args: { ariaLabel: 'Loading audience' },
  argTypes: { ariaLabel: { control: 'text' } },
};

function InteractiveControlledSpinnerComponent(args: SpinnerProps) {
  const [isLoading, setLoading] = useState(false);

  return (
    <Flex
      color="text-base"
      typography="hs-sys-text-base-medium"
      gap="hs-sys-spacing-layout-horizontal-between-default"
    >
      <button type="button" onClick={() => setLoading(!isLoading)}>
        Click here to enable/disable spinner:
      </button>
      {isLoading ? <Spinner {...args} /> : <span> Content loaded!</span>}
    </Flex>
  );
}

export const InteractiveControlled: Story = {
  render: (args: SpinnerProps) => (
    <InteractiveControlledSpinnerComponent {...args} />
  ),
};
