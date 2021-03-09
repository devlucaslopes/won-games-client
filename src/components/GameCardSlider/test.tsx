import 'match-media-mock'
import { screen, render } from 'utils/test-utils'

import GameCardSlider from '.'

const items = [
  {
    id: '1',
    title: 'Population Zero',
    developer: 'Rockstar Games',
    slug: '/',
    img: 'https://source.unsplash.com/user/willianjusten/300x140',
    price: 235,
    promotionalPrice: 215
  },
  {
    id: '2',
    title: 'Population Zero',
    developer: 'Rockstar Games',
    slug: '/',
    img: 'https://source.unsplash.com/user/willianjusten/300x141',
    price: 235,
    promotionalPrice: 215
  },
  {
    id: '3',
    title: 'Population Zero',
    developer: 'Rockstar Games',
    slug: '/',
    img: 'https://source.unsplash.com/user/willianjusten/300x142',
    price: 235,
    promotionalPrice: 215
  },
  {
    id: '4',
    title: 'Population Zero',
    developer: 'Rockstar Games',
    slug: '/',
    img: 'https://source.unsplash.com/user/willianjusten/300x143',
    price: 235,
    promotionalPrice: 215
  },
  {
    id: '5',
    title: 'Population Zero',
    developer: 'Rockstar Games',
    slug: '/',
    img: 'https://source.unsplash.com/user/willianjusten/300x144',
    price: 235,
    promotionalPrice: 215
  }
]

describe('<GameSlider />', () => {
  it('should render with 4 active items', () => {
    const { container } = render(<GameCardSlider items={items} />)
    expect(container.querySelectorAll('.slick-active')).toHaveLength(4)
  })

  it('should render white arrows if color passed', () => {
    render(<GameCardSlider items={items} color="white" />)

    expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
    expect(screen.getByLabelText(/next games/i)).toHaveStyle({
      color: '#FAFAFA'
    })
  })
})
