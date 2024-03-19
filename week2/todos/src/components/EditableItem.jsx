import { Component, createRef } from 'react'

export default class Editable extends Component {
  constructor () {
    super()
    this.state = {
      editable: false
    }
    this.inputRef = createRef()
  }

  handleSetEditable = () => {
    this.setState({
      editable: true
    })
  }
  componentDidMount () {
    document.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (
      this.inputRef.current &&
      !this.inputRef.current.contains(event.target)
    ) {
      const { id } = this.props
      const currentValue = this.inputRef.current.value
      this.props.onClickOutside({ id: id, value: currentValue })
      this.setState({ editable: false })
    }
  }

  render () {
    const { editable } = this.state
    const { title } = this.props
    return (
      <>
        {!editable && (
          <span
            className='ml-4 text-sm w-full'
            onDoubleClick={this.handleSetEditable}
          >
            {title}
          </span>
        )}
        {editable && (
          <input
            ref={this.inputRef}
            className='flex-grow h-8 text-sm mr-4 bg-transparent focus:outline-none font-medium border border-gray-300 p-2.5 rounded-md'
            type='text'
            defaultValue={title}
          />
        )}
      </>
    )
  }
}
