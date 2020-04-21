import {gql} from 'apollo-boost'

export default gql `query GetAllPublishedTags {
    tags(where:{isPublished: true})  {
        id
        createdAt
        name
        isPublished
    }
}`