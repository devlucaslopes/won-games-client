import { Story, Meta } from '@storybook/react/types-6-0'
import Showcase, { ShowcaseProps } from '.'
import highlightMock from 'components/Highlight/mock'

export default {
  title: 'Showcase',
  component: Showcase,
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto' }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<ShowcaseProps> = (args) => <Showcase {...args} />

Default.args = {
  title: 'Most Popular',
  highlight: highlightMock
}

export const WithoutHighlight: Story<ShowcaseProps> = (args) => (
  <Showcase {...args} />
)

WithoutHighlight.args = {
  title: 'Most Popular'
}

export const WithoutGames: Story<ShowcaseProps> = (args) => (
  <Showcase {...args} />
)

WithoutGames.args = {
  title: 'Most Popular',
  highlight: highlightMock
}
