import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DisplayToggleProps } from 'hootsuite-bento';

import { DisplayToggle, token } from 'hootsuite-bento';

const meta = {
  title: 'Bento/DisplayToggle',
  component: DisplayToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DisplayToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const textColor = { color: token('hs-global-color-text-base') };

export const Base: Story = {
  args: {
    initialVisibleItems: 1,
    expandedTitle: 'Hide',
    collapsedTitle: 'Read more',
    defaultExpanded: false,
    children: [
      <p style={textColor} key="1">
        This is the first item
      </p>,
      <p style={textColor} key="2">
        This is the second item
      </p>,
      <p style={textColor} key="3">
        This is the third item
      </p>,
    ],
  },
};

export const InitialVisibleItems: Story = {
  args: {
    initialVisibleItems: 2,
    expandedTitle: 'Hide',
    collapsedTitle: 'Read more',
    defaultExpanded: false,
    children: [
      <li style={textColor} key="1">
        First list item, always shown.
      </li>,
      <li style={textColor} key="2">
        Second list item, also initially shown because of initialVisibleItems=2.
      </li>,
      <li style={textColor} key="3">
        Third list item.
      </li>,
    ],
  },
};

export const DisabledToggle: Story = {
  args: {
    initialVisibleItems: 0,
    collapsedTitle: 'Disabled Display Toggle',
    isDisabled: true,
    children: [
      <p style={textColor} key="1">
        Content behind disabled display toggle.
      </p>,
      <p style={textColor} key="2">
        Content behind disabled display toggle.
      </p>,
    ],
  },
};

export const DefaultExpanded: Story = {
  args: {
    initialVisibleItems: 0,
    expandedTitle: 'Hide',
    collapsedTitle: 'Read more',
    defaultExpanded: true,
    children: [
      <li style={textColor} key="1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </li>,
      <li style={textColor} key="2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </li>,
      <li style={textColor} key="3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </li>,
    ],
  },
};

const TAG_STYLE: React.CSSProperties = {
  display: 'flex',
  height: '48px',
  padding: '0px 16px',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '8px',
  border: '1px solid  #EBEBEB',
  color: token('hs-global-color-text-base'),
};

export const InlineHashtagsExample: Story = {
  args: {
    initialVisibleItems: 3,
    expandedTitle: 'Show Less',
    collapsedTitle: 'Show More',
    children: [
      <span style={TAG_STYLE} key="1">
        #React
      </span>,
      <span style={TAG_STYLE} key="2">
        #JavaScript
      </span>,
      <span style={TAG_STYLE} key="3">
        #WebDev
      </span>,
      <span style={TAG_STYLE} key="4">
        #UIUX
      </span>,
      <span style={TAG_STYLE} key="5">
        #Accessibility
      </span>,
      <span style={TAG_STYLE} key="6">
        #Frontend
      </span>,
    ],
  },
  render: args => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        gap: '16px',
        alignSelf: 'stretch',
        flexWrap: 'wrap',
      }}
    >
      <DisplayToggle {...args} />
    </div>
  ),
};

export const ControlledStateByParent: Story = {
  args: {
    children: [
      <li style={textColor} key="1">
        First list item, always shown.
      </li>,
      <li style={textColor} key="2">
        Second list item.
      </li>,
      <li style={textColor} key="3">
        Third list item.
      </li>,
    ],
    isExpanded: false,
  },
  render: function Render(args: DisplayToggleProps) {
    const [isExpanded, setIsExpanded] = useState(args.isExpanded ?? false);

    return (
      <DisplayToggle
        {...args}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(e => !e)}
      >
        {args.children}
      </DisplayToggle>
    );
  },
};
