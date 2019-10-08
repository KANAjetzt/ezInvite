const TodoList = require('./todoListModel')

const todoListResolvers = {
  Query: {
    todoLists: () => TodoList.find(),
  },

  Mutation: {
    createTodoList: (_, { widgetId }) => {
      const todoList = new TodoList({ widgetId })
      return todoList.save()
    },
  },
}

module.exports = todoListResolvers
