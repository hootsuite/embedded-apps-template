import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { NavButton, NavMenuButton } from 'hootsuite-bento';

const meta = {
  title: 'Bento/NavButton',
  component: NavButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    'aria-label': 'Click this button to select it',
    role: 'button',
    isSelected: false,
    label: 'Label',
    hasHint: false,
  },
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof NavButton>;

export const Base: Story = {
  render: props => {
    const [isSelected, setIsSelected] = useState(props.isSelected);

    useEffect(() => {
      setIsSelected(props.isSelected);
    }, [props.isSelected]);

    return (
      <NavButton
        {...props}
        isSelected={isSelected}
        onClick={() => setIsSelected(c => !c)}
      />
    );
  },
  args: {
    iconProps: { name: 'favorite' },
  },
  argTypes: {
    avatarProps: { table: { disable: true } },
  },
};

export const MenuButton: Story = {
  args: {
    'aria-label': 'Menu',
    label: 'Menu',
  },
  render: props => <NavMenuButton {...props} />,
  argTypes: {
    isSelected: { table: { disable: true } },
    role: { table: { disable: true } },
    iconProps: { table: { disable: true } },
    avatarProps: { table: { disable: true } },
  },
};

export const AvatarButton: Story = {
  argTypes: {
    iconProps: { table: { disable: true } },
  },
  args: {
    avatarProps: { src: 'https://picsum.photos/100' },
    label: undefined,
  },
};
