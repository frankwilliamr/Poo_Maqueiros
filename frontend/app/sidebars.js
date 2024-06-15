// frontend/pages/index.js
'use client';
import "../assets/js/color-modes.js";
import sidebars from "../css/sidebars.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useCookies } from 'react-cookie';

export default function Sidebar({ children }) {
  const [cookie, setCookie] = useCookies(['auth']);

  return (
    <>
      <div className="d-flex flex-nowrap" >
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: "280px" }}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Transporte de Macas</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="/solicitacoes" className="nav-link text-white" aria-current="page">
                Solicitações
              </a>
            </li>
            <li>
              <a href="/historico" className="nav-link text-white">
                Historico
              </a>
            </li>
            <li>
              <a href="/solicitar" className="nav-link text-white">
                Solcitar Transporte
              </a>
            </li>
            <li>
              <a href="/pacientes" className="nav-link text-white">
                Cadastro de Pacientes
              </a>
            </li>
            {
              cookie.cargo == "Enfermeiro" &&
              < li >
                <a href="/usuarios" className="nav-link text-white">
                  Cadastro de Usuarios
                </a>
              </li>
            }
          </ul>
          <hr />
          <div className="dropdown">
            <Dropdown as={ButtonGroup}>
              <Button variant="secondary">Perfil</Button>
              <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item href="./login">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="b-example-divider b-example-vr"></div>
        {children}
      </div >
    </>
  );
}

/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()
