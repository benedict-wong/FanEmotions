import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import PasswordInput from './PasswordInput'

const meta = {
  component: PasswordInput,
  tags: ['ai-generated', 'needs-work'],
} satisfies Meta<typeof PasswordInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'signin',
  },
}

export const Signup: Story = {
  args: {
    mode: 'signup',
  },
}

export const CssCheck: Story = {
  args: {
    mode: 'signin',
  },
  play: async ({ canvas }) => {
    const toggleButton = canvas.getByRole('button', { name: /show password/i })

    await expect(getComputedStyle(toggleButton).position).toBe('absolute')
  },
}
