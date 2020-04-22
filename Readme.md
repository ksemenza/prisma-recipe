## ROUGH DRAFT README

npm install -g prisma

npm install -g create-react-app

prisma login

mkdir new-app-dir
cd new-app-dir

Initialize Primsa Server
prisma init

### PROMPT INIT

(Choices)

(Docker will create one locally)
Create new database  
PostgresSQL
Prisma JS Client

### Three files are created
prisma.yml Prisma Service definition
datamodel.prisma 

### RUN 
docker-compose up -d
### STOP 
docker-compose stop

### PUT IN 
datamodel.prisma (file)
type Tag {
  id: ID! @id
  name: String! @unique
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  isPublished: Boolean! @default(value:true)

}
### START SERVER
prisma deploy


### RETURNS
Changes:

  Tag (Type)
  + Created type `Tag`
  + Created field `id` of type `ID!`
  + Created field `name` of type `String!`
  + Created field `createdAt` of type `DateTime!`
  + Created field `updatedAt` of type `DateTime!`

Applying changes 1.5s
Generating schema 96ms
Saving Prisma Client (JavaScript) at C:\Users\Guin Productions\labs\101\recipe-prisma\generated\prisma-client\

Your Prisma endpoint is live:

  HTTP:  http://localhost:4466
  WS:    ws://localhost:4466

You can view & edit your data here:

  Prisma Admin: http://localhost:4466/_admin

### RUN
create-react-app client

cd client

### Install Dep
npm install apollo-react-apollo graph-tag graphql
npm install @material-ui/core
npm install antd
### REPLACE (Due to Error)
compose from 'react-apollo'
npm install lodash.flowright
import * as compose from 'lodash.flowright';