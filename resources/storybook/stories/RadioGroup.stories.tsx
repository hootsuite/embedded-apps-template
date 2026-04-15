import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { InputRadio, Label, RadioGroup } from 'hootsuite-bento';

const meta = {
  title: 'Bento/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  name: 'Using simple text as InputRadio children',
  args: {
    'aria-label': 'Basic Radio Group example',
    defaultValue: '1',
    onChange: fn(),
    children: [
      <InputRadio key={0} value="1">
        item 1
      </InputRadio>,
      <InputRadio key={1} value="2">
        item 2
      </InputRadio>,
    ],
  },
};

export const WithPredefinedLabel: Story = {
  name: 'Using Label as InputRadio children',
  args: {
    'aria-label': 'Using Label as InputRadio children',
    defaultValue: '1',
    onChange: fn(),
    children: [
      <InputRadio key={0} value="1">
        <Label
          text="Item 1 label"
          helper={<span>{'(helper message)'}</span>}
          description="Helpful description about item 1"
        />
      </InputRadio>,
      <InputRadio key={1} value="2">
        <Label
          text="Item 2 label"
          helper={<span>{'(helper message)'}</span>}
          description="Helpful description about item 2"
        />
      </InputRadio>,
    ],
  },
};
