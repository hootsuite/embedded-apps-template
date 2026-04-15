import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';
import type { PaginationProps } from 'hootsuite-bento';
import { fn } from 'storybook/test';

import { Pagination } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: { type: 'number', min: 1 } },
    currentPage: { control: { type: 'number', min: 1 } },
    'aria-label': { control: { type: 'text' } },
  },
  args: {
    totalPages: 50,
    currentPage: 1,
    'aria-label': 'Pagination dropdown',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    totalPages: 50,
    currentPage: 1,
    'aria-label': 'Pagination dropdown',
    onPageChange: fn(),
  },
  render: function Render() {
    const [currentArgs, updateArgs] = useArgs<PaginationProps>();
    const log = fn();
    return (
      <Pagination
        {...currentArgs}
        onPageChange={page => {
          log(page);
          updateArgs({ currentPage: page });
        }}
      />
    );
  },
};
