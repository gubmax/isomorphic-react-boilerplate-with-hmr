const findUsers = async (ctx) => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500))

  const test = ([
    { id: 0, name: 'Anders' },
    { id: 1, name: 'Bill' },
    { id: 2, name: 'Bjarne' },
    { id: 3, name: 'Brendan' },
    { id: 4, name: 'Dennis' },
    { id: 5, name: 'Guido' },
    { id: 6, name: 'James' },
    { id: 7, name: 'Linus' },
    { id: 8, name: 'Mark' },
    { id: 9, name: 'Richard' },
    { id: 10, name: 'Robert' },
    { id: 11, name: 'Ryan' },
    { id: 12, name: 'Tim' },
  ]).sort(() => Math.random() - 0.5)

  ctx.body = test
}

export {
  findUsers, // eslint-disable-line import/prefer-default-export
}
