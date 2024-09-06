import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import NavBar from './NavBar';
import styles from '../App.module.css'

import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';



const EditarSenhaProfissional = () => {


   
    const [email, setEmail] = useState<string>("");
    
    

    

    const parametro = useParams();
    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "email") {
            setEmail(e.target.value);
        }




    }

    const atualizarSenha = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            
            email: email,


        }



        axios.put('http://127.0.0.1:8000/api/recuperar/senha/profissional',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {

                if (response.data.status === true) {


                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });

                    Toast.fire({
                        icon: "success",

                        title: "Sucesso",
                        text: "Senha foi redefinida para o CPF"
                    });







                    window.setTimeout(() => {
                        window.location.href = "/listagem/profissional";
                    }, 3600);

                }
                else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top",
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

                        title: "Error",
                        text: response.data.message
                    });

                }


            }).catch(function (error) {
                console.log(error)

            });



    }






    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/find/profissional/" + parametro.id);
                if (response.data.status === true) {
                    
                    setEmail(response.data.data.email)
                }



            } catch (error) {
                console.log("erro ao buscar dados pelo id")
            }

        }
        fetchData();
    }, [])




    return (
        <div>
            <NavBar />
            <main className={styles.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h1 className='card-title display-6 '>Redefinir senha</h1>
                            <hr />
                            <form onSubmit={atualizarSenha} className='row g-3'>

                                <div className='col-12'>


                                    <label htmlFor="email" className='form-label text-start'>E-mail</label>
                                    <input type="email" value={email} placeholder='Digite um e-mail existente' name='email' className='form-control' required onChange={handleState} />

                                </div>



                                <div className='col-12 '>
                                    <button type='submit' className="cssbuttons-io-button centralizar " >
                                        Redefinir
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9e9e9e" className="bi bi-gear" viewBox="0 0 16 16">
                                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
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
export default EditarSenhaProfissional;

//Pronto