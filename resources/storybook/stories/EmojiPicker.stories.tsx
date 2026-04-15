import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import type { EmojiClickData } from 'hootsuite-bento';

import { Box, EmojiPicker } from 'hootsuite-bento';

const meta = {
  title: 'Bento/EmojiPicker',
  component: EmojiPicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ height: 500 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { onEmojiSelected: fn() },
  render: function Render(args) {
    const [chosenEmoji, setChosenEmoji] = React.useState('');

    const onClick = (data: EmojiClickData) => {
      setChosenEmoji(data.emoji);
    };

    return (
      <div>
        <EmojiPicker {...args} onEmojiSelected={onClick} />
        <Box typography="hs-sys-text-strong-medium" color="text-base">
          {chosenEmoji ? `Your Emoji: ${chosenEmoji}` : 'No emoji selected'}
        </Box>
      </div>
    );
  },
};
