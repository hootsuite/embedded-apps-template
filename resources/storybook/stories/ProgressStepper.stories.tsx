import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ProgressStepperProps } from 'hootsuite-bento';

import { Button, Flex, ProgressStepper } from 'hootsuite-bento';

const meta = {
  title: 'Bento/ProgressStepper',
  component: ProgressStepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    totalSteps: { control: { type: 'number', min: 1 } },
    currentStep: { control: { type: 'number', min: 0 } },
  },
} satisfies Meta<typeof ProgressStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { totalSteps: 5, currentStep: 1, size: 'medium' },
};

export const WithButtons: Story = {
  args: {
    totalSteps: 5,
    currentStep: 1,
    size: 'medium',
  },
  render: (props: ProgressStepperProps) => {
    const [currentStep, setCurrentStep] = React.useState<number>(
      props.currentStep ?? 0
    );

    const handleNext = () => {
      setCurrentStep(prevStep =>
        prevStep < (props.totalSteps ?? 1) ? prevStep + 1 : prevStep
      );
    };

    const handlePrevious = () => {
      setCurrentStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
    };

    return (
      <Flex
        flexDirection="column"
        gap="hs-sys-spacing-layout-vertical-component-default"
      >
        <ProgressStepper {...props} currentStep={currentStep} />
        <Flex
          justifyContent="center"
          gap="hs-sys-spacing-horizontal-to-element-x-small"
        >
          <Button variant="secondary" onPress={handlePrevious}>
            Previous
          </Button>
          <Button variant="secondary" onPress={handleNext}>
            Next
          </Button>
        </Flex>
      </Flex>
    );
  },
};

export const WithMinimumValues: Story = {
  args: {
    totalSteps: -5,
    currentStep: -1,
    size: 'medium',
  },
  render: (props: ProgressStepperProps) => (
    <ProgressStepper
      {...props}
      totalSteps={props.totalSteps}
      currentStep={props.currentStep}
    />
  ),
};
