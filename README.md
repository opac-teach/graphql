# GraphQL Demo

A music app as a demonstration of GraphQL.

- [server-apollo](./server-apollo/README.md) - Server made with Apollo Server
- [client-next](./client-next/README.md) - Client made with Next.js and Apollo Client

## Course content

https://teach.opac.me/cours/dev-backend/graphql

## Roadmap

### Backend

#### Queries

To test the requests, you can use the playground that you will find on the url: http://localhost:4000/

- Create a query that returns all users
- Create a query that returns all users with their songs
- Create a query that returns a user by their id and the songs they have created
- Create a mutation that creates a user

#### Songs

##### Song User
- Add a user field in the Song schema that will return the user linked to the song and modify the resolver.

##### Song by ID
- Add a song(id) resolver that will return a song by its id.

#### Genre
- Add a Genre template that will group songs of the same genre.
- Create the schema, mocked data, resolvers, mutations, relations,...
- Add an optional argument to the query songs to filter by genre

#### Songs Count
- Add a songsCount field in the User and Genre schema that will return the number of songs related to the user or genre.

#### Mutations
- Create a mutation to create a song. Only allow logged-in users to perform this action
- Create mutations that will modify or delete a user or song. Take into account the user who performs the action and only allow them to modify or delete their own data.

#### Pagination
- Add a paging system to the list of users and songs, which will limit the number of data returned by the query.

- Also add pagination on the resolvers chains.

#### Loaders
- Create a query that will retrieve all the songs, and the user associated with each of them.
- Observe log messages in the console and locate database calls that are duplicated.
- Use loaders to optimize queries and solve the N+1 problem.

#### Bonus

##### Roles
- Add a role system, and only allow users with the "ADMIN" role to use mutations on genders.

You can either use a "role" header in the HTTP request to simulate a user with a specific role or switch on a real authentication with JWT for example.

##### Subscription
- Change the server to support subscriptions and notify clients when adding new songs.

### Frontend

#### Songs
- Add the/song/[id] page that will display the details of a song
- Show the users who created the songs on/songs and/songs/[id] pages with links to them

#### Genres
- Display gender data
    - Create the pages/genre and/genre/[id]
    - On the other pages, add genre info when displaying songs
- Display the number of songs for each genre and each user on the relevant pages

#### Forms

Add forms for:

- Add a song
- Add a gender
- Option: edit/delete songs, users or genres ...

#### Bonus
- Use fragments in the frontend to factor queries
- Use pagination
- Update cache during mutations to avoid refetch
- Use subscriptions to receive new songs in real time
- Create unit and integration tests

##### Next
- Switch to server side rendering (SSR) for all pages
- Integrate the GraphQL server directly into the Next.js application

## Development

### Conventional Branches

The branches have their name based on conventions rules that are described on the next conventional branches website : https://conventional-branch.github.io/

### Conventional Commits

The commits have their name based on conventions rules that are described on the next conventional commits website : https://www.conventionalcommits.org/en/v1.0.0/
