import React from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

import './App.css';

type State = {
  todos: any[],
  id: number,
  title: string,
  description: string,
  hasTitleError: boolean;
  hasDescriptionError: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: [],
    id: 1,
    title: '',
    description: '',
    hasTitleError: false,
    hasDescriptionError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasTitleError: false,
    });
  };

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: event.target.value,
      hasDescriptionError: false,
    });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { todos, id, title, description } = this.state;

    event.preventDefault();

    if (!title) {
      this.setState({
        hasTitleError: !title,
      });
    }

    if (!description) {
      this.setState({
        hasDescriptionError: !description,
      });
    }

    if (title && description) {
      const newTodo = {
        id,
        title,
        description,
      };

      this.setState((prevState) => {
        return {
          id: prevState.id + 1,
          title: '',
          description: '',
          todos: [
            ...prevState.todos,
            newTodo,
          ],
        };
      });
    }
  };

  render () {
    const {
      todos,
      title,
      description,
      hasTitleError,
      hasDescriptionError,
    } = this.state;

    const {
      handleFormSubmit,
      handleDescriptionChange,
      handleTitleChange,
    } = this;

    return (
      <div className="app">
      <div className="app__container">
        <h1>ToDoList</h1>
        <form className="app__form" onSubmit={handleFormSubmit}>

          <div className='app__form-section'>Title:
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
              className={classNames('app__input', {
                'field-error': hasTitleError,
              })}
            />
            {hasTitleError && (
              <span className="error">
                This field is empty
              </span>
            )}
          </div>

          <div className='app__form-section'>Description:
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
              className={classNames('app__input', {
                'field-error': hasDescriptionError,
              })}
            />
            {hasDescriptionError && (
              <span className="error">
                This field is empty
              </span>
            )}
          </div>

          <button
            type="submit"
            className="app__button"
          >
            Create
          </button>
        </form>

        <table className='app__table'>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>STATUS</th>
          </tr>
          <TodoList todos={todos}/>
        </table>
      </div>
    </div>
  )};
}

export default App;
