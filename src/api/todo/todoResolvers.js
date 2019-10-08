const Todo = require('./todoModel')

const todoResolvers = {
  Query: {
    todos: () => Todo.find(),
  },

  Mutation: {
    createTodo: (_, { todoListId, text, requiredPersons }) => {
      const todo = new Todo({ todoListId, text, requiredPersons })
      return todo.save()
    },
  },
}

module.exports = todoResolvers
