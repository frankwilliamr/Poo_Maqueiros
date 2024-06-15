'use client';
import "../../assets/js/color-modes.js";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import grid from "../../css/grid.css";
import Sidebar from "../sidebars.js";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';


export default function Usuario() {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cookie, setCookie] = useCookies(['auth']);

  const createUsuarios = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    axios.post('http://localhost:8080/usuarios', {
      nome: nome,
      funcao: funcao,
      email: email,
      senha: senha
    }, {
      headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }
    })
      .then(function (response) {
        console.log(response);
        alert('Usuario cadastrado com sucesso!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {
        cookie.cargo == "Enfermeiro" &&
        <Sidebar>
          <div className="container">
            <h2 className="mt-4" >Cadstro de Usuarios</h2>
            <Form noValidate validated={validated} onSubmit={(e) => createUsuarios(e)}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nome completo"
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                  />
                  <Form.Control.Feedback>Feito</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Função</Form.Label>
                  <Form.Select 
                    onChange={(e) => setFuncao(e.target.value)}
                    value={funcao}>
                    <option value='Administrador'>Administrador</option>
                    <option value='Maqueiro'>Maqueiro</option>

                  </Form.Select>
                  <Form.Control.Feedback>Feito</Form.Control.Feedback>
                </Form.Group>

              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                  <Form.Label>E-mail</Form.Label>
                  <InputGroup hasValidation>

                    <Form.Control
                      type="email"
                      placeholder="Email"

                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Informe um email correto.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="validationCustom03">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="" required
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha} />
                  <Form.Control.Feedback type="invalid">
                    Por favor, use uma senha válida.
                  </Form.Control.Feedback>
                </Form.Group>


              </Row>

              <Button type="submit">Cadstrar Usuario</Button>
            </Form> </div>
        </Sidebar>
      }
    </>
  );
}