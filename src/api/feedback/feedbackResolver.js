const Feedback = require('./feedbackModel')
const { findAll, createOne } = require('../resolverFactory')

const feedbackResolvers = {
  Query: {
    feedback: () => findAll(Feedback),
  },

  Mutation: {
    createFeedback: async (_, { input }) => {
      const newFeedback = await createOne(Feedback, input)
      return { feedback: newFeedback }
    },
  },
}

module.exports = feedbackResolvers
