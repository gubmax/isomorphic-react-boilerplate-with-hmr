const findUsers = async (ctx) => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500))

  ctx.body = ([
    { id: 0, name: 'Maxim' },
    { id: 1, name: 'John' },
    { id: 2, name: 'Anna' },
  ])
}

export {
  findUsers, // eslint-disable-line import/prefer-default-export
}
