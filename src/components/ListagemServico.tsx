import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from "../App.module.css";
import { ServicoInterface } from '../interfaces/ServicoInterface';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import Footer from './Footer';


const ListagemServico = () => {

    const [servicos, setServicos] = useState<ServicoInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/pesquisar/nome/servico',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if (response.data.status == true) {
                        setServicos(response.data.data);
                    }else{
                        setServicos([]);
                    }

                }).catch(function (error) {
                    console.log(error)
                });

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/servico');
                if (true === response.data.status) {

                    setServicos(response.data.data)


                }
                else {
                    console.log("Não há nenhum registro no sistema")
                }
            } catch (error) {
                setError("Ocorreu um erro");
            }
        }

        fetchData();
    }, []);

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
                    text: "O Serviço foi excluido",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/excluir/servico/' + id)
                    .then(function (response) {
                        if (response.data.status) {
                            window.location.href = "/listagem/servico"
                        }
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O servico não foi excluido :)",
                    icon: "error"
                });
            }
        });



    }


    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container  wm-100 w-auto'>
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
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-5'>
                                        <input type="text" name='pesquisa' className='form-control'
                                            onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-primary'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='card-title display-6 '>Listagem de Servicos</h4><hr />
                            {servicos.length === 0 ? (
                                <p className="text-body-secondary fs-5">Não há nenhum registro no sistema!</p>
                            ) : (
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Duração</th>
                                            <th>Preço</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {servicos.map(servicos => (
                                            <tr key={servicos.id}>
                                                <td>{servicos.id}</td>
                                                <td>{servicos.nome}</td>
                                                <td>{servicos.descricao}</td>
                                                <td>{servicos.duracao}</td>
                                                <td>{servicos.preco}</td>

                                                <td className='col-3'>

                                                    <Link to={"/servico/editar/" + servicos.id} className='zoom p-1 btn btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                    </svg></Link>

                                                    <a onClick={e => handleDelete(servicos.id)} className='zoom p-1 m-1 btn btn-danger btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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

            <Footer/>
            <nav className="navbar fixed-bottom ">
                <div className="container-fluid m-1">
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/listagem/profissional"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg></Link>
                    <Link className="zoom btn  btn-secondary p-1  btn-sm" to={"/listagem/agenda"}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg></Link>
                </div>
            </nav>
        </div>
    );
}
export default ListagemServico;

//Pronto

