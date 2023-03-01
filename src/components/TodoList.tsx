import React from 'react';
import { useState } from 'react';
import './TodoList.css';

type TodoTypes = {
    id: number;
    title: string;
    description: string;
};

type Props = {
  todos: TodoTypes[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {todos.map(todo => {
        return (
            <tr
                key={todo.id}
                className="app__item"
                onClick={() => {setTitle(todo.title)
                    setDescription(todo.description)
                    setOpenModal(true)}}
            >
                <td className="app__info">
                    {todo.id}
                </td>
                <td className="app__info">
                    {todo.title}
                </td>
                <td className="app__info">
                    {todo.description}
                </td>
                <td className="app__info">
                    <input
                        type="checkbox"
                    />
                </td>
            </tr>
        );
      })}

      {openModal && (
            <div className='modal__background'>
                <div className='modal__container'>
                    <div className='title'>{title}</div>
                    <div className='body'>
                        <p className='description'>Description:</p>
                        {description}
                    </div>
                    <div className='footer' style={{marginBottom:'1rem'}}>
                        Status
                        <input
                            type="checkbox"
                            defaultChecked={true}
                        />
                    </div>
                    <button
                        style={{width:'min-content'}}
                        onClick={() => setOpenModal(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </>
  );
};
