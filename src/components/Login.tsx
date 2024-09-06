import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './styleLogin.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';

import { useParams } from 'react-router-dom';
import { ClienteInterface } from '../interfaces/ClienteInterface';

function LoginForm() {
    const [emailLogin, setEmaiLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [user, setUser] = useState(false);
    const [message, setMessage] = useState(false);

    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [salario, setSalario] = useState<string>("");









    const testarUsuario = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            email: emailLogin,
            password: passwordLogin,
        }

        axios.post('http://127.0.0.1:8000/api/login', dados, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.data.status === true) {
                setNome(response.data.data.nome);
                setCpf(response.data.data.cpf);
                setEmail(response.data.data.email);
                setCep(response.data.data.cep);
                setEstado(response.data.data.estado);
                setCidade(response.data.data.cidade);
                setCelular(response.data.data.celular);
                setPais(response.data.data.pais);
                setRua(response.data.data.rua);
                setNumero(response.data.data.numero);
                setBairro(response.data.data.bairro);
                setComplemento(response.data.data.complemento);
                setSalario(response.data.data.salario);
                setLoginSuccess(true);
                setUser(response.data.usuario);
                setMessage(response.data.message);

            } else {
                Swal.fire({
                    title: "Erro",
                    text: "Login não foi bem-sucedido",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }).catch(function (error) {
            console.log(error);
        })
    }





    return (
        <div>
            <NavBar />
            {loginSuccess ? (
                <div className="myApp-login-container" id="home">


                    <div className='container'>

                        <div className='card'>
                            <div className='card-body'>
                                <h6>{user}</h6>
                                <h4 className='card-title display-6 '>{message}</h4>

                                <hr />


                                <form className='row g-3'>
                                    <div className='col-6'>
                                        <label htmlFor="nome" className='form-label'>Nome</label>
                                        <input type="text" value={nome} name='nome' id='nome' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="email" className='form-label' >E-mail</label>
                                        <input type="email" value={email} name='emaill' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="cpf" className='form-label'>CPF</label>
                                        <input type="text" value={cpf} name='cpf' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="cpf" className='form-label'>Data de Nascimento</label>
                                        <input type="date" value={dataNascimento} name='dataNascimento' className='form-control' readOnly required />

                                    </div>


                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Cep</label>
                                        <input type="text" value={cep} name='cep' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="cpf" className='form-label'>Estado</label>
                                        <input type="text" name='estado' value={estado} className='form-control' readOnly required />

                                    </div>

                                    <div className='col-4'>
                                        <label htmlFor="cpf" className='form-label'>Cidade</label>
                                        <input type="text" value={cidade} name='cidade' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Celular</label>
                                        <input type="text" value={celular} name='celular' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Pais</label>
                                        <input type="text" value={pais} name='pais' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Rua</label>
                                        <input type="text" value={rua} name='rua' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Numero</label>
                                        <input type="text" value={numero} name='numero' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Bairro</label>
                                        <input type="text" value={bairro} name='bairro' className='form-control' readOnly required />

                                    </div>

                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Complemento</label>
                                        <input type="text" value={complemento} name='complemento' className='form-control' readOnly required />

                                    </div>
                                    <div className='col-4'>
                                        <label htmlFor="celular" className='form-label'>Salario</label>
                                        <input type="text" placeholder='Disponivel para Profissional' value={salario} name='complemento' className='form-control' readOnly required />

                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>



                </div>
            ) : (
                <div className="myApp-login-panel">
                    <div className="login-header">
                        <h1>Bem-vindo(a)</h1>

                    </div>
                    <form onSubmit={testarUsuario} className="login-form" autoComplete="off">
                        <div className="login-content">
                            <div className="form-item">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="emaill"
                                    name="email"
                                    id="email"
                                    placeholder="example@email.com"
                                    value={emailLogin}
                                    onChange={(e) => setEmaiLogin(e.target.value)}
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password">Senha</label>
                                <input
                                    type="passwordd"
                                    name="password"
                                    id="password"
                                    placeholder="Senha"
                                    required
                                    className="pass-key1"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />
                            </div>
                            <button className='botaoLogin' type="submit">LogIn</button>
                        </div>
                    </form>
                    <div className="login-right">
                        <img src="../images/login-foto.jpg" alt="" />
                    </div>
                </div>


            )}
        </div>

    );
}

export default LoginForm;
