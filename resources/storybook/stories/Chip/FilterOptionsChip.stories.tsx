import React, { useState } from 'react';
import type { Key } from '@react-types/shared';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FilterOptionsChip, Flex, token } from 'hootsuite-bento';

// Multi `selectionMode` works at runtime; bento overloads type it as single-only.
const FilterOptionsChipMulti = FilterOptionsChip as any;

const meta = {
  title: 'Bento/Chip/FilterOptionsChip',
  component: FilterOptionsChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onSelectionChange: { control: false },
  },
  args: { title: 'Select' },
} satisfies Meta<typeof FilterOptionsChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: function Render(args) {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(
      (args.selectedKeys as string[] | undefined) ?? ['ad']
    );

    return (
      <Flex flexDirection="row" gap="3" alignItems="center">
        <FilterOptionsChip
          {...args}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => {
            if (keys instanceof Set) {
              setSelectedKeys([...keys].map(String));
            }
          }}
        >
          <FilterOptionsChip.Item key="ad">Andorra</FilterOptionsChip.Item>
          <FilterOptionsChip.Item key="ar">Argentina</FilterOptionsChip.Item>
          <FilterOptionsChip.Item key="ca">Canada</FilterOptionsChip.Item>
        </FilterOptionsChip>
        <h4 style={{ color: token('hs-comp-chip-color-text'), margin: 0 }}>
          Selected Country: <strong>{selectedKeys.join(', ')}</strong>
        </h4>
      </Flex>
    );
  },
  args: {
    selectedKeys: ['ad'],
    chipTooltipText: 'Selected Countries',
    title: 'Controlled Single Select',
  },
};

export const ControlledSelection: Story = {
  render: function Render(args) {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    return (
      <Flex flexDirection="column" gap="3">
        <Flex flexDirection="row" gap="3" alignItems="center">
          <FilterOptionsChip
            {...args}
            title="Single Select"
            selectedKeys={selectedColor ? [selectedColor] : []}
            onSelectionChange={keys => {
              if (keys instanceof Set) {
                setSelectedColor([...keys][0]?.toString() || '');
              }
            }}
            chipTooltipText="Select Colors"
          >
            <FilterOptionsChip.Item key="red">Red</FilterOptionsChip.Item>
            <FilterOptionsChip.Item key="yellow">Yellow</FilterOptionsChip.Item>
            <FilterOptionsChip.Item key="blue">Blue</FilterOptionsChip.Item>
          </FilterOptionsChip>
          <h4 style={{ color: token('hs-comp-chip-color-text'), margin: 0 }}>
            Selected Color: <strong>{selectedColor}</strong>
          </h4>
        </Flex>

        <Flex flexDirection="row" gap="3" alignItems="center">
          <FilterOptionsChipMulti
            title="Multiple Select"
            selectedKeys={selectedCountries}
            onSelectionChange={(keys: Set<Key>) => {
              setSelectedCountries([...keys].map(String));
            }}
            selectionMode="multiple"
            chipTooltipText="Select Countries"
            chipTooltipPlacement="bottom"
          >
            <FilterOptionsChip.Item key="ad">Andorra</FilterOptionsChip.Item>
            <FilterOptionsChip.Item key="ar">Argentina</FilterOptionsChip.Item>
            <FilterOptionsChip.Item key="ca">Canada</FilterOptionsChip.Item>
          </FilterOptionsChipMulti>
          <h4 style={{ color: token('hs-comp-chip-color-text'), margin: 0 }}>
            Selected Countries: <strong>{selectedCountries.join(', ')}</strong>
          </h4>
        </Flex>
      </Flex>
    );
  },
};
