import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { CarouselProps } from 'hootsuite-bento';

import { Box, Carousel, CarouselItem, Media } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    spaceBetweenItems: {
      control: 'text',
      table: { category: 'Layout' },
    },
    scrollPadding: {
      control: 'text',
      table: { category: 'Layout' },
    },
    loop: {
      control: 'inline-radio',
      options: [false, 'infinite', 'native'],
      table: { category: 'Behavior' },
    },
    mouseDragging: { control: 'boolean', table: { category: 'Behavior' } },
    autoplay: { control: 'boolean', table: { category: 'Autoplay' } },
    autoplayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      table: { category: 'Autoplay' },
    },
    hasInternalCounter: { control: 'boolean', table: { category: 'UI Controls' } },
    hasInternalButtons: { control: 'boolean', table: { category: 'UI Controls' } },
  },
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'loop',
        'spaceBetweenItems',
        'scrollPadding',
        'mouseDragging',
        'autoplay',
        'autoplayInterval',
        'hasInternalCounter',
        'hasInternalButtons',
      ],
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

function SampleItem({
  index,
  color = '#e1f5fe',
  height = '200px',
}: {
  index: number;
  color?: string;
  height?: string;
}) {
  return (
    <CarouselItem>
      <Box
        attributes={{
          style: {
            width: '100%',
            height,
            backgroundColor: color,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
          },
        }}
      >
        Item {index + 1}
      </Box>
    </CarouselItem>
  );
}

function generateSampleImages(count: number, baseSize = 800) {
  return Array.from({ length: count }, (_, i) => {
    const variation = i * 50;
    return `https://picsum.photos/${baseSize + variation}/${baseSize - variation}`;
  });
}

export const Base: Story = {
  args: { spaceBetweenItems: '16px' },
  render: (props: CarouselProps) => (
    <Box maxWidth="500px" margin="auto">
      <Carousel {...props}>
        {Array.from({ length: 6 }, (_, i) => (
          <SampleItem
            key={i}
            index={i}
            color={`hsl(${i * 45}, 70%, 85%)`}
            height="300px"
          />
        ))}
      </Carousel>
    </Box>
  ),
};

export const WithMediaComponent: Story = {
  args: { loop: false, spaceBetweenItems: '16px' },
  render: (props: CarouselProps) => {
    const sampleImages = [
      'https://picsum.photos/800/600',
      'https://picsum.photos/600/800',
      'https://picsum.photos/500/500',
      'https://picsum.photos/1200/400',
    ];
    return (
      <Box maxWidth="600px" margin="auto">
        <Carousel {...props}>
          {sampleImages.map((src, i) => (
            <CarouselItem key={i}>
              <Media
                src={src}
                alt={`Sample image ${i + 1}`}
                objectFit="contain"
                style={{ width: '100%', height: '300px' }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    );
  },
};

export const WithInternalControls: Story = {
  args: {
    hasInternalCounter: true,
    hasInternalButtons: true,
    spaceBetweenItems: '16px',
  },
  render: (props: CarouselProps) => {
    const sampleImages = generateSampleImages(7, 800);
    return (
      <Box maxWidth="500px" margin="auto">
        <Carousel {...props}>
          {sampleImages.map((src, i) => (
            <CarouselItem key={i}>
              <Media
                src={src}
                alt={`Sample image ${i + 1}`}
                style={{ width: '100%', height: '350px' }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    );
  },
};

export const InternalCounterExternalButtons: Story = {
  args: {
    hasInternalCounter: true,
    hasInternalButtons: false,
    spaceBetweenItems: '16px',
  },
  render: (props: CarouselProps) => {
    const sampleImages = generateSampleImages(5, 750);
    return (
      <Box maxWidth="500px" margin="auto">
        <Carousel {...props}>
          {sampleImages.map((src, i) => (
            <CarouselItem key={i}>
              <Media
                src={src}
                alt={`Sample image ${i + 1}`}
                style={{ width: '100%', height: '250px' }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    );
  },
};

export const InternalButtonsExternalCounter: Story = {
  args: {
    hasInternalCounter: false,
    hasInternalButtons: true,
    spaceBetweenItems: '16px',
  },
  render: (props: CarouselProps) => {
    const sampleImages = generateSampleImages(8, 700);
    return (
      <Box maxWidth="500px" margin="auto">
        <Carousel {...props}>
          {sampleImages.map((src, i) => (
            <CarouselItem key={i}>
              <Media
                src={src}
                alt={`Sample image ${i + 1}`}
                style={{ width: '100%', height: '250px' }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    );
  },
};

export const InfiniteLoop: Story = {
  args: {
    loop: 'infinite',
    spaceBetweenItems: '16px',
    'aria-label': 'Infinite Loop',
  },
  render: (props: CarouselProps) => {
    const sampleImages = generateSampleImages(6, 850);
    return (
      <Box maxWidth="500px" margin="auto">
        <Carousel {...props}>
          {sampleImages.map((src, i) => (
            <CarouselItem key={i}>
              <Media
                src={src}
                alt={`Sample image ${i + 1}`}
                style={{ width: '100%', height: '300px' }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    );
  },
};

export const AutoPlay: Story = {
  args: { autoplay: true, spaceBetweenItems: '16px' },
  render: (props: CarouselProps) => {
    const sampleImages = generateSampleImages(5, 900);
    return (
      <Box maxWidth="500px" margin="auto">
        <Carousel {...props}>
          {sampleImages.map((src, i) => (
            <CarouselItem key={i}>
              <Media
                src={src}
                alt={`Sample image ${i + 1}`}
                style={{ width: '100%', height: '300px' }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </Box>
    );
  },
};
