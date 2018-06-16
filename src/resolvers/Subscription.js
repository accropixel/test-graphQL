async function newLinkSubscribe (parent, args, context, info) {
    return context.db.subscription.link(
        { where: { mutation_in: ['CREATED','UPDATED'] } },
        info,
    )
}

async function newVoteSubscribe (parent, args, context, info) {
    return context.db.subscription.vote(
        { where: { mutation_in: ['CREATED','UPDATED'] } },
        info,
    )
}

const newLink = {
    subscribe: newLinkSubscribe
};

const newVote = {
    subscribe: newVoteSubscribe
};

module.exports = {
    newLink,
    newVote,
}