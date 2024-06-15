// frontend/pages/index.js
'use client';
import "../../assets/js/color-modes.js";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import grid from "../../css/grid.css";
import Sidebar from "../sidebars.js";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [cookie, setCookie] = useCookies(['auth']);
  const getHistorico = () => {
    
    try {
      axios.get('http://localhost:8080/historico', {headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }})//Request para pegar histórico (get, rota)
        .then((response) => {
          console.log(response);
          setHistorico(response.data);//Atribuo ao historico os dados da response
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {//Hook do React que executa 1 vez na montagem da página
    getHistorico();
  }, [])

  return (
    <Sidebar>
      <div className="container">
        <h2 className="mt-4">Histórico</h2>

        {historico.map((row, index) => {
          return (
            <div className="row mb-3 text-center" key={index}>
              <div className="col-md-8 themed-grid-col">
                <div className="pb-3">
                  {row.pacienteNome}
                </div>
                <div className="row">
                  <div className="col-md-6 themed-grid-col">Prioridade: {row.Prioridade}</div>
                  <div className="col-md-6 themed-grid-col">Status: {row.Status_Transporte}</div>
                </div>
              </div>
              <div className="col-md-4 themed-grid-col">
                <p>
                 Transferida do local {row.pacienteLocal} para o local {row.Local_Destino} pelo maqueiro {row.maqueiroNome} 
                 <br/>Incidente: {row.Descricao_incidente}
                </p>
                  <p>{row.incidente}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Sidebar>
  );
}


