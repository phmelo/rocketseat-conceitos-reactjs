import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[], console.log(repositories)) 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Application F#"
    });
    const repo = response.data;
    setRepositories([...repositories,repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(r => r.id !== id));
  }
    
   
    // Embora tenha funcionado no site, não funcionou para os testes
    // api.get('repositories').then(response => {
    //   setRepositories(response.data);
    // });

  

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
