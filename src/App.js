import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // armazena as informações das regiões e seus respectivos estados
  const [regioes, setRegioes] = useState([]);

  // useEffect é usado para fazer a busca de dados da API
  useEffect(() => {
    // Função para buscar os estados do Brasil a partir da API do IBGE
    const fetchEstados = async () => {
      try {
        // Realiza a requisição para a API
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const data = await response.json();

        // Ordem desejada para exibir as regiões
        const ordemRegioes = ["Sul", "Sudeste", "Centro-Oeste", "Nordeste", "Norte"];

        // Organiza os dados em um array com as regiões e seus respectivos estados
        const regioesArray = ordemRegioes.map((nomeRegiao) => {
          // Filtra os estados de acordo com a região
          const estadosDaRegiao = data.filter((estado) => estado.regiao.nome === nomeRegiao);
          
          // Ordena os estados da região em ordem alfabética
          const estadosOrdenados = estadosDaRegiao.sort((a, b) => a.nome.localeCompare(b.nome));

          // Cria um objeto representando a região com nome, sigla e lista de estados
          const nome = nomeRegiao;
          const sigla = estadosDaRegiao[0].regiao.sigla;
          const estados = estadosOrdenados.map((estado) => ({
            nome: estado.nome,
            sigla: estado.sigla
          }));

          return {
            nome,
            sigla,
            estados
          };
        });

        // Atualiza o estado com os dados das regiões e estados
        setRegioes(regioesArray);
      } catch (error) {
        // Caso ocorra algum erro na requisição, ele é registrado no console
        console.error("Erro ao buscar dados da API", error);
      }
    };

    // Chama a função para buscar os dados
    fetchEstados();
  }, []);

  return (
    <div className="container">
      <nav className='navbar'>
        <div className='logo'></div>
      </nav>
      
      <div className='title'>
        <h1>Estados do Brasil por Região</h1>
        <div className='barra'></div>
      </div>
      
      <div className='position-cards'>
        <div className="regions-container">
          {/* Mapeia cada região para exibir seus estados */}
          {regioes.map((regiao) => (
            <div key={regiao.nome} className="region-card">
              <h2>{regiao.nome} - {regiao.sigla}</h2>
              <div className='border'></div>
              <ul>
                {/* Lista cada estado da região */}
                {regiao.estados.map((estado) => (
                  <li key={estado.sigla}>{estado.nome} - {estado.sigla}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
