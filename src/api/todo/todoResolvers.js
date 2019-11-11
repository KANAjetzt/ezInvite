const Todo = require('./todoModel')
const {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../resolverFactory')
const AppError = require('../../utils/appError')

const todoResolvers = {
  Query: {
    todos: () => findAll(Todo),
    todo: (_, { id }) => findOne(Todo, id),

    todosForWidget: async (_, { id }, context) => {
      // Get all todos with the corresponding widget id.
      const todos = await Todo.find({ widget: id })

      // Create a copy of todos - for safety reasons
      const newTodos = [...todos]

      // Go in to every todo
      newTodos.forEach(todo => {
        // create a modified users array
        const newUsers = todo.users.map(user => {
          return {
            // When spreading ...user we get the whole Query Object back - so select the ._doc <--
            ...user._doc,
            // Modify the photo field - the URL to the IMG is added
            photo: `${context.request.protocol}://${context.request.hostname}${
              process.env.NODE_ENV === 'development'
                ? `:${process.env.PORT || 3000}`
                : ''
            }/img/user/${user.photo}`,
          }
        })
        // Slam the modified users array in the todo object
        todo.users = newUsers
      })
      return newTodos
    },
  },

  Mutation: {
    createTodo: async (_, { input }) => {
      return { todo: await createOne(Todo, input) }
    },

    updateTodo: (_, args) => {
      // If users are not updatet - simple update all given fields
      if (args.users)
        return new AppError(
          'Please use removeUser / addUser Mutation to update Users!'
        )

      return updateOne(Todo, args)
    },
    deleteTodo: (_, args) => deleteOne(Todo, args),

    //TODO: Performance Optimisation
    //? Maybe add pre save hook that pushs new Users - would save 1 query
    addUserToTodo: async (_, { id, user }) => {
      const todo = await Todo.findById(id)
      todo.users.push(user)
      return updateOne(Todo, todo)
    },

    //TODO: Performance Optimisation
    //? Maybe add pre save hook that pushs new Users - would save 1 query
    removeUserFromTodo: async (_, { id, user }) => {
      const todo = await Todo.findById(id)

      let deleted = false
      todo.users.forEach((currentUser, i, arr) => {
        if (`${currentUser}` === `${user}` && deleted === false) {
          arr.splice(i, 1)
          deleted = true
        }
      })

      return updateOne(Todo, todo)
    },
  },
}

module.exports = todoResolvers
