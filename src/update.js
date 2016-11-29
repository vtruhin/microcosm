/**
 * Non-destructive data operations
 * Taken from Sprout:
 * https://github.com/herrstucki/sprout/blob/master/src/util.js
 */

import merge from './merge'

function get (target, keys) {
  if (keys == null) {
    return target
  }

  if (Array.isArray(keys) === false) {
    if (target && keys) {
      return target[keys]
    }
  }

  for (var i = 0; target && i < keys.length; i++) {
    target = target[keys[i]]
  }

  return target
}

function set (target, keys, value) {
  if (keys === null) {
    return value
  }

  if (Array.isArray(keys) === false) {
    if (target && keys) {
      return merge({}, target, { [keys]: value })
    }
  }

  if (keys.length) {
    let head  = keys[0]
    let clone = merge({}, target)

    clone[head] = keys.length > 1 ? set(clone[head] || {}, keys.slice(1), value) : value

    return clone
  } else {
    return value
  }
}

export default { get, set }
