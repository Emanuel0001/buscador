import './style.css';
import { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { findAllInRenderedTree } from 'react-dom/test-utils';
import api from './services/api'


function App() {
  const [cep, setCep] = useState("");
  const [errSeach, setErrSeach] = useState('');
  const [informacoes, setInformacoes] = useState('');


  function validaCep(event) {
    setCep(event.target.value)
  }

  async function submitForm(event) {
    event.preventDefault();
    setErrSeach("")

    if (cep === '') {
      setErrSeach("CEP Invalido!")
    }
    try {
      event.preventDefault();
      const response = await api.get(`${cep}/json`);
      setInformacoes(response.data)
    }
    catch {
      setErrSeach("ops erro ao buscar")
      setCep('')
    }
  }
  console.log(cep)
  return (

    <div className='App'>
      <div className="container">

        <form onSubmit={submitForm}>
          <h1 className='title'>Buscador de CEP...</h1>
          <input
            type="text"
            value={cep}
            onChange={validaCep}
            placeholder='Digite seu cep...' />

          <button
            className='buttonSearch'
            type='submit'
          ><FiSearch size={25} color="blue" /></button>
        </form>
        <div className='errMessage' > {errSeach}</div>
        {Object.keys(informacoes).length > 0 && (
          <main className='main'>
            <h2>CEP - {informacoes.cep}</h2>
            <span>DDD - {informacoes.ddd}</span>
            <span> {informacoes.localidade} - {informacoes.uf} </span>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
