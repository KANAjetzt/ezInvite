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

    //? Maybe add pre save hook that pushs new Users - would save 1 query
    addUserToTodo: async (_, { id, user }) => {
      const todo = await Todo.findById(id)
      todo.users.push(user)
      return updateOne(Todo, todo)
    },

    //? Maybe add pre save hook that pushs new Users - would save 1 query
    removeUserFromTodo: async (_, { id, user }) => {
      //! User wird aus der Todo gelöscht - allerdings wird das Document dann nicht zurück gegeben.
      return await Todo.updateOne(
        { _id: id },
        { $pull: { users: { $in: [`${user}`] } } },
        { new: true, runValidators: true }
      )
    },
  },
}

module.exports = todoResolvers
