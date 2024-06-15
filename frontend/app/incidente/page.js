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
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useCookies } from 'react-cookie';

export default function Incidente() {
  const { transporte, setTransporte } = useState([]);
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState(false);
  const [incidente, setIncidente] = useState('');
  const [horaincidente, setHoraincidente] = useState('');
  const [cookie, setCookie] = useCookies(['auth']);

  const searchParams = useSearchParams()

  const search = searchParams.get('solicitacao')

  const router = useRouter()

  const createIncidente = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/incidente', {
      id: search,
      horaincidente: horaincidente,
      data: data,
      incidente: incidente,
    }, {
      headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }
    })
      .then(function (response) {
        console.log(response);
        router.push('/solicitacoes');
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (

    <Sidebar>
      <div className="container">
        <h2 className="mt-4" >Incidente</h2>
        <Form noValidate validated={validated} onSubmit={(e) => createIncidente(e)}>
          <Row className="mb-2">
            <Form.Group as={Col} md="2" >
              <Form.Label htmlFor="appt" >Hora</Form.Label>
              <Form.Control
                type="time"
                name="appt"
                id="appt"
                min="09:00"
                max="18:00"
                required
                aria-describedby="inputGroupPrepend"
                value={horaincidente}
                onChange={(e) => setHoraincidente(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" >
              <Form.Label>Data do Incidente</Form.Label>
              <Form.Control
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group md="6" >
              <Form.Label>Informações do Incidente</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                value={incidente}
                onChange={(e) => setIncidente(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Cadstrar Incidente</Button>
        </Form>
      </div>
    </Sidebar>
  );
}