import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '../App.module.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const CadastroProfissional = () => {

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
    const [password, setPassword] = useState<string>("");

    
    const [nomeErro, setNomeErro] = useState<string>("");
    const [celularErro, setCelularErro] = useState<string>("");
    const [emailErro, setEmailErro] = useState<string>("");
    const [cpfErro, setCpfErro] = useState<string>("");
    const [dataNascimentoErro, setDataNascimentoErro] = useState<string>("");
    const [cidadeErro, setCidadeErro] = useState<string>("");
    const [estadoErro, setEstadoErro] = useState<string>("");
    const [paisErro, setPaisErro] = useState<string>("");
    const [ruaErro, setRuaErro] = useState<string>("");
    const [numeroErro, setNumeroErro] = useState<string>("");
    const [bairroErro, setBairroErro] = useState<string>("");
    const [cepErro, setCepErro] = useState<string>("");
    const [complementoErro, setComplementoErro] = useState<string>("");
    const [passwordErro, setPasswordErro] = useState<string>("");
    const [salarioErro, setSalarioErro] = useState<string>("");

    const cadastrarProfissional = (e: FormEvent) => {
        setNomeErro("");
        setCelularErro("");
        setEmailErro("");
        setCpfErro("");
        setDataNascimentoErro("");
        setCidadeErro("");
        setEstadoErro("");
        setPaisErro("");
        setRuaErro("");
        setNumeroErro("");
        setBairroErro("");
        setCepErro("");
        setComplementoErro("");
        setPasswordErro("");
        setSalario("");
        e.preventDefault();


        const dados = {
            nome: nome,
            email: email,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cidade: cidade,
            estado: estado,
            celular: celular,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            complemento: complemento,
            salario: salario,
            password: password

        }

        axios.post('http://127.0.0.1:8000/api/cadastrar/profissional',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).then(function (response) {
            if (response.data.status == true) {

                Swal.fire({
                    title: response.data.title,
                    text: response.data.message,
                    icon: "success",
                    timer: 6000,
                    showConfirmButton: false
                });

                window.setTimeout(() => {
                    window.location.href = "/listagem/profissional";
                }, 3600);
            }
            else { if (response.data.success === false) {
                if ("nome" in response.data.error) {
                    setNomeErro(response.data.error.nome[0]);
                }
                if ("email" in response.data.error) {
                    setEmailErro(response.data.error.email[0]);

                }
                if ("cpf" in response.data.error) {
                    setCpfErro(response.data.error.cpf[0]);
                }
                if ("dataNascimento" in response.data.error) {
                    setDataNascimentoErro(response.data.error.dataNascimento[0]);
                }
                if ("cidade" in response.data.error) {
                    setCidadeErro(response.data.error.cidade[0]);
                }
                if ("estado" in response.data.error) {
                    setEstadoErro(response.data.error.estado[0]);
                }
                if ("celular" in response.data.error) {
                    setCelularErro(response.data.error.celular[0]);
                }
                if ("pais" in response.data.error) {
                    setPaisErro(response.data.error.pais[0]);
                }
                if ("rua" in response.data.error) {
                    setRuaErro(response.data.error.rua[0]);
                }
                if ("numero" in response.data.error) {
                    setNumeroErro(response.data.error.numero[0]);
                }
                if ("bairro" in response.data.error) {
                    setBairroErro(response.data.error.bairro[0]);
                }
                if ("cep" in response.data.error) {
                    setCepErro(response.data.error.cep[0]);
                }
                if ("complemento" in response.data.error) {
                    setComplementoErro(response.data.error.complemento[0]);
                }
                if ("password" in response.data.error) {
                    setPasswordErro(response.data.error.password[0]);
                }
                if ("salario" in response.data.error) {
                    setSalarioErro(response.data.error.salario[0]);
                }

            }
            }


        }).catch(function (error) {
            console.log(error)

        });
    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "cpf") {
            setCpf(e.target.value);
        }
        if (e.target.name === "dataNascimento") {
            setDataNascimento(e.target.value);
        }
        if (e.target.name === "cidade") {
            setCidade(e.target.value);
        }
        if (e.target.name === "estado") {
            setEstado(e.target.value);
        }
        if (e.target.name === "celular") {
            setCelular(e.target.value);
        }
        if (e.target.name === "pais") {
            setPais(e.target.value);
        }
        if (e.target.name === "rua") {
            setRua(e.target.value);
        }
        if (e.target.name === "numero") {
            setNumero(e.target.value);
        }
        if (e.target.name === "bairro") {
            setBairro(e.target.value);
        }
        if (e.target.name === "cep") {
            setCep(e.target.value);
        }
        if (e.target.name === "complemento") {
            setComplemento(e.target.value);
        }
        if (e.target.name === "salario") {
            setSalario(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const findCep = (e: FormEvent) => {

        e.preventDefault();

        fetch('https://viacep.com.br/ws/' + cep + '/json/',
            {
                method: 'GET'
            }
        ).then(response => response.json())
            .then(
                data => {

                    setCidade(data.localidade);
                    setEstado(data.uf);
                    setRua(data.logradouro);
                    setComplemento(data.complemento);
                    setBairro(data.bairro);
                }
            ).catch(error => {



                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "CEP não encontrado"
                });
            });


    }

    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className='card-title display-6 '>Cadastro de  Profissional</h1>
                            <hr />
                            <form onSubmit={cadastrarProfissional} className='row g-3'>
                                <div className='col-6' >

                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' id='nome'  className={'form-control' + (nomeErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{nomeErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label ' >E-mail</label>
                                    <input type="email" name='email'  className={'form-control' + (emailErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{emailErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" name='cpf'  className={'form-control' + (cpfErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{cpfErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Data de Nascimento</label>
                                    <input type="date" name='dataNascimento'  className={'form-control' + (dataNascimentoErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{dataNascimentoErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" name='celular'  className={'form-control' + (celularErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{celularErro}</div>
                                </div>

                                <div className='col-3'>
                                    <label htmlFor="celular" className='form-label'>Cep</label>
                                    <input type="text" name='cep'  className={'form-control' + (cepErro ? ' border-danger border-2' : '')}  onBlur={findCep} onChange={handleState} />
                                    <div className="text-danger">{cepErro}</div>
                                </div>
                                <div className='col-2'>
                                    <label htmlFor="cpf" className='form-label'>Estado</label>
                                    <input type="text" name='estado' value={estado}  className={'form-control' + (estadoErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{estadoErro}</div>
                                </div>

                                <div className='col-2'>
                                    <label htmlFor="cpf" className='form-label'>Cidade</label>
                                    <input type="text" value={cidade} name='cidade'  className={'form-control' + (cidadeErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{cidadeErro}</div>
                                </div>

                                <div className='col-2'>
                                    <label htmlFor="celular" className='form-label'>Pais</label>
                                    <input type="text" name='pais'  className={'form-control' + (paisErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{paisErro}</div>
                                </div>
                                <div className='col-3'>
                                    <label htmlFor="celular" className='form-label'>Rua</label>
                                    <input type="text" name='rua' value={rua}  className={'form-control' + (ruaErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{ruaErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Numero</label>
                                    <input type="text" name='numero'  className={'form-control' + (numeroErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{numeroErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Bairro</label>
                                    <input type="text" name='bairro' value={bairro}  className={'form-control' + (bairroErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{bairroErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Complemento</label>
                                    <input type="text" name='complemento' value={complemento}  className={'form-control' + (complementoErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{complementoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="password" className='form-label'>Salario</label>
                                    <input type="text" placeholder='Ex: 2000.00' name='salario' className={'form-control' + (salarioErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{salarioErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="password" className='form-label'>Senha</label>
                                    <input type="password" name='password' className={'form-control' + (passwordErro ? ' border-danger border-2' : '')}   onChange={handleState} />
                                    <div className="text-danger">{passwordErro}</div>
                                </div>
                                <div className='col-12 '>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Cadastrar
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9e9e9e" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <nav className="navbar fixed-bottom ">
                <div className="container-fluid m-1">
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/cliente"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg></Link>
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/servico"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg></Link>
                </div>
            </nav>
        </div>
    )
}

export default CadastroProfissional;

//Pronto

