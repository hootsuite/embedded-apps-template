import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { TabsProps } from 'hootsuite-bento';

import { Tab, Tabs } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    isSmall: false,
    onlyShowIcon: false,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Base: Story = {
  render: (props: TabsProps) => (
    <Tabs {...props}>
      <Tab key={1} title="First tab" icon={{ name: 'favorite_border' }}>
        <h1>Content of the first tab</h1>
      </Tab>
      <Tab key={2} title="Second tab">
        <h1>Content of the second tab</h1>
      </Tab>
      <Tab key={3} title="Third tab">
        <h1>Content of the third tab</h1>
      </Tab>
    </Tabs>
  ),
};

export const WithOnDemandContent: Story = {
  render: function Render(props: TabsProps) {
    const [content, setContent] = useState('');

    const onSelectionChange = useCallback((key: React.Key) => {
      setContent(`Content: ${String(key)}`);
    }, []);

    return (
      <Tabs
        {...props}
        onDemandContent={<h1>{content}</h1>}
        onSelectionChange={onSelectionChange}
      >
        <Tab key={1} title="First tab" />
        <Tab key={2} title="Second tab" />
        <Tab key={3} title="Third tab" />
      </Tabs>
    );
  },
};

export const WithCustomLabel: Story = {
  render: (props: TabsProps) => (
    <Tabs {...props} onlyShowIcon isSmall>
      <Tab key={1} title="Home" icon={{ name: 'home' }}>
        <h1>Home content</h1>
      </Tab>
      <Tab key={2} title="Search" icon={{ name: 'search' }}>
        <h1>Search content</h1>
      </Tab>
      <Tab key={3} title="Settings" icon={{ name: 'settings' }}>
        <h1>Settings content</h1>
      </Tab>
    </Tabs>
  ),
};
