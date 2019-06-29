const routes = [
  {
    path: '/',
    exact: true,
    componentName: 'HomePage',
  },
  {
    path: '/users',
    exact: true,
    componentName: 'UsersPage',
    initialActionType: 'USERS_SET',
  },
]

export default routes
