import { Component } from 'react'
import FilterItem from './FilterItem'

export default class Filter extends Component {
  constructor () {
    super()
    this.state = {
      filters: [
        {
          label: 'All',
          id: 'all'
        },
        {
          label: 'Active',
          id: 'active'
        },
        {
          label: 'Done',
          id: 'done'
        }
      ]
    }
  }

  handleClickFilter = id => {
    const { onFiler } = this.props
    onFiler(id)
  }

  render () {
    const { status } = this.props
    return (
      <div className='flex rounded-xl bg-gray-100 p-2'>
        {this.state.filters.map(item => {
          return (
            <FilterItem
              defaultChecked={status === item.id}
              label={item.label}
              id={item.id}
              key={item.id}
              onClick={this.handleClickFilter}
            />
          )
        })}
      </div>
    )
  }
}
