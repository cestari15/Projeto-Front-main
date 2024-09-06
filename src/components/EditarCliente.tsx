import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditarCliente = () => {


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
    const [id, setId] = useState<number>();

    
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



    const parametro = useParams();

    const atualizarCliente = (e: FormEvent) => {
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
        e.preventDefault();

        const dados = {
            id: id,
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
            complemento: complemento

        }

        axios.put('http://127.0.0.1:8000/api/update/cliente',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                if (response.data.status === true) {
                    Swal.fire({
                        title: "Atualizado",
                        text: response.data.message,
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    window.setTimeout(() => {
                        window.location.href = "/listagem/cliente";
                    }, 3600);

                }
                else {
                    if (response.data.success === false) {
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
                            setPasswordErro(response.data.error.passsword[0]);
                        }
    
                    }
                }


            }).catch(function (error) {
                console.log(error)

            });



    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/find/cliente/" + parametro.id);
                setNome(response.data.data.nome)
                setEmail(response.data.data.email)
                setCpf(response.data.data.cpf)
                setId(response.data.data.id)
                setDataNascimento(response.data.data.dataNascimento)
                setCidade(response.data.data.cidade)
                setEstado(response.data.data.estado)
                setCelular(response.data.data.celular)
                setPais(response.data.data.pais)
                setRua(response.data.data.rua)
                setNumero(response.data.data.numero)
                setBairro(response.data.data.bairro)
                setCep(response.data.data.cep)
                setComplemento(response.data.data.complemento)


            } catch (error) {
                console.log("erro ao buscar dados pelo id")
            }

        }
        fetchData();
    }, []);

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
                    setBairro(data.bairro)
                }
            ).catch(error => {



                const Toast = Swal.mixin({
                    toast: true,
                    position: "center-end",
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

    }

    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='card-title display-6 '>Editar Cliente</h4>
                            <hr />


                            <form onSubmit={atualizarCliente} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" value={nome} name='nome' id='nome' className={'form-control' + (nomeErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{nomeErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label ' >E-mail</label>
                                    <input type="email" value={email} name='email' className={'form-control' + (emailErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{emailErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" value={cpf} name='cpf' className={'form-control' + (cpfErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{cpfErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Data de Nascimento</label>
                                    <input type="date" value={dataNascimento} name='dataNascimento' className={'form-control' + (dataNascimentoErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{dataNascimentoErro}</div>
                                </div>


                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Cep</label>
                                    <input type="text" value={cep}  onBlur={findCep} name='cep' className={'form-control' + (cepErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{cepErro}</div>
                                </div>  
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Estado</label>
                                    <input type="text" name='estado' value={estado} className={'form-control' + (estadoErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{estadoErro}</div>
                                </div>

                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Cidade</label>
                                    <input type="text" value={cidade} name='cidade' className={'form-control' + (cidadeErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{cidadeErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" value={celular} name='celular' className={'form-control' + (celularErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{celularErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Pais</label>
                                    <input type="text" value={pais} name='pais' className={'form-control' + (paisErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{paisErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Rua</label>
                                    <input type="text" value={rua} name='rua' className={'form-control' + (ruaErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{ruaErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Numero</label>
                                    <input type="text" value={numero} name='numero' className={'form-control' + (numeroErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{numeroErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Bairro</label>
                                    <input type="text" value={bairro} name='bairro' className={'form-control' + (bairroErro ? ' border-danger border-2' : '')} required onChange={handleState} />
                                    <div className="text-danger">{bairroErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Complemento</label>
                                    <input type="text" value={complemento} name='complemento' className={'form-control' + (complementoErro ? ' border-danger border-2' : '')}  onChange={handleState} />
                                    <div className="text-danger">{complementoErro}</div>
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
export default EditarCliente;