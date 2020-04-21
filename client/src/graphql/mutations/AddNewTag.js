import {gql} from 'apollo-boost'

export default gql `mutation AddTag(
    $name: String!
    $isPublished: Boolean
) {
    createTag(
        data:{
            name:$name
            isPublished:$isPublished
        }
    )
}`