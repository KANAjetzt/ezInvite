const Todo = require('./todoModel')
const {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../resolverFactory')
const AppError = require('../../utils/appError')

// `${context.request.protocol}://${
//             context.request.hostname
//           }${
//             process.env.NODE_ENV === 'development'
//               ? `:${process.env.PORT || 3000}`
//               : ''
//           }/img/${user.photo}`

const todoResolvers = {
  Query: {
    todos: () => findAll(Todo),
    todo: (_, { id }) => findOne(Todo, id),
    todosForWidget: async (_, { id }) => await Todo.find({ widget: id }),

    // todosForWidget: async (_, { id }, context) => {
    //   const todos = await Todo.find({ widget: id })
    //   const newTodos = [...todos]
    //   console.log(newTodos)

    //   newTodos.forEach((todo, iTodo) =>
    //     todo.users.forEach((user, iUser, arrUsers) => {
    //       arrUsers[iUser].photo = `${context.request.protocol}://${
    //         context.request.hostname
    //       }${
    //         process.env.NODE_ENV === 'development'
    //           ? `:${process.env.PORT || 3000}`
    //           : ''
    //       }/img/${todos[iTodo].users[iUser].photo}`

    //       console.log(iTodo, iUser)
    //       console.log(context.request.protocol, context.request.hostname)
    //       console.log(todos[iTodo].users[iUser].photo)
    //     })
    //   )

    //   console.log(`todos ---> ${todos}`, ` newTodos --> ${newTodos}`)
    //   return newTodos
    // },
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
