import { Component, createRef } from 'react'
import TodoItem from './TodoItem'
import Filter from './Filter'
import { produce } from 'immer'
import { TASK_STATUS } from '../constant'

export default class TodoList extends Component {
  constructor () {
    super()
    this.state = {
      todoList: [],
      filterStatus: TASK_STATUS.all.id
    }
    this.inputRef = createRef()
  }

  handleAddNewItem = () => {
    const currentInputValue = this.inputRef.current.value
    if (!currentInputValue) {
      return
    }
    const newItem = {
      id: `task_${this.state.todoList.length + 1}`,
      title: currentInputValue,
      status: TASK_STATUS.active.id
    }
    this.setState({
      todoList: [...this.state.todoList, newItem]
    })
    this.inputRef.current.value = ''
  }
  handleRemoveItem = removeId => {
    const newToDoList = this.state.todoList.filter(item => item.id !== removeId)
    this.setState({ todoList: newToDoList })
  }
  handleCompleteItem = selectedId => {
    const newToDoList = this.state.todoList.map(item => {
      if (item.id === selectedId) {
        const selectedItem = { ...item }
        if (selectedItem.status === TASK_STATUS.done.id) {
          selectedItem.status = TASK_STATUS.active.id
        } else if (selectedItem.status === TASK_STATUS.active.id) {
          selectedItem.status = TASK_STATUS.done.id
        }
        return selectedItem
      }
      return item
    })

    this.setState({
      todoList: newToDoList
    })
  }
  handleDoneEdit = ({ id, value }) => {
    this.setState(prevState => ({
      todoList: produce(prevState.todoList, draft => {
        const index = draft.findIndex(item => item.id === id)
        if (index !== -1) {
          draft[index].title = value
        }
      })
    }))
  }

  handleFilterStatus = status => {
    this.setState({
      filterStatus: status
    })
  }
  handleClearComplete = () => {
    const newTodoList = this.state.todoList.filter(
      item => item.status !== TASK_STATUS.done.id
    )
    this.setState({ todoList: newTodoList })
  }
  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleAddNewItem()
    }
  }

  render () {
    const displayData =
      this.state.filterStatus === TASK_STATUS.all.id
        ? this.state.todoList
        : this.state.todoList.filter(
            item => item.status === this.state.filterStatus
          )

    return (
      <div className='flex items-center justify-center w-screen h-screen font-medium'>
        <div className='flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100'>
          <div className='max-w-full p-8 bg-white rounded-lg shadow-lg w-96'>
            <div className='flex items-center mb-6'>
              <svg
                className='h-8 w-8 text-indigo-500 stroke-current'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                />
              </svg>
              <h4 className='font-semibold ml-3 text-lg'>Todo List</h4>
            </div>
            <Filter
              status={this.state.filterStatus}
              onFiler={this.handleFilterStatus}
            />
            <div className='flex items-center w-full h-8 pl-2 mt-2 mb-4 '>
              <input
                ref={this.inputRef}
                className='flex-grow h-8 mr-4 bg-transparent focus:outline-none font-medium border border-gray-300 p-2.5 rounded-md'
                type='text'
                placeholder='Add a new task'
                defaultValue=''
                onKeyDown={this.handleKeyDown}
              />
              <button
                onClick={this.handleAddNewItem}
                className='text-sm font-medium rounded'
              >
                <svg
                  className='w-5 h-5 text-gray-400 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
              </button>
            </div>
            {displayData &&
              displayData.map((item, index) => {
                return (
                  <TodoItem
                    id={item.id}
                    defaultChecked={item.status === TASK_STATUS.done.id}
                    title={item.title}
                    key={index}
                    onRemove={this.handleRemoveItem}
                    onComplete={this.handleCompleteItem}
                    onDoneEdit={this.handleDoneEdit}
                  />
                )
              })}
            <div className='bottom-action text-right mt-4'>
              <button
                onClick={this.handleClearComplete}
                className='text-yellow-600 text-sm hover:text-yellow-500'
              >
                Clear complete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
