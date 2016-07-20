import Message from '../records/message'
import { send } from '../actions/messages'

const Messages = {

  getInitialState() {
    return [ Message({ user: 'Elizia', message: "What's new with you?" }) ]
  },

  add(state, items) {
    const messages = [].concat(items).map(Message)

    return state.concat(messages)
  },

  addLoading(state, params) {
    return Messages.add(state, { ...params, pending: true })
  },

  addError(state, params) {
    return Messages.add(state, { ...params, error: true })
  },

  register() {
    return {
      [send.open]   : Messages.addLoading,
      [send.done]   : Messages.add,
      [send.failed] : Messages.addError
    }
  }
}

export default Messages
