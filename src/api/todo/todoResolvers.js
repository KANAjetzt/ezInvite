const Todo = require('./todoModel')
const { createOne, updateOne, deleteOne } = require('../resolverFactory')

const todoResolvers = {
  Query: {
    todos: () => Todo.find(),
  },

  Mutation: {
    createTodo: (_, args) => createOne(Todo, args),
    updateTodo: (_, args) => updateOne(Todo, args),
    deleteTodo: (_, args) => deleteOne(Todo, args),
  },
}

module.exports = todoResolvers
