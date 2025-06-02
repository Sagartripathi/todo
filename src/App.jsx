import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function App() {
  const [name, setName] = useState("");
  const [todolist, setTodolist] = useState([]);

  //for local storage

  useEffect(() => {
    const saved = localStorage.getItem("todolist");
    if (saved) {
      setTodolist(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }, [todolist]);

  function handleType(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    if (name.trim() === "") {
      alert("Type something first");
      return;
    }
    // Add new todo with a selected flag
    setTodolist([
      ...todolist,
      { id: Date.now(), name: name.trim(), selected: false },
    ]);
    setName("");
  }

  function toggleSelect(id) {
    setTodolist((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  }

  function handleDelete(id) {
    setTodolist((prev) => prev.filter((todo) => todo.id !== id));
  }

  // return (
  //   <div className="flex flex-col items-center min-h-screen bg-gray-100 sm:w-auto">
  //     <div className="bg-violet-900 w-6xl h-14 m-14 text-white text-center flex items-center justify-center rounded-lg shadow-lg sm:w-auto">
  //       Todo App
  //     </div>

  //     <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white w-150">
  //       <input
  //         type="text"
  //         placeholder="Enter title"
  //         className="border border-gray-300 rounded-lg p-2 w-130 focus:outline-none focus:ring-2 focus:ring-violet-500"
  //         value={name}
  //         onChange={handleType}
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter") handleAdd();
  //         }}
  //       />
  //       <button
  //         className="bg-violet-900 text-white p-2 w-30 rounded hover:bg-violet-800"
  //         onClick={handleAdd}
  //         onEvent
  //       >
  //         ADD
  //       </button>
  //     </div>

  //     <div className="flex flex-col items-left justify-center gap-4 border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white w-150 mt-6">
  //       <ul className="radio-list">
  //         {todolist.map((todo) => (
  //           <li key={todo.id} className="flex items-center justify-between p-3">
  //             <div className="flex items-center">
  //               <input
  //                 type="checkbox"
  //                 className="mr-3"
  //                 checked={todo.selected}
  //                 onChange={() => toggleSelect(todo.id)}
  //               />
  //               <span className={`${todo.selected ? " line-through" : " "}`}>
  //                 {todo.name}
  //               </span>
  //             </div>
  //             {todo.selected && (
  //               <MdDelete
  //                 className="cursor-pointer"
  //                 onClick={() => handleDelete(todo.id)}
  //               />
  //             )}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-violet-900 w-full max-w-2xl h-14 mb-8 text-white text-center flex items-center justify-center rounded-lg shadow-lg text-xl font-semibold">
        Todo App
      </div>

      <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter title"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={name}
          onChange={handleType}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <button
          className="bg-violet-900 text-white px-4 py-2 w-full sm:w-auto rounded hover:bg-violet-800"
          onClick={handleAdd}
        >
          ADD
        </button>
      </div>

      <div className="flex flex-col items-start justify-center gap-4 border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white w-full max-w-2xl mt-6">
        <ul className="w-full">
          {todolist.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 border-b border-gray-200 last:border-none"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={todo.selected}
                  onChange={() => toggleSelect(todo.id)}
                />
                <span
                  className={`${
                    todo.selected ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.name}
                </span>
              </div>
              {todo.selected && (
                <MdDelete
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(todo.id)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
