import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Fieldset, FormControl, InputText } from 'hootsuite-bento';

const meta = {
  title: 'Bento/FormControl',
  component: FormControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof FormControl>;

export const Base: Story = {
  render: args => (
    <Fieldset>
      {[
        <FormControl key="base" {...args}>
          <FormControl.Label text="Some label" />
          <FormControl.Field>
            <InputText placeholder="Enter some text" />
          </FormControl.Field>
        </FormControl>,
      ]}
    </Fieldset>
  ),
};

export const WithAlert: Story = {
  render: () => (
    <Fieldset>
      {[
        <FormControl key="discovery">
          <FormControl.Label text="Some label" />
          <FormControl.Field>
            <InputText placeholder="Enter some text" />
          </FormControl.Field>
          <FormControl.Alert
            type="discovery"
            message="Cool people use this field!"
          />
        </FormControl>,
        <FormControl key="negative">
          <FormControl.Label text="Some label" />
          <FormControl.Field>
            <InputText placeholder="Enter some text" />
          </FormControl.Field>
          <FormControl.Alert
            type="negative"
            message="Please fill in this field"
          />
        </FormControl>,
      ]}
    </Fieldset>
  ),
};
