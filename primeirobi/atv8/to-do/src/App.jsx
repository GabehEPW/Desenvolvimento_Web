import { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = (e) => {
    e.preventDefault();

    if (novaTarefa.trim() === "") {
      return;
    }

    const nova = {
      id: Date.now(),
      text: novaTarefa,
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa("");
  };

  const removerTarefa = (id) => {
    const novaLista = tarefas.filter(
      (tarefa) => tarefa.id !== id
    );

    setTarefas(novaLista);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />

        <button type="submit">
          Adicionar
        </button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.text}

            <button
              onClick={() => removerTarefa(tarefa.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;