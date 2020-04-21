const { prisma } = require('./generated/prisma-client/');


const TAGS = [
    'React',
    'Angular',
    'Ember',
];

const seed = async () => {
    //create tags

    const tags = [];
    for (let i = 0; i < TAGS.length; i += 1) {
        tags.push(
        await prisma.createTag({
            name: TAGS[i],
        }),
        );
    }
}

seed().catch(e => console.error(e));
