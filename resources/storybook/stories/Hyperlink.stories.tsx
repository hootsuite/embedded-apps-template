import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { HyperlinkProps } from 'hootsuite-bento';
import Icon from '@fp-icons/icon-base';
import { fn } from 'storybook/test';

import { Box, Hyperlink } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Hyperlink',
  component: Hyperlink,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'The visual label' },
    isExternalLink: { control: 'boolean' },
    icon: {
      options: ['None', 'Example'],
      mapping: {
        None: undefined,
        Example: { name: 'favorite' },
      },
    },
  },
} satisfies Meta<typeof Hyperlink>;

export default meta;
type Story = StoryObj<typeof meta>;

const href = 'https://example.com';

export const Base: Story = {
  args: { href, children: 'Example link' },
};

export const TextWithIcon: Story = {
  args: { href, children: 'Example link', icon: { name: 'favorite' } },
};

export const ExternalLink: Story = {
  args: { href, children: 'Example link', isExternalLink: true },
};

export const DisabledLink: Story = {
  args: {
    href,
    children: 'Example link',
    isExternalLink: true,
    isDisabled: true,
  },
};

export const WithNodeChild: Story = {
  args: {
    href,
    icon: { name: 'favorite' },
    children: (
      <span>
        Lorem ipsum dolor <i>sit</i> amet, consectetur <b>adipiscing</b> elit.
      </span>
    ),
  },
};

export const ClientHandledLink: Story = {
  args: {
    children: 'Client-handled link',
    isExternalLink: true,
    onPress: fn(),
  },
};

export const ImgWithRoleLink: Story = {
  args: {
    children: <Icon name="open_in_new" size={32} fill />,
    onPress: fn(),
    'aria-label': 'Open in new window',
  },
};

function TextWithHyperlinksComponent(args: HyperlinkProps) {
  return (
    <Box as="span" typography="hs-sys-text-base-medium" color="text-base">
      Lorem ipsum dolor <i>sit</i> amet. <Hyperlink {...args} /> More text{' '}
      <Hyperlink {...args} isExternalLink /> end.
    </Box>
  );
}

export const TextWithHyperlinks: Story = {
  render: (args: HyperlinkProps) => <TextWithHyperlinksComponent {...args} />,
  args: { href, children: 'Example link' },
};

export const WithinFixedWidthContainer: Story = {
  args: {
    href,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia augue non neque venenatis.',
  },
  decorators: [
    Comp => (
      <div style={{ width: 200 }}>
        <Comp />
      </div>
    ),
  ],
};

export const InheritsFont: Story = {
  args: {
    href,
    children: "I inherit my parent's typography",
    inheritsFont: true,
  },
  render: function Render(args: HyperlinkProps) {
    return (
      <Box typography="hs-sys-text-base-small" as="p">
        While the surrounding text uses hs-sys-text-base-small typography,{' '}
        <Hyperlink {...args} />.
      </Box>
    );
  },
};

export const InheritsColor: Story = {
  args: {
    href,
    children: "I inherit my parent's color",
    inheritsColor: true,
  },
  render: function Render(args: HyperlinkProps) {
    return (
      <Box backgroundColor="fill-negative" padding="4">
        On a colored background,{' '}
        <Hyperlink {...args} />.
      </Box>
    );
  },
};
