// frontend/pages/index.js
'use client';
import "../../assets/js/color-modes.js";
import Button from 'react-bootstrap/Button';
import grid from "../../css/grid.css";
import Sidebar from "../sidebars.js";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';


export default function Pacientes() {
  const [nome, setNome] = useState('');
  const [prontuario, setProntuario] = useState('');
  const [validated, setValidated] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [leito, setLeito] = useState('');
  const [cookie, setCookie] = useCookies(['auth']);

  const createPaciente = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      console.log('Data selecionada:', selectedDate);
    }

    setValidated(true);

    axios.post('http://localhost:8080/paciente', {
      nome: nome,
      prontuario: prontuario,
      data_nascimento: selectedDate,
      leito: leito
    }, {headers: {
      authorization: ["token", cookie.access_token].join(" "),
    }})
      .then(function (response) {
        console.log(response);
        alert('Paciente cadastrado com sucesso!');
      })
      .catch(function (error) {
        console.log(error);
      });
    // window.location.reload();
  };

  return (
    <Sidebar>
      <div className="container">
        <h2 className="mt-4" >Cadstro de Pacientes</h2>
        <Form noValidate validated={validated} onSubmit={(e) => createPaciente(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome completo"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="2" controlId="validationCustom03">
              <Form.Label>Número de prontuario</Form.Label>
              <Form.Control type="number"
                placeholder=""
                value={prontuario}
                onChange={(e) => setProntuario(e.target.value)}
                required />
              <Form.Control.Feedback type="invalid">
                Insira apenas números.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Leito de entrada</Form.Label>
              <Form.Select 
                onChange={(e) => setLeito(e.target.value)}
                value={leito}>
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
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit">Cadastrar paciente</Button>
        </Form> </div>
    </Sidebar>
  );
}

