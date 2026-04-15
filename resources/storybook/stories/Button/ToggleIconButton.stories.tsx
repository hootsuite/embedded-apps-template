import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ToggleIconButtonProps } from 'hootsuite-bento';
import { fn } from 'storybook/test';

import { Flex, ToggleIconButton } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Button/ToggleIconButton',
  component: ToggleIconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    size: { control: 'inline-radio' },
    iconProps: { control: 'object' },
    isSelectedIconProps: { control: 'object' },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    onPress: { control: false },
    onClick: { control: false },
    onChange: { control: false },
    'aria-current': { control: 'text' },
  },
  args: {
    iconProps: { name: 'play_arrow' },
    isSelectedIconProps: { name: 'pause', fill: true },
    'aria-label': 'Click this button to trigger an action',
  },
} satisfies Meta<typeof ToggleIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { onPress: fn() },
};

function InteractiveControlledToggleIconButtonComponent(
  args: ToggleIconButtonProps
) {
  const { defaultSelected: _defaultSelected, ...props } = args;
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Flex
      flexDirection="column"
      gap="hs-sys-spacing-vertical-to-element-small"
      alignItems="flex-start"
    >
      <ToggleIconButton
        {...props}
        isSelected={isSelected}
        onChange={setIsSelected}
      />
      <p>{`The icon toggle button is: ${isSelected ? 'on' : 'off'}`}</p>
    </Flex>
  );
}

export const InteractiveControlled: Story = {
  render: (args: ToggleIconButtonProps) => (
    <InteractiveControlledToggleIconButtonComponent {...args} />
  ),
  args: {
    onPress: fn(),
  },
  argTypes: {
    isSelected: { control: false },
    defaultSelected: { control: false },
  },
};
