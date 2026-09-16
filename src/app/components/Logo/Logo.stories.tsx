import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Logo from './Logo'

const meta = {
  component: Logo,
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Black: Story = {
  args: {
    mode: 'black',
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export const White: Story = {
  args: {
    mode: 'white',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
