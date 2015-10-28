let Action      = require('./fixtures/Action')
let DummyStore  = require('./fixtures/DummyStore')
let Microcosm   = require('../src/Microcosm')
let Transaction = require('../src/Transaction')
let assert      = require('assert')

describe('Microcosm', function() {
  let app;

  beforeEach(function(done) {
    app = new Microcosm()
    app.addStore('dummy', DummyStore)
    app.start(done)
  })

  it ('can be extended - Address loose mode Babel bug', function() {
    class First  extends Microcosm {}
    class Second extends First {}

    assert.ok(new First() instanceof Microcosm)
    assert.ok(new Second() instanceof First)
  })

  it ('getInitialState collects starting state for all registered stores', function() {
    let app = new Microcosm()

    app.addStore('test', {
      getInitialState() {
        return true
      }
    })

    assert.deepEqual(app.getInitialState(), { test: true })
  })

  it ('deserializes when replace is invoked', function() {
    app.listen(function() {
      assert.equal(app.state.dummy, 'DIFFERENT')
    })

    app.replace({ dummy: 'different' })
  })

  it ('binds arguments to push', function() {
    app.prepare(function(...args) {
      assert.deepEqual(args, [ 1, 2, 3 ])
    }, [ 1, 2 ])(3)
  })

  it ('prepare handles cases with no arguments', function(done) {
    let expected = 3

    function test(a) {
      assert.equal(arguments.length, 1)
      assert.equal(a, expected)
      done()
    }

    app.prepare(test)(expected)
  })

  it ('prepare does not inject nully', function(done) {
    let expected = 3

    function test(a) {
      assert.equal(arguments.length, 1)
      assert.equal(a, expected)
      done()
    }

    app.prepare(test, expected)()
  })

  it ('throws an error if asked to push a non-function value', function(done) {
    try {
      app.push(null)
    } catch(x) {
      assert(x instanceof TypeError)
      done()
    }
  })

  it ('can manipulate how many transactions are merged', function() {
    class CustomApp extends Microcosm {

      shouldHistoryKeep (transaction) {
        return this.history.size() < 6
      }

    }

    let app = new CustomApp()

    let identity = n => n

    app.push(identity, 1)
    app.push(identity, 2)
    app.push(identity, 3)
    app.push(identity, 4)
    app.push(identity, 5)

    assert.equal(app.history.size(), 5)
    app.push(identity, 6)

    assert.equal(app.history.size(), 5)
    assert.deepEqual(app.history.branch().reduce((a, b) => a.concat(b.payload), []), [ 2, 3, 4, 5, 6 ])
  })

})