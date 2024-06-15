// frontend/pages/index.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import login from '../../css/login.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [cookie, setCookie] = useCookies(['auth']);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      axios.post('http://localhost:8080/login', {
        email: email,
        password: password
      })
        .then(function (response) {
          console.log(response.data);
          setMessage('Login successful!');
          
          let now = new Date();
          now.setMinutes(now.getMinutes() + 60);

          setCookie('access_token', response.data.token, { expires: now, path: '/', secure: true, sameSite: 'Lax' });
          setCookie('cargo', response.data.Cargo, { path: '/', secure: true, sameSite: 'Lax' });
          setCookie('nome', response.data.Nome, { path: '/', secure: true, sameSite: 'Lax' });
          setCookie('id', response.data.id, { path: '/', secure: true, sameSite: 'Lax' });

          router.push('/solicitacoes');
        })
        .catch(function (error) {
          console.log(error);
          alert('Login ou senha incorreto');
        });;
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      
    }
  };

  return (
   <Container className="login-container">
    <Form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
      </div>
      <div className="form-group">
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
      </div>
      <button type="submit" className="submit-button">Entrar</button>
    </Form>
    </Container>
  );
}
