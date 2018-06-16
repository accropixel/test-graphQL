async function links(parent, args, context, info) {

    const where = args.filter ?
        {
            OR: [
                { url_contains: args.filter },
                { description_contains: args.filter },
            ],
        } : {

        }


    // 1
    const queriedLinks = await context.db.query.links({ where, skip: args.skip, first: args.first, orderBy: args.orderBy }, `{ id }`);

    const countSelectionSet = `
    {
      aggregate {
        count
      }
    }`

    // 2
    const linksConnection = await context.db.query.linksConnection({}, countSelectionSet)

    console.log ("linksConnection", linksConnection);
    // 3
    return {
        count: linksConnection.aggregate.count,
        /*linkIds: queriedLinks/*.map(link => link.id),*/
        linkIds: queriedLinks.map(link => link.id),
    }
}

async function link(parent, args, context, info) {
    // TODO : a faire marcher
    const response =  await context.db.query.links(
        {
            where: {id: args.id}
        },
        info
    );
    if (!response.length) { throw new Error('Not exist'); }
    return response[0];
}


async function info() {
    return `This is the API of a Hackernews Clone 4`
}


module.exports = {
    links,
    link,
    info,
}