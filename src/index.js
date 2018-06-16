const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { _ } = require('lodash');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const LinkList = require('./resolvers/LinkList')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    LinkList,
}

/*const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone 2`,
        link: (root, args, context,info) => {
            // TODO : a faire marcher
            console.log ('args', args);
            const response =  context.db.query.links(
                {
                    where: {id: args.id}
                },
                info
            );
            console.log ('response', response);
            return response;
        },
        links: (root, args, context,info) => {
            return context.db.query.links({}, info);
        },
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url,
    },
    Mutation: {
        createLink: (root, args, context, info) => {
            return context.db.mutation.createLink (
                {data: args.data},
                info
            );
        },
        updateLink: (root, args, context, info) => {

            return context.db.mutation.updateLink (
                {
                    data: args.data,
                    where: {id: args.id}
                },
                info
            );
        },
        deleteLink: (root, args, context, info) => {
            return context.db.mutation.deleteLink (
                {
                    where: {id: args.id}
                },
                info
            );
        }
    },
};*/


const server = new GraphQLServer({
    typeDefs : "./schema.graphql",
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: './generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/alexandre-guesnerot/demo/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
});
server.start(() => console.log(`Server is running on http://localhost:4000`));