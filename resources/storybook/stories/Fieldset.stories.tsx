import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Fieldset, FormControl, InputText } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Fieldset',
  component: Fieldset,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Base: Story = {
  args: {},
  render: args => (
    <Fieldset {...args}>
      <FormControl>
        <FormControl.Label text="Fieldset" />
        <FormControl.Field>
          <InputText placeholder="Enter some text" />
        </FormControl.Field>
      </FormControl>
      <FormControl>
        <FormControl.Label text="Fieldset" />
        <FormControl.Field>
          <InputText placeholder="Enter some text" />
        </FormControl.Field>
      </FormControl>
    </Fieldset>
  ),
};

export const WithNestedFieldsets: Story = {
  args: {},
  render: () => (
    <Fieldset>
      <FormControl>
        <FormControl.Label
          text="Some label"
          helper={<span>{'(some text passed as label helper)'}</span>}
          description="An additional long description"
        />
        <FormControl.Field>
          <InputText placeholder="Enter some text" />
        </FormControl.Field>
      </FormControl>
      <Fieldset direction="row" distributeEvenly>
        <FormControl>
          <FormControl.Label text="Multiple horizontal fields with distributeEvenly" />
          <FormControl.Field>
            <InputText placeholder="Enter some text" />
          </FormControl.Field>
          <FormControl.Alert
            type="discovery"
            message="Cool people use this field!"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label text="Second column" />
          <FormControl.Field>
            <InputText placeholder="Enter some text" />
          </FormControl.Field>
        </FormControl>
      </Fieldset>
    </Fieldset>
  ),
};
