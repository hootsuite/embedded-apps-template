import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { FeedbackStatus } from 'hootsuite-bento';

const meta = {
  title: 'Bento/FeedbackStatus',
  component: FeedbackStatus,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    statusType: 'success',
    title: 'Upload Complete',
    message: 'Your file has been successfully uploaded.',
    onPrimaryAction: fn(),
    onSecondaryAction: fn(),
  },
} satisfies Meta<typeof FeedbackStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    statusType: 'success',
    title: 'Changes saved',
    message: 'Your changes have been saved successfully.',
    primaryActionLabel: 'Continue',
    secondaryActionLabel: 'View Changes',
  },
};

export const Error: Story = {
  args: {
    statusType: 'error',
    title: 'Unable to save changes',
    message:
      'An error occurred while saving your changes. Please try again or contact support if the problem persists.',
    primaryActionLabel: 'Try Again',
    secondaryActionLabel: 'Contact Support',
  },
};

export const Warning: Story = {
  args: {
    statusType: 'warning',
    title: 'Unsaved changes',
    message:
      'You have unsaved changes that will be lost if you leave this page.',
    primaryActionLabel: 'Stay',
    secondaryActionLabel: 'Leave Anyway',
  },
};

export const Info: Story = {
  args: {
    statusType: 'info',
    title: 'System maintenance',
    message:
      'The system will be undergoing maintenance in 30 minutes. Please save your work.',
    primaryActionLabel: 'Save Work',
    secondaryActionLabel: 'Dismiss',
  },
};
