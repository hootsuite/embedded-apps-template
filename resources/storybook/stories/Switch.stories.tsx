import React, { useState } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import type { SwitchProps } from 'hootsuite-bento';

import { Box, Label, Switch } from 'hootsuite-bento';

const noop = () => {};

const meta = {
  title: 'Bento/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

export const Base: Story = {
  args: { children: 'On/Off' },
  argTypes: { checked: { control: false } },
};

export const WithPredefinedLabel: Story = {
  render: (args: SwitchProps) => (
    <Switch {...args}>
      <Label
        text="On/Off"
        helper={<span>{'(helper message)'}</span>}
        description="You can adjust settings"
      />
    </Switch>
  ),
  argTypes: { checked: { control: false } },
};

export const DisabledSwitch: Story = {
  args: {
    isDisabled: true,
    onChange: noop,
    defaultChecked: true,
    children: 'On/Off',
  },
  argTypes: {
    isDisabled: { control: false },
    checked: { control: false },
  },
};

export const CompactSwitch: Story = {
  args: {
    isCompact: true,
    onChange: noop,
    children: 'On/Off',
  },
  argTypes: {
    isCompact: { control: false },
    checked: { control: false },
  },
};

export const WithAriaLabel: Story = {
  args: {
    onChange: noop,
    'aria-label': 'Wifi On/Off',
  },
  argTypes: { checked: { control: false } },
};

export const InteractiveControlled: Story = {
  render: (args: SwitchProps) => {
    const { defaultChecked: _dc, ...props } = args;
    const [checked, setChecked] = useState(false);

    return (
      <>
        <Switch
          {...props}
          onChange={setChecked}
          checked={checked}
          aria-describedby="custom_descriptionid"
        >
          <Label
            text="On/Off"
            helper={<span>{'(helper message)'}</span>}
            description="You can adjust settings"
          />
        </Switch>
        <span>{`The switch is: ${checked ? 'on' : 'off'}`}</span>
        <p id="custom_descriptionid">
          Toggle the switch to adjust your Wifi settings
        </p>
      </>
    );
  },
  argTypes: {
    checked: { control: false },
    defaultChecked: { control: false },
  },
};

const narrowDecorator: Decorator = Comp => (
  <div style={{ width: 200 }}>
    <Comp />
  </div>
);

export const WithinFixedWidthContainer: Story = {
  args: {
    children: `this is quite a long text, very long indeed!`,
  },
  decorators: [narrowDecorator],
};

export const WithinFixedWidthContainerAndCustomText: Story = {
  args: {
    children: <Box isTruncated>this is quite a long text, very long indeed!</Box>,
  },
  decorators: [narrowDecorator],
};
