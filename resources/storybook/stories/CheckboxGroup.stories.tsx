import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormControlGroup,
  Label,
} from 'hootsuite-bento';

const meta = {
  title: 'Bento/CheckboxGroup',
  component: CheckboxGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: { type: 'number', min: 1, max: 5 } },
    children: { control: false },
  },
  args: { columns: 1 },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Base: Story = {
  args: { columns: 1 },
  render: args => (
    <FormControlGroup>
      <FormControl.Label text="Select your preferences" />
      <FormControl.Field>
        <CheckboxGroup {...args} aria-label="Select your preferences">
          <Checkbox defaultChecked>
            <Label text="Option 1" />
          </Checkbox>
          <Checkbox>
            <Label text="Option 2" />
          </Checkbox>
          <Checkbox>
            <Label text="Option 3" />
          </Checkbox>
        </CheckboxGroup>
      </FormControl.Field>
    </FormControlGroup>
  ),
};

export const WithMultipleColumns: Story = {
  args: { columns: 3 },
  render: function WithMultipleColumns(args) {
    return (
      <FormControlGroup>
        <FormControl.Label text="Select multiple options" />
        <FormControl.Field>
          <CheckboxGroup {...args} aria-label="Select multiple options">
            <Checkbox>
              <Label text="Option 1" />
            </Checkbox>
            <Checkbox>
              <Label text="Option 2" />
            </Checkbox>
            <Checkbox>
              <Label text="Option 3" />
            </Checkbox>
            <Checkbox>
              <Label text="Option 4" />
            </Checkbox>
            <Checkbox>
              <Label text="Option 5" />
            </Checkbox>
            <Checkbox>
              <Label text="Option 6" />
            </Checkbox>
          </CheckboxGroup>
        </FormControl.Field>
      </FormControlGroup>
    );
  },
};
