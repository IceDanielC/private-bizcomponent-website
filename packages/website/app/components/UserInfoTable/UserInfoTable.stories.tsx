import type { Meta, StoryObj } from '@storybook/react';
import UserInfoTable from './UserInfoTable';

const meta = {
  title: 'Components/UserInfoTable',
  component: UserInfoTable,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof UserInfoTable>;

type Story = StoryObj<typeof UserInfoTable>;

export default meta;

export const Example: Story = {
  args: {
    data: [
      { key: '1', name: 'Alice', age: 25, gender: 'Female' },
      { key: '2', name: 'Bob', age: 30, gender: 'Male' },
      { key: '3', name: 'Charlie', age: 28, gender: 'Male' }
    ]
  }
};
