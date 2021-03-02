import Game, { GameTemplateProps } from 'templates/Game'

import galleryMock from 'components/Gallery/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { initializeApollo } from 'utils/apollo'
import { GetStaticProps } from 'next'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  return <Game {...props} />
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  })

  const paths = data.games.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: {
      slug: `${params?.slug}`
    }
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  return {
    props: {
      revalidate: 60,
      cover: game.cover
        ? `http://localhost:1337${game.cover.src}`
        : '/img/game-cover.jpg',
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: galleryMock,
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingGames: gamesMock,
      upcomingHighlight: highlightMock,
      recommendedGames: gamesMock
    }
  }
}
