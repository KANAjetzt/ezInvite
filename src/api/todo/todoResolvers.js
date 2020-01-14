const Todo = require('./todoModel')
const {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../resolverFactory')
const asyncMap = require('../../utils/asyncMap')
const AppError = require('../../utils/appError')

const todoResolvers = {
  Query: {
    todos: () => findAll(Todo),
    todo: (_, { id }) => findOne(Todo, id),

    todosForWidget: async (_, { id }) => {
      // Get all todos with the corresponding widget id.
      return await Todo.find({ widget: id })
    },
  },

  Mutation: {
    createTodo: async (_, { input }) => {
      const newTodo = await Todo.create(input)
      await newTodo.populate('users').execPopulate()
      return { todo: newTodo }
    },

    createTodos: async (_, { input }) => {
      const newTodos = asyncMap(input.todos, async todo => {
        const newTodo = await Todo.create(todo)
        await newTodo.populate('users').execPopulate()
      })

      return { todos: newTodos }
    },

    updateTodo: (_, { input }) => {
      // If users are not updatet - simple update all given fields
      if (input.users)
        return new AppError(
          'Please use removeUser / addUser Mutation to update Users!'
        )

      return updateOne(Todo, input)
    },

    deleteTodo: async (_, { input }) => {
      await deleteOne(Todo, input.id)

      // TODO: maybe I could actually check if the thing got deleted 🙃
      return { success: true }
    },

    //TODO: Performance Optimisation
    //? Maybe add pre save hook that pushs new Users - would save 1 query
    addUserToTodo: async (_, { input }) => {
      const todo = await Todo.findById(input.id)
      todo.users.push(input.user)
      const newTodo = await updateOne(Todo, todo)
      return { todo: newTodo }
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
