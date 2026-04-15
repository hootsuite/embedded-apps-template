import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { PostCardProps } from 'hootsuite-bento';

import { Media, MediaGrid, PostCard } from 'hootsuite-bento';

const profileExample: NonNullable<PostCardProps['profile']> = {
  name: 'Bento',
  metadata: 'Design system',
  avatarProps: {
    src: 'https://picsum.photos/100',
    badge: 'positive',
  },
};

const textExample = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt libero purus.',
};

const singleMediaExample = {
  items: (
    <Media
      src="https://picsum.photos/600"
      alt="mock media"
      objectFit="cover"
      style={{ width: '100%', height: '100%' }}
    />
  ),
};

const multipleMediaExample = {
  items: (
    <MediaGrid
      media={[
        { id: '1', src: 'https://picsum.photos/400', alt: 'mock media' },
        { id: '2', src: 'https://picsum.photos/401', alt: 'mock media' },
        { id: '3', src: 'https://picsum.photos/402', alt: 'mock media' },
        { id: '4', src: 'https://picsum.photos/403', alt: 'mock media' },
        { id: '5', src: 'https://picsum.photos/404', alt: 'mock media' },
      ]}
      objectFit="cover"
      style={{ width: '100%', height: '100%' }}
      aria-label="Post media gallery"
    />
  ),
};

const example = {
  items: [{ src: 'https://picsum.photos/600', alt: 'example' }],
};

const actionsCTAExample: PostCardProps['actions'] = [
  { variant: 'secondary', onPress: () => {}, text: 'Cancel' },
  { variant: 'primary', onPress: () => {}, text: 'Save' },
];

const actionsIconExample: PostCardProps['actions'] = [
  {
    variant: 'secondary',
    onPress: () => {},
    iconProps: { name: 'rocket' },
    'aria-label': 'Cancel',
    tooltipContent: 'Cancel',
  },
  {
    variant: 'primary',
    onPress: () => {},
    iconProps: { name: 'rocket_launch' },
    'aria-label': 'Save',
    tooltipContent: 'Save',
  },
];

const metricsExample: PostCardProps['metrics'] = [
  {
    iconProps: { name: 'mark_chat_unread' },
    tooltipContent: 'The value of comment is unknown',
    'aria-label': 'This metric says that the number of comments is unknown yet',
  },
  {
    iconProps: { name: 'share' },
    value: '999',
    tooltipContent: 'The number of shares',
    'aria-label': 'This metric says that the number of shares is 999',
  },
  {
    iconProps: { name: 'favorite_border' },
    value: '999k',
    tooltipContent: '999 thousand',
    'aria-label': 'This metric says that the number of likes is 999 thousand',
  },
  {
    iconProps: { name: 'trending_up' },
    value: '999M',
    tooltipContent: '999 million',
    'aria-label': 'This metric says that the number of views is 999 million',
  },
];

const meta = {
  title: 'Bento/PostCard',
  component: PostCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    profile: {
      options: [
        'Example',
        'LoadingAvatar',
        'LoadingData',
        'LoadingAvatarAndData',
      ],
      mapping: {
        Example: profileExample,
        LoadingAvatar: { ...profileExample, avatarProps: { isLoading: true } },
        LoadingData: {
          isLoading: true,
          avatarProps: profileExample.avatarProps,
        },
        LoadingAvatarAndData: {
          isLoading: true,
          avatarProps: { isLoading: true },
        },
      },
    },
    text: {
      options: ['None', 'Example', 'Loading'],
      mapping: {
        None: undefined,
        Example: textExample,
        Loading: { isLoading: true },
      },
    },
    media: {
      options: [
        'None',
        'Example (Single) - comp-media',
        'Example (Multiple) - comp-media',
        'Example',
        'Loading',
      ],
      mapping: {
        None: undefined,
        'Example (Single) - comp-media': singleMediaExample,
        'Example (Multiple) - comp-media': multipleMediaExample,
        Example: example,
        Loading: { isLoading: true },
      },
    },
    actions: {
      options: ['None', 'Example (CTA)', 'Example (IconButton)'],
      mapping: {
        None: undefined,
        'Example (CTA)': actionsCTAExample,
        'Example (IconButton)': actionsIconExample,
      },
    },
    metrics: {
      options: ['None', 'Example'],
      mapping: {
        None: undefined,
        Example: metricsExample,
      },
    },
  },
  args: {
    profile: profileExample,
    text: textExample,
    media: singleMediaExample,
    actions: actionsCTAExample,
    metrics: metricsExample,
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: props => <PostCard {...props} media={singleMediaExample} />,
};

export const HandleUserInteractions: Story = {
  render: props => (
    <PostCard {...props} media={multipleMediaExample} onPress={() => {}} />
  ),
};

export const WithCustomDimensions: Story = {
  render: props => (
    <PostCard
      {...props}
      media={example}
      style={{ height: '539px', width: '550px' }}
    />
  ),
};
