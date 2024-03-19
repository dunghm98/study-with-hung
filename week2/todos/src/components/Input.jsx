import { Component } from 'react'

export default class Input extends Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
  }

  handleChangeValue = e => {
    this.setState({ newItemTitle: e.target.value })
  }

  render () {
    return (
      <input
        className='flex-grow h-8 mr-4 bg-transparent focus:outline-none font-medium border border-gray-300 p-2.5 rounded-md'
        type='text'
        placeholder='Add a new task'
        onChange={this.handleChangeValue}
        value={this.state.value}
      />
    )
  }
}
