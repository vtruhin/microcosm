# Form

1. [Overview](#overview)
2. [Usage](#usage)
3. [Props](#props)

## Overview

Form is a wrapper around a standard `form` tag that provides a method
of broadcasting an intent to associated Presenters (see
[`./presenter.md`](./presenter.md)). This attempts to more closely
model the way forms traditionally work, however within the context of
a JavaScript application.

```javascript
import React from 'react'
import DOM from 'react-dom'
import Presenter from 'microcosm/addons/presenter'
import Form from 'microcosm/addons/form'
import Microcosm from 'microcosm'

const repo = new Microcosm()

const increaseCount = n => n

repo.addDomain('count', {
  getInitialState () {
    return 0
  },
  increase (count, amount) {
    return count + amount
  },
  register () {
    return {
      [increaseCount] : this.increase
    }
  }
})

function StepperForm ({ count }) {
  return (
    <Form intent={increment}>
      <input type="hidden" name="amount" value="1" />
      <button>+ 1</button>
    </Form>
  )
}

class CountPresenter extends Presenter {
  model () {
    return {
      count : state => state.count
    }
  }

  increaseCount (repo, { amount }) {
    return repo.push(increment, amount)
  }

  view ({ count }) {
    return <StepperForm count={ count } />
  }
}

DOM.render(<CountPresenter repo={ repo } />, document.getElementById('container'))
```

Form inputs are serialized to JSON upon submission using
[`form-serialize`](https://github.com/defunctzombie/form-serialize).

## Props

### intent

A string value to send to Presenters. If a Presenter is registered to
that string via its `register()` method, it will execute the
associated callback.

### serializer(form)

The serialization function. By default this uses
[`form-serialize`](https://github.com/defunctzombie/form-serialize). On
submission, this function is given the associated form HTML element.

### prepare(params)

Executed after serialization to allow for extra parameter
manipulation. This is useful for ensuring proper date formats, or
other data formats that may come directly from a form input.

```javascript
class MyForm extends React.Component {
  prepare (params) {
    params.start = new Date(params.start).toISOString()
    params.end = new Date(params.start).toISOString()

    return params
  }

  render () {
    return (
      <Form intent={actions.create} prepare={this.prepare}>
        <input name="name" />
        <input name="start" type="datetime-local" />
        <input name="end" type="datetime-local" />

        <input type="submit" />
      </Form>
    )
  }
}
```

### onSubmit(event, action)

An event callback executed immediately after the form submits and the
intent is broadcasted.

### onDone(payload)

After broadcasting, if the dispatched intent returns a Microcosm
action, this callback will execute if the action completes successfully.

### onError(payload)

After broadcasting, if the dispatched intent returns a Microcosm
action, this callback will execute if the action is rejected.

### onCancel(payload)

After broadcasting, if the dispatched intent returns a Microcosm
action, this callback will execute when the action is cancelled.

### onUpdate(payload)

After broadcasting, if the dispatched intent returns a Microcosm
action, this callback will execute when the action emits a progress
update.
