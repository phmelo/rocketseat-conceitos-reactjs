import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[/**repositories */]) 
  //Embora tenha funcionado no site, nos testes deu memory leak

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Application F#"
    });
    const repo = response.data;
    setRepositories([...repositories,repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    // Precisa dessa parte se for usar o repositories no useEffect.
    // const repoIndex = repositories.findIndex(repo => repo.id === id);
    // if (repoIndex > 0){
    //   repositories.splice(repoIndex,1)
    // }
    
    // Embora tenha funcionado no site, não funcionou para os testes
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
  
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
