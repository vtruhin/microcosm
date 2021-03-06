import Microcosm from '../src/microcosm'

test('does not mutate base state on prior dispatches', function () {
  const repo = new Microcosm()
  const mutation = () => true

  repo.addDomain({
    getInitialState() {
      return {
        toggled: false
      }
    },

    register() {
      return {
        [mutation](state) {
          state.toggled = !state.toggled
          return state
        }
      }
    }
  })

  repo.push(mutation)
  expect(repo.history.size).toEqual(0)
  expect(repo.state.toggled).toEqual(true)

  repo.push(mutation)
  expect(repo.history.size).toEqual(0)
  expect(repo.state.toggled).toEqual(false)

  repo.push(mutation)
  expect(repo.history.size).toEqual(0)
  expect(repo.state.toggled).toEqual(true)
})
