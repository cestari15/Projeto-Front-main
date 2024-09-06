import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from "../App.module.css";
import Swal from 'sweetalert2';
import { AgendaInterface } from '../interfaces/AgendaInterface';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const ListagemAgenda = () => {

    const [agenda, setAgenda] = useState<AgendaInterface[]>([]);
    const [tipoPesquisa, setTipoPesquisa] = useState<string>('id_profissional');
    const [dataHora, setPesquisaDataHora] = useState<string>('');
    const [profissionalId, setPesquisaIdProfissional] = useState<string>('');

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'pesquisa') {
            setPesquisaDataHora(e.target.value);
        }
    };

    const buscarPorIdProfissional = async (id: string) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/pesquisar/profissional/agenda', { profissional_id: id }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === true) {
                setAgenda(response.data.data);
            } else {
                // Tratar erro caso não encontre dados com esse ID
            }
        } catch (error) {
            console.log(error);
            // Tratar erro caso ocorra um problema na requisição
        }
    };

    const buscarPorDataDoId = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/pesquisar/data/agenda', { data_hora: dataHora }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === true) {
                setAgenda(response.data.data);
            } else {
                setAgenda([]);
            }
        } catch (error) {
            console.log(error);
            // Tratar erro caso ocorra um problema na requisição
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (tipoPesquisa === 'id_profissional') {
            await buscarPorIdProfissional(profissionalId);
        } else if (tipoPesquisa === 'data') {
            await buscarPorDataDoId();
        }
    };




    function handleDelete(id: number) {



        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O cliente foi excluido",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/excluir/agenda/' + id)
                    .then(function (response) {
                        window.location.href = "/listagem/agenda"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O Cliente não foi excluido :)",
                    icon: "error"
                });
            }
        });



    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/agenda');
                if (response.data.status == true) {

                    setAgenda(response.data.data);
                   
                }
                else {
                   
                }
            } catch (error) {

                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container '>
                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-5'>
                                        <h5 className='card-title  text-center'>
                                            Pesquisar
                                        </h5>
                                    </div>

                                </div>
                                <form onSubmit={handleSubmit} className='row mb-3'>
                                    <div className='col-md-4'>
                                        <select className='form-select' onChange={(e) => setTipoPesquisa(e.target.value)}>
                                            <option value='id_profissional'>Pesquisar por ID do Profissional</option>
                                            <option value='data'>Pesquisar por Data</option>
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        {tipoPesquisa === 'id_profissional' ? (
                                            <input
                                                type='text'
                                                name='profissional_id'
                                                className='form-control'
                                                placeholder='Pesquisar por ID do Profissional'
                                                onChange={(e) => setPesquisaIdProfissional(e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                type='text'
                                                name='pesquisa'
                                                className='form-control'
                                                placeholder='Pesquisar por Data'
                                                onChange={handleState}
                                            />
                                        )}
                                    </div>
                                    <div className='col-md-2'>
                                        <button type='submit' className='btn btn-primary'>
                                            Pesquisar
                                        </button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>

                            <h4 className='card-title display-6 '>Listagem Agenda</h4>

                            <hr />

                            {agenda.length === 0 ? (
                                <p className="text-body-secondary fs-5">Não há nenhum registro no sistema!</p>

                            ) : (
                                <table className='table table-hover '>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>ID_Profissional</th>
                                            <th>Data-Hora</th>

                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>


                                        {agenda.map(agenda => (
                                            <tr key={agenda.id}>
                                                <td>{agenda.id}</td>
                                                <td>{agenda.profissional_id}</td>
                                                <td>{agenda.data_hora}</td>



                                                <td className='col-2'>



                                                    <a onClick={e => handleDelete(agenda.id)} className='zoom p-1 m-1 btn btn-danger btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                    </svg></a>




                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <nav className="navbar fixed-bottom ">
                <div className="container-fluid m-1">
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/listagem/servico"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg></Link>
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/listagem/cliente"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg></Link>
                </div>
            </nav>
        </div>
    );
}
export default ListagemAgenda;

//Pronto