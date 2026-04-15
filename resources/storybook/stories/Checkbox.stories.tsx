import React, { useState } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import type { CheckboxProps } from 'hootsuite-bento';

import { Box, Checkbox, Label } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    defaultChecked: { control: false },
    checked: { control: 'boolean' },
    onChange: { control: false },
    isIndeterminate: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    children: { control: false },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  name: 'Using simple text as Checkbox children',
  args: { children: 'Subscribe' },
};

export const WithPredefinedLabel: Story = {
  name: 'Using Label as Checkbox children',
  render: (args: CheckboxProps) => (
    <Checkbox {...args}>
      <Label
        text="Subscribe"
        helper={<span>{'(you know you want to do it)'}</span>}
        description="When the checkbox is toggled on you agree to subscribe to our newsletter"
      />
    </Checkbox>
  ),
  argTypes: {
    checked: { control: false },
    defaultChecked: { control: false },
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultChecked: true,
    children: 'Subscribe',
  },
  argTypes: {
    isDisabled: { control: false },
    checked: { control: false },
  },
};

export const WithoutVisualLabel: Story = {
  name: 'Using aria-label',
  args: { 'aria-label': 'Subscribe to our newsletter' },
  argTypes: { checked: { control: false } },
};

export const WithLabelAndAriaLabel: Story = {
  name: 'Using both regular text and aria-label',
  render: (args: CheckboxProps) => <Checkbox {...args}>Subscribe</Checkbox>,
  args: { 'aria-label': 'Subscribe to our newsletter' },
  argTypes: { checked: { control: false } },
};

export const WithLabelAndAriaLabelledby: Story = {
  name: 'Using both regular text and aria-labelledby',
  render: (args: CheckboxProps) => (
    <>
      <Checkbox {...args}>Subscribe</Checkbox>
      <div id="toBeLabelledById">
        <span>Subscribe to our newsletter</span>
      </div>
    </>
  ),
  args: { 'aria-labelledby': 'toBeLabelledById' },
  argTypes: { checked: { control: false } },
};

export const InteractiveControlled: Story = {
  render: (args: CheckboxProps) => {
    const { defaultChecked: _dc, ...props } = args;
    const [checked, setChecked] = useState(false);
    const checkboxState = checked ? 'checked' : 'unchecked';
    const visualCheckboxState = props.isIndeterminate ? 'indeterminate' : '';

    return (
      <>
        <Checkbox {...props} onChange={setChecked} checked={checked}>
          Subscribe
        </Checkbox>
        <span>{`The checkbox state is: ${checkboxState}${
          visualCheckboxState
            ? ', with indeterminate visual representation'
            : ''
        }`}</span>
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
