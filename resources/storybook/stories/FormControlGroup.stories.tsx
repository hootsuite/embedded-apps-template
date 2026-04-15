import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormControlGroup,
  InputRadio,
  RadioGroup,
} from 'hootsuite-bento';

const meta = {
  title: 'Bento/FormControlGroup',
  component: FormControlGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FormControlGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
  render: args => (
    <FormControlGroup {...args}>
      <FormControl.Label
        text="Some label"
        helper="Here's some help!"
        description="And a description"
      />
      <FormControl.Field>
        <RadioGroup defaultValue="1" onChange={fn()}>
          <InputRadio value="1">
            <FormControl.Label text="label 1" />
          </InputRadio>
          <InputRadio value="2">
            <FormControl.Label text="label 2" />
          </InputRadio>
          <InputRadio value="3">
            <FormControl.Label text="label 3" />
          </InputRadio>
        </RadioGroup>
      </FormControl.Field>
    </FormControlGroup>
  ),
};

export const WithAlert: Story = {
  args: {},
  render: () => (
    <FormControlGroup>
      <FormControl.Label text="Some label" />
      <FormControl.Field>
        <CheckboxGroup>
          <Checkbox>
            <FormControl.Label text="checkbox 1" />
          </Checkbox>
          <Checkbox>
            <FormControl.Label text="checkbox 2" />
          </Checkbox>
          <Checkbox>
            <FormControl.Label text="checkbox 3" />
          </Checkbox>
        </CheckboxGroup>
      </FormControl.Field>
      <FormControl.Alert
        type="negative"
        message="You must select at least one option"
      />
    </FormControlGroup>
  ),
};
