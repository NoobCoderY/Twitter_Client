import { graphql } from "@/gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);

export const deleteTweetMutation = graphql(`
  #graphql
  mutation deleteTweet($deleteTweetId: ID!) {
    deleteTweet(id: $deleteTweetId)
  }
`);