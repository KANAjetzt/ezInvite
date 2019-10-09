const TodoList = require('./todoListModel')
const { myEmitter } = require('../../utils/events')
const { createOne } = require('../resolverFactory')

myEmitter.once('widgetCreated', async widgets => {
  widgets.map(widget => {
    if (widget.type === 'todoList') {
      const widgetId = { widget: widget._id }
      return createOne(TodoList, widgetId)
    }
    return null
  })
})

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
