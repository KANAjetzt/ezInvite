const Todo = require('./todoModel')
const { createOne, updateOne, deleteOne } = require('../resolverFactory')
const AppError = require('../../utils/appError')

const todoResolvers = {
  Query: {
    todos: () => Todo.find(),
  },

  Mutation: {
    createTodo: (_, args) => createOne(Todo, args),
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
