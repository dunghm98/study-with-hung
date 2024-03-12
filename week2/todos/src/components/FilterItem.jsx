import { Component } from 'react'

export default class FilterItem extends Component {
  render () {
    const { label, id, defaultChecked, onClick } = this.props
    return (
      <div onClick={() => onClick(id)}>
        <input
          type='radio'
          name='option'
          id={id}
          defaultValue={id}
          className='peer hidden'
          defaultChecked={defaultChecked}
        />
        <label
          htmlFor={id}
          className='text-sm block cursor-pointer select-none rounded-xl py-1 px-4 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
        >
          {label}
        </label>
      </div>
    )
  }
}
