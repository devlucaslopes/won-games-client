import Game, { GameTemplateProps } from 'templates/Game'

import galleryMock from 'components/Gallery/mock'
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { initializeApollo } from 'utils/apollo'
import { GetStaticProps } from 'next'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import {
  QueryUpcomming,
  QueryUpcommingVariables
} from 'graphql/generated/QueryUpcomming'
import { QUERY_UPCOMMING } from 'graphql/queries/upcomming'

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
    },
    fetchPolicy: 'no-cache'
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  const { data: recommended } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  const TODAY = new Date().toISOString().slice(0, 10)
  const { data: upcomming } = await apolloClient.query<
    QueryUpcomming,
    QueryUpcommingVariables
  >({ query: QUERY_UPCOMMING, variables: { date: TODAY } })

  return {
    revalidate: 60,
    props: {
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
      upcomingGames: gamesMapper(upcomming.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcomming.showcase?.upcomingGames?.highlight
      ),
      recommendedTitle: recommended.recommended?.section?.title,
      recommendedGames: gamesMapper(recommended.recommended?.section?.games)
    }
  }
}
