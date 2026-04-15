import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { token } from 'hootsuite-bento';

function NestedThemes() {
  const commonStyles = {
    background: token('hs-global-color-fill-app'),
    color: token('hs-global-color-text-base'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 1 auto',
    position: 'relative' as const,
  };

  return (
    <div
      className="theme-dark"
      style={{
        ...commonStyles,
        width: 400,
        height: 400,
      }}
    >
      <span style={{ position: 'absolute', top: 10, left: 10 }}>
        class=&quot;theme-dark&quot;
      </span>
      <div
        className="theme-light"
        style={{
          ...commonStyles,
          width: 300,
          height: 300,
        }}
      >
        <span style={{ position: 'absolute', top: 10, left: 10 }}>
          class=&quot;theme-light&quot;
        </span>
        <div
          className="theme-brand2020"
          style={{
            ...commonStyles,
            width: 200,
            height: 200,
          }}
        >
          <span style={{ position: 'absolute', top: 10, left: 10 }}>
            class=&quot;theme-brand2020&quot;
          </span>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Bento/Theme',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof NestedThemes>;

export default meta;

type Story = StoryObj<typeof NestedThemes>;

export const NestedThemeClasses: Story = {
  render: () => <NestedThemes />,
};
