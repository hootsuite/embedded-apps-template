import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Key } from '@react-types/shared';
import { fn } from 'storybook/test';

import { Button, Combobox, Flex } from 'hootsuite-bento';

const countries = {
  AU: 'Australia',
  BR: 'Brazil',
  CA: 'Canada',
  CN: 'China',
  FR: 'France',
  DE: 'Germany',
  IN: 'India',
  ID: 'Indonesia',
  IT: 'Italy',
  JP: 'Japan',
  MX: 'Mexico',
  NL: 'Netherlands',
  RU: 'Russia',
  SA: 'Saudi Arabia',
  KR: 'South Korea',
  ES: 'Spain',
  CH: 'Switzerland',
  TR: 'Turkey',
  GB: 'United Kingdom',
  US: 'United States',
} as const;

type CountryCode = keyof typeof countries;
type CountryName = (typeof countries)[CountryCode];

const meta = {
  title: 'Bento/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    isCreatable: false,
    placeholder: 'Placeholder',
    onSelectionChange: fn(),
  },
  argTypes: {
    optionsAreLoading: { control: 'boolean' },
    onSelectionChange: { control: false },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UncontrolledSingle: Story = {
  args: {
    defaultSelectedKeys: ['US'],
    selectionMode: 'single',
  },
  render: props => (
    <Combobox
      {...props}
      onSelectionChange={keys => {
        props.onSelectionChange?.([...keys] as unknown as Set<Key>);
      }}
    >
      {Object.entries(countries).map(([code, name]) => (
        <Combobox.Item key={code} textValue={name.toUpperCase()}>
          {name}
        </Combobox.Item>
      ))}
    </Combobox>
  ),
};

export const ControlledSingle: Story = {
  args: {
    selectedKeys: [countries.US],
    selectionMode: 'single',
  },
  render: function Render(props) {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(2);
    const selectedCountry =
      selectedIndex !== undefined
        ? Object.values(countries)[selectedIndex]
        : undefined;

    const handleNextClick = () => {
      setSelectedIndex(c =>
        c === undefined ? 0 : (c + 1) % Object.keys(countries).length
      );
    };

    return (
      <Flex gap="4">
        <Combobox
          {...props}
          selectedKeys={selectedCountry ? [selectedCountry] : []}
          onSelectionChange={keys => {
            const selected = [...keys][0] as CountryName;
            setSelectedIndex(Object.values(countries).indexOf(selected));
            props.onSelectionChange?.([selected] as unknown as Set<Key>);
          }}
        >
          {Object.values(countries).map(country => (
            <Combobox.Item key={country}>{country}</Combobox.Item>
          ))}
        </Combobox>
        <Button onPress={handleNextClick}>Next</Button>
      </Flex>
    );
  },
};

export const UncontrolledMultiple: Story = {
  args: {
    selectionMode: 'multiple',
    defaultSelectedKeys: [countries.CA, countries.US],
  },
  render: function Render(props) {
    return (
      <Flex gap="4">
        <Combobox
          {...props}
          selectionMode="multiple"
          onSelectionChange={keys => {
            const selected = [...keys] as CountryName[];
            props.onSelectionChange?.(selected as unknown as Set<Key>);
          }}
        >
          {Object.values(countries).map(country => (
            <Combobox.Item key={country}>{country}</Combobox.Item>
          ))}
        </Combobox>
      </Flex>
    );
  },
};

export const ControlledMultiple: Story = {
  args: {
    selectionMode: 'multiple',
    selectedKeys: [countries.CA, countries.US],
    optionsAreLoading: false,
  },
  render: function Render(props) {
    const [selectedKeys, setSelectedKeys] = useState<CountryName[]>(
      props.selectedKeys as unknown as CountryName[]
    );

    const handleAddRandom = () => {
      const missing = Object.values(countries).filter(
        c => !selectedKeys.includes(c)
      );
      if (missing.length === 0) return;
      const random = missing[Math.floor(Math.random() * missing.length)];
      setSelectedKeys(current => [...current, random]);
    };

    return (
      <Flex gap="4">
        <Combobox
          {...props}
          selectedKeys={selectedKeys}
          onSelectionChange={keys => {
            const selected = [...keys] as CountryName[];
            setSelectedKeys(selected);
            props.onSelectionChange?.(selected as unknown as Set<Key>);
          }}
        >
          {Object.values(countries).map(country => (
            <Combobox.Item key={country}>{country}</Combobox.Item>
          ))}
        </Combobox>
        <Button onPress={handleAddRandom}>Add random</Button>
      </Flex>
    );
  },
};

export const CreatableSingle: Story = {
  args: {
    selectionMode: 'single',
    isCreatable: true,
  },
  render: props => (
    <Combobox
      {...props}
      onSelectionChange={keys =>
        props.onSelectionChange?.([...keys] as unknown as Set<Key>)
      }
    >
      {Object.values(countries).map(country => (
        <Combobox.Item key={country}>{country}</Combobox.Item>
      ))}
    </Combobox>
  ),
};

export const CreatableMultiple: Story = {
  args: {
    selectionMode: 'multiple',
    isCreatable: true,
  },
  render: props => (
    <Flex gap="4">
      <Combobox
        {...props}
        onSelectionChange={keys => {
          const selected = [...keys] as CountryName[];
          props.onSelectionChange?.(selected as unknown as Set<Key>);
        }}
      >
        {Object.values(countries).map(country => (
          <Combobox.Item key={country}>{country}</Combobox.Item>
        ))}
      </Combobox>
    </Flex>
  ),
};

export const CustomWidth: Story = {
  args: {
    defaultSelectedKeys: [countries.CA],
    selectionMode: 'single',
  },
  render: function Render(props) {
    return (
      <Flex width="100%" gap="4">
        <Combobox
          {...props}
          style={{ minWidth: '100%' }}
          onSelectionChange={keys => {
            const selected = [...keys][0] as CountryName;
            props.onSelectionChange?.(
              (selected ? [selected] : []) as unknown as Set<Key>
            );
          }}
        >
          {Object.values(countries).map(country => (
            <Combobox.Item key={country}>{country}</Combobox.Item>
          ))}
        </Combobox>
      </Flex>
    );
  },
};
