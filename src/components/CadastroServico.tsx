import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from '../App.module.css'
import axios from 'axios';
import NavBar from './NavBar';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CadastroServico = () => {

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [duracao, setDuracao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");

    const [nomeErro, setNomeErro] = useState<string>("");
    const [descricaoErro, setDescricaoErro] = useState<string>("");
    const [duracaoErro, setDuracaoErro] = useState<string>("");
    const [precoErro, setPrecoErro] = useState<string>("");


    const cadastrarProfissional = (e: FormEvent) => {

        setNomeErro("");
        setDescricaoErro("");
        setDuracaoErro("");
        setPrecoErro("");
        e.preventDefault();


        const dados = {
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco

        }

        axios.post('http://127.0.0.1:8000/api/cadastrar/servico',
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
                    title: "Cadastrado",
                    text: "O serviço foi cadastrado com sucesso",
                    icon: "success",
                    timer: 6000,
                    showConfirmButton: false
                });

                window.setTimeout(() => {
                    window.location.href = "/listagem/servico";
                }, 3600);
            }
            else {

                if ("nome" in response.data.error) {
                    setNomeErro(response.data.error.nome[0]);
                }
                if ("descricao" in response.data.error) {
                    setDescricaoErro(response.data.error.descricao[0]);

                }
                if ("duracao" in response.data.error) {
                    setDuracaoErro(response.data.error.duracao[0]);
                }
                if ("preco" in response.data.error) {
                    setPrecoErro(response.data.error.preco[0]);
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
        if (e.target.name === "descricao") {
            setDescricao(e.target.value);
        }
        if (e.target.name === "duracao") {
            setDuracao(e.target.value);
        }
        if (e.target.name === "preco") {
            setPreco(e.target.value);
        }

    }


    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className='card-title display-6 '>Cadastro de Serviços</h1>
                            <hr />
                            <form onSubmit={cadastrarProfissional} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" placeholder='Digite o nome' name='nome' className={'form-control' + (nomeErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{nomeErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Descrição</label>
                                    <input type="text" placeholder='Digite a descrição' name='descricao' className={'form-control' + (descricaoErro ? ' border-danger border-2' : '')} required onChange={handleState} />

                                    <div className="text-danger">{descricaoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cpf" className='form-label'>Duração</label>
                                    <input type="text" placeholder='Ex: 12' name='duracao' className={'form-control' + (duracaoErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{duracaoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cpf" className='form-label'>Preço</label>
                                    <input type="text" name='preco' placeholder='Ex: 20.00' className={'form-control' + (precoErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{precoErro}</div>
                                </div>

                                <div className='col-12'>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Cadastrar
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9e9e9e" className="bi bi-scissors" viewBox="0 0 16 16">
                                                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
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
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/profissional"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg></Link>
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/agenda"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg></Link>
                </div>
            </nav>
        </div>
    )
}

export default CadastroServico;
//Pronto
