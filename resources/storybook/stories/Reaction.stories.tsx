import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import type { ReactionProps } from 'hootsuite-bento';

import { Reaction } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Reaction',
  component: Reaction,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ height: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    totalReactions: { '👍': 5, '❤️': 1, '😂': 2 },
    userReactions: ['👍'],
    onReactionSelected: fn(),
  },
} satisfies Meta<typeof Reaction>;

export default meta;
type Story = StoryObj<typeof Reaction>;

function ReactionWithHooks({
  totalReactions,
  userReactions,
  ...props
}: ReactionProps) {
  const [total, setTotal] = useState(totalReactions);
  const [users, setUsers] = useState(userReactions);

  const onReactionSelected = (reaction: string) => {
    if (!users.includes(reaction)) {
      setUsers([...users, reaction]);
      setTotal({
        ...total,
        [reaction]: (total[reaction] || 0) + 1,
      });
    } else {
      setUsers(users.filter(userReaction => userReaction !== reaction));
      setTotal({
        ...total,
        [reaction]: (total[reaction] || 0) - 1,
      });
    }
  };

  if ('customEmojis' in props && props.customEmojis) {
    return (
      <Reaction
        {...props}
        totalReactions={total}
        userReactions={users}
        onReactionSelected={onReactionSelected}
        customEmojis={props.customEmojis}
      />
    );
  }
  return (
    <Reaction
      {...props}
      totalReactions={total}
      userReactions={users}
      onReactionSelected={onReactionSelected}
    />
  );
}

export const Base: Story = {
  render: args => <ReactionWithHooks {...args} />,
};
