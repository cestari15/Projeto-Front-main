import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '../App.module.css';
import '../components/style.css';
import NavBar from './NavBar';
import axios from 'axios';
import Footer from './Footer';



import { Link } from 'react-router-dom';
import { ClienteInterface } from '../interfaces/ClienteInterface';

import { ProfissionalInterface } from '../interfaces/ProfissionalInterface';
import { ServicoInterface } from '../interfaces/ServicoInterface';
import { AgendaInterface } from '../interfaces/AgendaInterface';

const PaginaInicial = () => {
    const [clientes, setClientes] = useState<ClienteInterface[]>([]);
    const [profissionais, setProfissionais] = useState<ProfissionalInterface[]>([]);
    const [servicos, setServicos] = useState<ServicoInterface[]>([]);
    const [agenda, setAgenda] = useState<AgendaInterface[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/cliente');
                if (response.data.status == true) {

                    setClientes(response.data.data);
                }






            } catch (error) {
                console.log("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/profissional');
                if (response.data.status == true) {
                    setProfissionais(response.data.data);
                }
                else {

                    console.log("Nenhum registro no sistema")

                }


            } catch (error) {
                console.log("Ocorreu um erro");

            }
        }

        fetchData();
    }, []);

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
                console.log("Ocorreu um erro");
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all/agenda');
                if (response.data.status == true) {

                    setAgenda(response.data.data);
                    console.log(response.data.data_hora)
                }
                else {
                    console.log("Não há nenhum registro no sistema")

                }
            } catch (error) {
                console.log("Ocorreu um erro");

            }
        }

        fetchData();
    }, []);






    return (
        <div>
            <NavBar />
            <header>
                <div className="p-5  text-white bg-image  fotoInicial">
                    <div className="p-4 shadow-4 rounded-3">
                        <p className=" tamanhoFont text-center top">Estilo & Lamina</p>
                        <p className='text-center'>
                            Comece hoje a organizar sua empresa do jeito certo. <br />
                            Aplicativo para cadastrar, sua empresa, serviços,
                            profissionais e seus horarios de forma rapida e pratica.
                        </p>
                        <p>

                        </p>




                    </div>
                    <button type="button" className="  btn btn-trasparent btnJumb">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                        </svg>
                    </button>
                </div>
            </header>
            <main className={styles.main}>


                <div className='container'>
                    <div className="row">
                        <div className="section-title">
                            <span>Contadores</span>
                            <h2>Contadores</h2>

                        </div>
                        <div className="ag-format-container">
                            <div className="ag-courses_box">




                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            Cliente
                                        </div>

                                        <div className="ag-courses-item_date-box">

                                            <Link to={"/listagem/cliente"} className=' p-2 btn zoom  btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                            </svg></Link>
                                            <Link to={"/cadastro/cliente"} className=' p-2 zoom m-1 btn btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                            </svg></Link>

                                        </div>
                                    </a>
                                </div>


                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            Profissional
                                        </div>

                                        <div className="ag-courses-item_date-box">

                                            <Link to={"/listagem/profissional"} className=' p-2 btn zoom  btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                            </svg></Link>
                                            <Link to={"/cadastro/profissional"} className=' p-2 zoom m-1 btn btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                            </svg></Link>

                                        </div>
                                    </a>
                                </div>
                                <br />

                                <div className="ag-courses_item">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            Serviços
                                        </div>

                                        <div className="ag-courses-item_date-box">

                                            <Link to={"/listagem/servico"} className=' p-2 btn zoom  btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                            </svg></Link>
                                            <Link to={"/cadastro/servico"} className=' p-2 zoom m-1 btn btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                            </svg></Link>

                                        </div>
                                    </a>
                                </div>


                                <div className="ag-courses_item ">
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">
                                            Agenda
                                        </div>

                                        <div className="ag-courses-item_date-box">

                                            <Link to={"/listagem/agenda"} className=' p-2 btn zoom  btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                            </svg></Link>
                                            <Link to={"/cadastro/agenda"} className=' p-2 zoom m-1 btn btn-primary btn-sm'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                            </svg></Link>

                                        </div>
                                    </a>
                                </div>












                            </div>
                        </div>
                    </div>

                </div>

            </main>
            <section id="counts" className="counts">
                <div className="container">

                    <div className="row" data-aos="fade-up">

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                </svg></i>
                                <span className="purecounter">{clientes.length}</span>
                                <p>Clientes</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                            <div className="count-box">
                                <i ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                </svg></i>
                                <span className="purecounter">{profissionais.length}</span>
                                <p>Profissionais</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0 ">
                            <div className="count-box ">
                                <i ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg></i>
                                <span className="purecounter">{servicos.length}</span>
                                <p>Serviços</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box ">
                                <i  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className=" bi bi-calendar" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                </svg></i>
                                <span className="purecounter">{agenda.length}</span>
                                <p>Agendas</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <section id="contact" className="contact">
                <div className="container">

                    <div className="section-title">
                        <span>Contato</span>
                        <h2>Contato</h2>

                    </div>

                    <div className="row">

                        <div className="col-lg-5 d-flex align-items-stretch">
                            <div className="info">
                                <div className="address">
                                    <i ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg></i>
                                    <h4>Local:</h4>
                                    <p>Na onde o sol não toca</p>
                                </div>

                                <div className="email">
                                    <i className=""> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                    </svg></i>
                                    <h4>Email:</h4>
                                    <p>ZéGotinha@example.com</p>
                                </div>

                                <div className="phone">
                                    <i ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                    </svg></i>
                                    <h4>Celular:</h4>
                                    <p>+55 1899345454545</p>
                                </div>

                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.96970440365!2d-52.155896103866496!3d-21.781433498567274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94919901c64dc8ef%3A0xfe7c2320f783cec3!2sHotel%20SESI%20Presidente%20Epit%C3%A1cio!5e0!3m2!1spt-PT!2sus!4v1701014310071!5m2!1spt-PT!2sus" className='mapa' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                        </div>

                        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Nome</label>
                                        <input type="text" name="name" className="form-control" id="name" required />
                                    </div>
                                    <div className="form-group col-md-6 mt-3 mt-md-0">
                                        <label htmlFor="name">Email</label>
                                        <input type="email" className="form-control" name="email" id="email" required />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="name">Descrição</label>
                                    <input type="text" className="form-control" name="subject" id="subject" required />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="name">Mensagem</label>
                                    <textarea className="form-control" name="message" required></textarea>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center"><button type="submit">Enviar Mensagem</button></div>
                            </form>
                        </div>

                    </div>

                </div>
            </section>
            <Footer />


        </div>
    )
}

export default PaginaInicial;

