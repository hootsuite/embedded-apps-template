import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  FormControl,
  Hyperlink,
  InputText,
} from 'hootsuite-bento';

const meta = {
  title: 'Bento/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    allowsMultipleExpanded: { control: 'boolean' },
    isMultiline: { control: 'boolean' },
    defaultExpandedKeys: { control: 'object' },
    hasLastSeparator: {
      control: 'boolean',
      description: 'If false, the last item will not have a bottom border.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    allowsMultipleExpanded: false,
    isMultiline: false,
    defaultExpandedKeys: [],
    hasLastSeparator: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="item-1" title="Accordion Item 1">
        This is the content of Accordion Item 1. It has enough text to demonstrate the truncation
        and expand features of the Accordion component.
      </AccordionItem>
      <AccordionItem
        id="item-2"
        title="Accordion Item 2 with a long title to see how it fits in the item and that creates a second line"
      >
        This is the content of Accordion Item 2, which is longer and tests how the Accordion handles
        text overflow.
      </AccordionItem>
      <AccordionItem id="item-3" title="Accordion Item 3">
        This is the content of Accordion Item 3.
      </AccordionItem>
      <AccordionItem id="item-4" title="Accordion Item 4">
        This is the content of Accordion Item 4, with just enough text to see the truncate text
        functionality.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithMultiline: Story = {
  args: {
    allowsMultipleExpanded: false,
    isMultiline: true,
    defaultExpandedKeys: [],
    hasLastSeparator: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="item-1" title="Accordion Item 1">
        This is the content of Accordion Item 1. It has enough text to demonstrate the truncation
        and expand features of the Accordion component.
      </AccordionItem>
      <AccordionItem id="item-2" title="Accordion Item 2">
        This is the content of Accordion Item 2, which is longer and tests how the Accordion handles
        text overflow.
      </AccordionItem>
      <AccordionItem id="item-3" title="Accordion Disabled Item 3" isDisabled>
        This is the content of Accordion Item 3.
      </AccordionItem>
      <AccordionItem id="item-4" title="Accordion Item 4">
        This is the content of Accordion Item 4, with just enough text to see the truncate text
        functionality.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithMultipleExpandedItems: Story = {
  args: {
    allowsMultipleExpanded: true,
    isMultiline: false,
    defaultExpandedKeys: ['item-1', 'item-5'],
    hasLastSeparator: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="item-1" title="Accordion Item 1">
        This is the content of Accordion Item 1. It has enough text to demonstrate the truncation
        and expand features of the Accordion component.
      </AccordionItem>
      <AccordionItem id="item-2" title="Accordion Item 2">
        This is the content of Accordion Item 2, which is longer and tests how the Accordion handles
        text overflow.
      </AccordionItem>
      <AccordionItem id="item-3" title="Accordion Disabled Item 3" isDisabled>
        This is the content of Accordion Item 3, which is longer and tests how the Accordion handles
        text overflow.
      </AccordionItem>
      <AccordionItem
        id="item-4"
        title="Accordion Item 4 with a long title to see how it fits in the item and that creates a second line"
      >
        This is the content of Accordion Item 4, with just enough text to see the truncate text
        functionality.
      </AccordionItem>
      <AccordionItem id="item-5" title="Accordion Item 5">
        This is the content of Accordion Item 5, with just enough text to see the truncate text
        functionality.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  args: {
    allowsMultipleExpanded: false,
    isMultiline: false,
    defaultExpandedKeys: [],
    hasLastSeparator: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="item-1" iconName="favorite" title="Accordion Item 1">
        This is the content of Accordion Item 1. It has enough text to demonstrate the truncation
        and expand features of the Accordion component.
      </AccordionItem>
      <AccordionItem id="item-2" iconName="agriculture" title="Accordion Item 2">
        This is the content of Accordion Item 2, which is longer and tests how the Accordion handles
        text overflow.
      </AccordionItem>
      <AccordionItem id="item-3" iconName="airwave" title="Accordion Disabled Item 3" isDisabled>
        This item is disabled.
      </AccordionItem>
      <AccordionItem
        id="item-4"
        iconName="agriculture"
        title="Accordion Item 4 with a long title to see how it fits in the item and that creates a second line"
      >
        This is the content of Accordion Item 4, with just enough text to see the truncate text
        functionality.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithInteractiveContent: Story = {
  args: {
    allowsMultipleExpanded: false,
    isMultiline: false,
    defaultExpandedKeys: [],
    hasLastSeparator: false,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id="item-1" title="Accordion Item 1">
        <div style={{ paddingTop: 10 }}>
          <FormControl>
            <FormControl.Label text="Some label" />
            <FormControl.Field>
              <InputText placeholder="Enter some text" />
            </FormControl.Field>
          </FormControl>
        </div>
      </AccordionItem>
      <AccordionItem
        id="item-2"
        title="Accordion Item 2 with a long title to see how it fits in the item and that creates a second line"
      >
        Accordion content with an interactive checkbox group.
        <div style={{ paddingTop: 10 }}>
          <CheckboxGroup>
            <Checkbox defaultChecked>Option one</Checkbox>
            <Checkbox>Option two</Checkbox>
            <Checkbox isDisabled>Disabled option</Checkbox>
          </CheckboxGroup>
        </div>
      </AccordionItem>
      <AccordionItem id="item-3" title="Accordion Item 3" iconName="agriculture">
        This is the content of Accordion Item 3, which demonstrates rendering text and hyperlink
        components.
        <br />
        <Hyperlink href="https://google.com" isExternalLink>
          Visit Example.com
        </Hyperlink>
        <br />
        <Hyperlink href="https://google.com" isExternalLink icon={{ name: 'favorite' }}>
          Storybook Documentation
        </Hyperlink>
      </AccordionItem>
    </Accordion>
  ),
};
