import React from 'react'
import Form  from '../../../../src/addons/form'
import { send } from '../actions/messages'

const Prompt = React.createClass({

  getInitialState() {
    return {
      message: ''
    }
  },

  reset() {
    this.setState({ message: '' })
  },

  setMessage(e) {
    this.setState({
      message : e.target.value
    })
  },

  render() {
    const { message } = this.state

    return (
      <Form intent={send} onSubmit={this.reset}>
        <label className="audible" htmlFor="message">Respond:</label>
        <input id="message" name="message" type="text" onChange={this.setMessage} value={message} autoComplete="off" />
        <input type="submit" value="Reply" disabled={ message.length <= 0 } />
      </Form>
    )
  }

})

export default Prompt
