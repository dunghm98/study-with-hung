import { Component } from 'react'
import FilterItem from './FilterItem'
import { TASK_STATUS } from '../constant'

export default class Filter extends Component {
  constructor () {
    super()
    this.state = {
      filters: [
        {
          label: TASK_STATUS.all.label,
          id: TASK_STATUS.all.id
        },
        {
          label: TASK_STATUS.active.label,
          id: TASK_STATUS.active.id
        },
        {
          label: TASK_STATUS.done.label,
          id: TASK_STATUS.done.id
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
        {this.state.filters.map((item, index) => {
          return (
            <FilterItem
              defaultChecked={status === item.id}
              label={item.label}
              id={item.id}
              key={index}
              onClick={this.handleClickFilter}
            />
          )
        })}
      </div>
    )
  }
}
