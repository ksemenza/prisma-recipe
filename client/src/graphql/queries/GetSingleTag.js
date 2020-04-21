import {gql} from 'apollo-boost'

export default gql `query GetSingleTag($tagId: ID!) {
    tag(where: {id:$recipeId}) {
        id
        createdAt
        name
        isPublished
    }
}`