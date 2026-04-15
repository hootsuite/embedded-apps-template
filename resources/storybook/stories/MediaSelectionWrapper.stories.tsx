import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Media, MediaSelectionWrapper } from 'hootsuite-bento';

const meta = {
  title: 'Bento/MediaSelectionWrapper',
  component: MediaSelectionWrapper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MediaSelectionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { value: [], onChange: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const log = fn();
    return (
      <MediaSelectionWrapper
        {...args}
        value={args.value}
        onChange={value => {
          updateArgs({ value: [...value] });
          log(value);
        }}
      >
        <Media
          src="https://picsum.photos/seed/100/200/300"
          alt="This describes the contents of the image"
          value="1"
          aria-label="This describes what is being selected for item 1"
        />
        <Media
          src="https://picsum.photos/seed/101/200/300"
          alt="This describes the contents of the image"
          value="2"
          aria-label="This describes what is being selected for item 2"
        />
      </MediaSelectionWrapper>
    );
  },
};
