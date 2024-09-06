import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '../App.module.css'
import '../components/style.css'
import NavBar from './NavBar';
import Swal from 'sweetalert2';

import { ProfissionalInterface } from "../interfaces/ProfissionalInterface";



import axios from 'axios';
import { Link } from 'react-router-dom';

const CadastroAgenda = () => {



    const [profissional_id, setProfissional_id] = useState<string>("");
    const [data_hora, setDataHora] = useState<string>("");

    const [profissional_idErro, setProfissional_idErro] = useState<string>("");
    const [data_horaErro, setDataHoraErro] = useState<string>("");

    const [profissional, setProfissional] = useState<ProfissionalInterface[]>([]);



    const cadastrarAgenda = (e: FormEvent) => {
        setDataHoraErro("");
        
        e.preventDefault();

        const dados = {
            profissional_id: profissional_id,
            data_hora: data_hora,
        }

        if (new Date(data_hora) < new Date()) {
            setDataHoraErro("Não é possível cadastrar antes da data e hora atual");
            return;
          }

          else if (new Date(data_hora).getTime() === new Date().getTime()) {
            setDataHoraErro("Já existe uma agenda cadastrada para essa data e profissional.");
            return;
          }


        console.log(dados)
        axios.post('http://127.0.0.1:8000/api/cadastrar/agenda', dados,

            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (true === response.data.status) {
                    Swal.fire({
                        title: "Sucesso",
                        text: "Agenda Cadastrada",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000
                    });

                    window.setTimeout(() => {
                        window.location.href = "/listagem/agenda"
                    }, 3600);

                }
                else {
                    if ("data_hora" in response.data.error) {
                        setDataHoraErro(response.data.error.data_hora[0]);
                    }
                   
                   
                }
            }).catch(function (error) {
                console.log(error)
            })
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/profissional  ');
                if (true == response.data.status) {
                    setProfissional(response.data.data)

                }
                else {
                    setProfissional([])
                }
            } catch (error) {
                console.log(error);

            }
        }

        fetchData();
    }, []);




    const handleState = (e: ChangeEvent<HTMLInputElement>) => {


        if (e.target.name === "data_hora") {
            setDataHora(e.target.value);
        }



    }

    const handleProfissional = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'profissional_id') {
            setProfissional_id(e.target.value);
        }
    }




    return (
        <div>
            <NavBar />


            <main className={styles.main}>

                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h1 className='card-title display-6 '>Cadastro de Agenda</h1>
                            <hr />
                            <form onSubmit={cadastrarAgenda} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Profissional_Id</label>
                                    <select name='profissional_id' id='profissional_id ' className={'form-control' + (profissional_idErro ? ' border-danger border-2' : '')} required onChange={handleProfissional}  >
                                        <option value="">Selecione um Profissional</option>
                                        {profissional.map(profissional => (
                                            <option key={profissional.id} value={profissional.id}>
                                                {profissional.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-danger">{profissional_idErro}</div>
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="data_hora" className='form-label' >Data e hora</label>
                                    <input type="datetime-local" name='data_hora' className={'form-control' + (data_horaErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{data_horaErro}</div>
                                </div>


                                <div className='col-12'>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Cadastrar
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="grey" className="bi bi-calendar" viewBox="0 0 16 16">
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
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
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/servico"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg></Link>

                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/cadastro/cliente"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg></Link>
                </div>

            </nav>
        </div>
    )
}

export default CadastroAgenda;

//Pronto

