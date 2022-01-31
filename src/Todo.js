import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { IoCheckmarkDoneCircleOutline, IoTrashBin } from "react-icons/io5";
import useSound from "use-sound";
import ding from "./assets/ding.mp3";

export default function Todo() {
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  const [edit, setEdit] = useState({});

  const [play] = useSound(ding, {
    sprite: {
      done: [5002, 527],
    },
  });

  localStorage.setItem("todos", JSON.stringify(todos));

  const addTodo = (event) => {
    event.preventDefault();

    if (edit.id) {
      const editedTodo = {
        id: edit.id,
        activity,
        done: edit.done,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const updatedTodo = [...todos];

      updatedTodo[editTodoIndex] = editedTodo;

      setTodos(updatedTodo);
      setActivity("");
      setEdit({});
      return;
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
        done: false,
      },
    ]);
    setActivity("");
  };

  const generateId = () => {
    return Date.now();
  };

  const removeTodo = (id) => {
    const filteredTodo = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filteredTodo);
  };

  const editTodo = (todo) => {
    setActivity(todo.activity);
    setEdit(todo);
  };

  const doneTodo = (todo) => {
    const editedTodo = {
      ...todo,
      done: !todo.done,
    };
    const editTodoIndex = todos.findIndex((currentTodo) => {
      return todo.id === currentTodo.id;
    });

    const updatedTodo = [...todos];

    updatedTodo[editTodoIndex] = editedTodo;

    if (editedTodo.done) {
      const [reorderedItem] = updatedTodo.splice(editTodoIndex, 1);
      updatedTodo.splice(updatedTodo.length, 0, reorderedItem);
    }

    setTodos(updatedTodo);

    if (!todo.done) {
      play({ id: "done" });
    }
  };

  const handleDrags = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  function todoDoneLength() {
    return todos.filter((todo) => {
      return todo.done === true;
    }).length;
  }

  return (
    <div className="w-full bg-black bg-opacity-50 rounded-xl px-8 py-6 max-h-full mb-5">
      <div className="flex flex-row justify-between items-center mb-4 px-4">
        <h1 className="font-bold text-xl text-white h-fit">📌 TO-DO</h1>
        <div className="w-60 text-xs flex flex-row gap-3 items-center text-gray">
          <p className="text-center">
            {todoDoneLength()}/{todos.length}
          </p>
          <div className="w-full text-center h-3 flex flex-row items-center rounded-xl bg-gray6 overflow-hidden">
            <span
              className="bg-green h-full animate-pulse transition-width duration-300"
              style={{ width: `${(todoDoneLength() / todos.length) * 100}%` }}
            ></span>
          </div>
        </div>
      </div>
      <div className="mb-2 max-h-60 overflow-y-auto">
        {todos.length !== 0 ? null : (
          <div className="flex flex-col items-center my-2">
            <IoCheckmarkDoneCircleOutline
              className="text-green animate-wiggle"
              size="40px"
            />
            <p className="text-white">No task to do</p>
          </div>
        )}
        <DragDropContext onDragEnd={handleDrags}>
          <Droppable droppableId="todo">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((x, index) => {
                  return (
                    <Draggable key={x.id} draggableId={`${x.id}`} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            "min-h-fit bg-gray6 my-1 mr-1 transition-colors overflow-y-hidden rounded-xl flex flex-row justify-between group items-stretch " +
                            (x.done ? "opacity-40" : "")
                          }
                        >
                          {edit.id === x.id ? (
                            <form onSubmit={addTodo} className="w-full">
                              <input
                                autoFocus
                                type="text"
                                className="outline-none w-full border border-dashed bg-gray6 border-blue text-center text-white rounded-xl h-14"
                                placeholder="Edit your todo"
                                value={activity}
                                onChange={(event) =>
                                  setActivity(event.target.value)
                                }
                                required
                                onBlur={(event) => {
                                  setEdit({});
                                  setActivity("");
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Escape") {
                                    setEdit({});
                                    setActivity("");
                                  }
                                }}
                              />
                            </form>
                          ) : (
                            <>
                              <div className="flex flex-row items-center w-full">
                                <input
                                  type="checkbox"
                                  onChange={doneTodo.bind(this, x)}
                                  checked={x.done}
                                  className="h-16 scale-[1.75] ml-6 mr-4"
                                />
                                <p
                                  className={
                                    "text-white text-xl max-w-full break-words w-96 h-full flex items-center " +
                                    (x.done ? "line-through text-gray3" : "")
                                  }
                                  onClick={
                                    x.done ? null : editTodo.bind(this, x)
                                  }
                                >
                                  {x.activity}
                                </p>
                              </div>
                              <button
                                onClick={removeTodo.bind(this, x.id)}
                                className="w-0 bg-red rounded-r-xl flex flex-row justify-center items-center transition-width duration-300 group-hover:w-14"
                              >
                                <IoTrashBin
                                  size="20px"
                                  className="text-white"
                                />
                              </button>
                            </>
                          )}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          className="outline-none w-full border border-dashed bg-gray6 border-gray2 text-center transition-colors text-white rounded-md h-9 focus:border-blue"
          placeholder="what is your plan today?"
          value={edit.id ? "" : activity}
          onChange={(event) => setActivity(event.target.value)}
          disabled={edit.id ? true : false}
          required
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setEdit({});
              setActivity("");
            }
          }}
        />
      </form>
    </div>
  );
}
