import {gql} from 'apollo-boost'

export default gql `mutation UpdateTag (
    $id: ID!
    $name: String!
    $isPublished: Boolean
) {
    update(
        where: { id:$id }
        data: {
            name: $name
            isPublished: $isPublished
        }
    )
}`