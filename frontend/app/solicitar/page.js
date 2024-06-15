// frontend/pages/index.js
'use client';
import "../../assets/js/color-modes.js";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import grid from "../../css/grid.css";
import Sidebar from "../sidebars.js";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Solicitar() {
  const [paciente, setPaciente] = useState('');
  const [destino, setDestino] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [obs, setObs] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [cookie, setCookie] = useCookies(['auth']);

  const getPacientes = () => {
    try {
      axios.get('http://localhost:8080/pacientes', {
        headers: {
          authorization: ["token", cookie.access_token].join(" "),
        }
      })//Request para pegar histórico (get, rota)
        .then((response) => {
          console.log(response);
          setPacientes(response.data);//Atribuo ao historico os dados da response
        })
    } catch (error) {
      console.log(error);
    }
  }


  const solicitar = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/solicitar', {
      origem: pacientes.filter(item => item.ID_paciente == paciente)[0].Localização_Atual,
      paciente: paciente,
      destino: destino,
      prioridade: prioridade,
      obs: obs,
      maqueiro: cookie.id,
    }, {
      headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }
    })
      .then(function (response) {
        console.log(response);
        alert('Transporte solicitado com sucesso!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {//Hook do React que executa 1 vez na montagem da página
    getPacientes();
  }, [])
  return (
    <Sidebar>
      <div className="container">
        <h2 className="mt-4">Solicitar Transporte</h2>


        <Form onSubmit={(e) => solicitar(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label>Paciente</Form.Label>
              <Form.Select 
                onChange={(e) => setPaciente(e.target.value)}
                value={paciente}>
                {pacientes && pacientes.map((paciente, index) => (<option key={index} value={paciente.ID_paciente}>{paciente.Nome}</option>))}

              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDestino">
              <Form.Label>Destino</Form.Label>
              <Form.Select 
                onChange={(e) => setDestino(e.target.value)}
                value={destino}
              > <option >Selecione...</option>
                <option value='Leito 1'>Leito 1</option>
                <option value='Leito 2'>Leito 2</option>
                <option value='Leito 3'>Leito 3</option>
                <option value='Leito 4'>Leito 4</option>
                <option value='Leito 5'>Leito 5</option>
                <option value='Leito 6'>Leito 6</option>
                <option value='Leito 7'>Leito 7</option>
                <option value='Leito 8'>Leito 8</option>
                <option value='Leito 9'>Leito 9</option>
                <option value='Leito 10'>Leito 10</option>
                <option value='Leito 11'>Leito 11</option>
                <option value='Leito 12'>Leito 12</option>
                <option value='Leito 13'>Leito 13</option>
                <option value='Leito 14'>Leito 14</option>
                <option value='Leito 15'>Leito 15</option>
                <option value='Leito 16'>Leito 16</option>
                <option value='Leito 17'>Leito 17</option>
                <option value='Leito 18'>Leito 18</option>
                <option value='Leito 19'>Leito 19</option>
                <option value='Leito 20'>Leito 20</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Prioridade</Form.Label>
              <Form.Select 
                onChange={(e) => setPrioridade(e.target.value)}
                value={prioridade}
              > <option >Selecione...</option>
                <option value='Alta'>Alta</option>
                <option value='Media'>Média</option>
                <option value='Baixa'>Baixa</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                onChange={(e) => setObs(e.target.value)}
                value={obs}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Solcitar
          </Button>
        </Form>



      </div>
    </Sidebar>
  );
}

