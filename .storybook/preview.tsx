import type { Preview } from '@storybook/nextjs-vite'
import { mswLoader } from 'msw-storybook-addon/csf3'
import '../src/app/globals.scss'
import { roboto, sourceSans, openSans } from '../src/app/styles/fonts'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${sourceSans.variable} ${roboto.variable} ${openSans.variable}`}>
        <Story />
      </div>
    ),
  ],
  loaders: [mswLoader()],
  parameters: {
    backgrounds: {
      options: {
        light: '#f0f0f0',
        dark: '#191a1b',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
