import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const EditarServico = () => {


    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao]= useState<string>("");
    const [duracao, setDuracao]= useState<string>("");
    const [preco, setPreco]= useState<string>("");
    const [id, setId] = useState<number>();

    const [nomeErro, setNomeErro] = useState<string>("");
    const [descricaoErro, setDescricaoErro]= useState<string>("");
    const [duracaoErro, setDuracaoErro]= useState<string>("");
    const [precoErro, setPrecoErro]= useState<string>("");
  


    const parametro = useParams();

    const atualizarServico = (e: FormEvent) => {
        setNomeErro("");
        setDescricaoErro("");
        setDuracaoErro("");
        setPrecoErro("");
        e.preventDefault();

        const dados = {
            id: id,
            nome: nome,
            descricao: descricao,
            duracao: duracao,
            preco: preco

        }

        axios.put('http://127.0.0.1:8000/api/update/servico',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                if(response.data.status == true){
                    Swal.fire({
                        title: "Atualizado",
                        text: "O Servico foi atualizado com sucesso!",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    window.setTimeout(() => {
                        window.location.href = "/listagem/Servico";
                     }, 3600);
    
                }
                else{
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/find/servico/" + parametro.id);
                setNome(response.data.data.nome)
                setDescricao(response.data.data.descricao)
                setDuracao(response.data.data.duracao)
                setId(response.data.data.id)
                setPreco(response.data.data.preco)
                
                


            } catch (error) {
                console.log("erro ao buscar dados pelo id")
            }

        }
        fetchData();
    }, [])

    
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
            <NavBar/>
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Editar Servicos</h5>
                            <form onSubmit={atualizarServico} className='row g-3'>
                            <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" value={nome} name='nome' className={'form-control' + (nomeErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{nomeErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="descricao" className='form-label' >Descrição</label>
                                    <input type="text" value={descricao} name='descricao' className={'form-control' + (descricaoErro ? ' border-danger border-2' : '')} required  onChange={handleState}/>
                                    <div className="text-danger">{descricaoErro}</div>
                                
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="duracao" className='form-label'>Duração</label>
                                    <input type="text" value={duracao} name='duracao' className={'form-control' + (duracaoErro ? ' border-danger border-2' : '')} required  onChange={handleState}/>
                                    <div className="text-danger">{duracaoErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="preco" className='form-label'>Preço</label>
                                    <input type="number" value={preco} name='preco' className={'form-control' + (precoErro ? ' border-danger border-2' : '')}   required  onChange={handleState}/>
                                    <div className="text-danger">{precoErro}</div>
                                </div>

                                <div className='col-12 '>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Atualizar
                                        <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="grey" className="bi bi-pen" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                </svg>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            

        </div>
        )
    }
    export default EditarServico;

    //Pronto