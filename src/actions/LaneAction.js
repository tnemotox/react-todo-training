import { createActions } from 'redux-actions'

/**
 * LaneAction
 */
export default createActions({

  'CHANGE_LANE_NAME': (id, name) => {
    return {
      id,
      name
    }
  },

  'ROUTING_PUSH': (path) => {
    return {
      method: 'push',
      args: [path]
    }
  },

  'ROUTING_GO_BACK': () => {
    return {
      method: 'goBack',
      args: []
    }
  },

  'ROUTING_GO_FORWARD': () => {
    return {
      method: 'goForward',
      args: []
    }
  },

  'ROUTING_REPLACE': (path) => {
    return {
      method: 'replace',
      args: [path]
    }
  }
});