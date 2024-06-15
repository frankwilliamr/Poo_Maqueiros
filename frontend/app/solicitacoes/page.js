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
import { useRouter } from 'next/navigation';


export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [cookie, setCookie] = useCookies(['auth']);
  const [Local_Destino, setLocal_Destino] = useState('');

  const router = useRouter()
  const getSolicitacoes = () => {
    try {
      axios.get('http://localhost:8080/solicitacoes', {
        headers: {
          authorization: ["token", cookie.access_token].join(" "),
        }
      })//Request para pegar histórico (get, rota)
        .then((response) => {
          console.log(response);
          setSolicitacoes(response.data);//Atribuo ao historico os dados da response
        })
    } catch (error) {
      console.log(error);
    }
  }
  const putSolicitacoes = (id, e) => {
    e.preventDefault()
    try {
      axios.post('http://localhost:8080/aceitar', {
        id: id,

      }, {headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }})//Request para pegar histórico (get, rota)
        .then((response) => {
          console.log(response);
          getSolicitacoes();//Atribuo ao historico os dados da response
        })
    } catch (error) {
      console.log(error);
    }
  }
  const concluir = (id, e) => {
    e.preventDefault()
    try {
      axios.post('http://localhost:8080/concluir', {
        id: id,
        

      },{headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }} )//Request para pegar histórico (get, rota)
        .then((response) => {
          console.log(response);
          getSolicitacoes();//Atribuo ao historico os dados da response
        })
    } catch (error) {
      console.log(error);
    }
  }

  const deletar = (id, e) => {
    e.preventDefault()
    try {
      axios.post('http://localhost:8080/deletar', {
        id: id,
        

      },{headers: {
        authorization: ["token", cookie.access_token].join(" "),
      }} )//Request para pegar histórico (get, rota)
        .then((response) => {
          console.log(response);
          getSolicitacoes();//Atribuo ao historico os dados da response
        })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {//Hook do React que executa 1 vez na montagem da página
    getSolicitacoes();
  }, [])

  return (
    <Sidebar>
      <div className="container">
        <h2 className="mt-4">Solicitações</h2>
        {solicitacoes.map((row, index) => {
          return (
            <div className="row mb-3 text-center" key={index}>
              <div className="col-md-8 themed-grid-col">
                <div className="pb-3">
                  {row.Nome}

                </div>
                <div className="row">
                  <div className="col-md-6 themed-grid-col"> Prioridade: {row.Prioridade}</div>
                  <div className="col-md-6 themed-grid-col">Status: {row.Status_Transporte}</div>
                </div>
              </div>
              <div className="col-md-4 themed-grid-col">
                <p>
                  Destino {row.Local_Origem} para destino {row.Local_Destino}
                </p>
                <ButtonGroup>
                  {row.Status_Transporte == 'Aguardando' && <><Button variant="success" onClick={(e) => putSolicitacoes(row.ID_solicitacao, e)}>Aceitar</Button>
                    <Button variant="danger" onClick={(e) => deletar(row.ID_solicitacao, e)}>Recusar</Button></>}
                  {row.Status_Transporte == 'Em andamento' && <><Button variant="success" onClick={(e) => concluir(row.ID_solicitacao, e)}>Concluir</Button>
                  </>}
                  <Button variant="primary button" onClick={() => router.push(`/incidente?solicitacao=${row.ID_solicitacao}`)} >Incidente</Button>
                </ButtonGroup>
              </div>
            </div>
          );
        })}
      </div>
    </Sidebar>
  );
}

