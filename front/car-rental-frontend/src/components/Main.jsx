import React, { useState, useEffect } from 'react';import '../styless/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Margin } from '@mui/icons-material';


function Main() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setIsLoggedIn(true);
            setUserName(userData.name);
            setUserSurname(userData.surname);
        }
    }, []);


    return (
        <div className='page'>
            <div className='main_page'>
                <div className='nav_container' >
                    <img src="https://www.carrentalgateway.com/_astro/hero-phone.2TLJXHN5_7ahkX.webp" alt=""/>
                    <h3>MOVEMATE</h3>

                    <div className='left_container'>
                        {isLoggedIn ? (
                            <>
                                <a href="/add">Добавить объявление</a>
                                <h4 style={{padding: '15px'}}>{userName} {userSurname}</h4>
                                <a href="/logout">Logout</a>
                            </>
                        ) : (
                            <>
                                <a href="/login">Login</a>
                                <a href="/register">Register</a>
                            </>
                        )}
                    </div>

                </div>
                <div className='middle_container'>
                    <h1>Аренда Авто</h1>
                    <h3>Прокати свою машину сегодня и заработай, будь героем дороги!</h3>
                    <div class="mbr-section-btn">
                        <a class="btn btn-white-outline display-7" href="/car">Арендовать</a>
                    </div>
                </div>
            </div>
            <div className='bottom_container'>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md">

                            <h6 class="mbr-section-subtitle mbr-fonts-style mt-0 mb-4 display-5">
                                <strong>Добро пожаловать на АвтоПрокат - место, где твоя машина становится звездой дороги!</strong>
                            </h6>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <p class="mbr-text mbr-fonts-style display-7">У нас каждый может сдать свой автомобиль в аренду и заработать деньги, будь умным предпринимателем!</p>
                            <p class="mbr-text mbr-fonts-style display-7">Мы предлагаем безопасные сделки и лучшие цены для аренды, доверь нам свой автомобиль и получи прибыль!</p>
                            <p class="mbr-text mbr-fonts-style display-7">Присоединяйся к нам сегодня и стань частью автомобильной революции!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='img_container'>
                <div className="row justify-content-center">
                    <div className="item features-image col-12 col-md-6 col-lg-4 active">
                        <div className="item-wrapper">
                            <div className="img_con">
                                <img src="http://127.0.0.1:5501/assets/images/photo-1498887960847-2a5e46312788.jpeg" alt="Image 1" />
                            </div>
                            <div className="item-content align-left">
                                <h5 className="item-title mbr-fonts-style mt-0 mb-2 display-5">
                                    <strong style={{ marginLeft: '54px' }}>Удобство</strong>
                                </h5>
                                <p className="mbr-text mbr-fonts-style mb-3 display-7">Простая регистрация и управление арендой через наш сайт.</p>

                            </div>
                        </div>
                    </div>
                    <div className="item features-image col-12 col-md-6 col-lg-4">
                        <div className="item-wrapper">
                            <div className="img_con">
                                <img src="http://127.0.0.1:5501/assets/images/photo-1485463611174-f302f6a5c1c9.jpeg" alt="Image 2" />
                            </div>
                            <div className="item-content align-left">
                                <h5 className="item-title mbr-fonts-style mb-2 mt-0 display-5">
                                    <strong>Безопасность</strong>
                                </h5>
                                <p className="mbr-text mbr-fonts-style mb-3 display-7">Гарантированная защита твоего автомобиля и финансов.</p>

                            </div>
                        </div>
                    </div>
                    <div className="item features-image col-12 col-md-6 col-lg-4" style={{ margin: 0 }}>
                        <div className="item-wrapper">
                            <div className="img_con">
                                <img src="http://127.0.0.1:5501/assets/images/photo-1517026575980-3e1e2dedeab4.jpeg" alt="Image 3" />
                            </div>
                            <div className="item-content align-left">
                                <h5 className="item-title mbr-fonts-style mb-2 mt-0 display-5">
                                    <strong style={{ marginLeft: '54px' }}>Прибыль</strong>
                                </h5>
                                <p className="mbr-text mbr-fonts-style mb-3 display-7">Зарабатывай деньги, предоставляя свой автомобиль в аренду другим.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ marginTop: '200px', color: '#ffc107', marginBottom: '50px' }}>

                <div class="row justify-content-center">
                    <div class="item features-without-image col-12 col-md-6 col-lg-4">
                        <div class="item-wrapper">
                            <div class="card-box align-left">

                                <p class="card-title mbr-fonts-style mb-3 display-1">
                                    <strong>1000+</strong>
                                </p>
                                <p class="card-text mbr-fonts-style mb-3 display-7">Счастливых клиентов</p>

                            </div>
                        </div>
                    </div>
                    <div class="item features-without-image col-12 col-md-6 col-lg-4">
                        <div class="item-wrapper">
                            <div class="card-box align-left">

                                <p class="card-title mbr-fonts-style mb-3 display-1">
                                    <strong>500+</strong>
                                </p>
                                <p class="card-text mbr-fonts-style mb-3 display-7">Доступных автомобилей</p>

                            </div>
                        </div>
                    </div>
                    <div class="item features-without-image col-12 col-md-6 col-lg-4">
                        <div class="item-wrapper">
                            <div class="card-box align-left">

                                <p class="card-title mbr-fonts-style mb-3 display-1">
                                    <strong>24/7</strong>
                                </p>
                                <p class="card-text mbr-fonts-style mb-3 display-7">Поддержка</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='last_container'>
                <h1 style={{  textAlign: 'center',fontSize:'50px',marginBottom:'20px' }} >Наши Контакты</h1>
                <div className='row_container'>
                    <div className='info_container'>
                        <h2 style={{ color: 'Black'}}>Телефон</h2>
                        <p>8 705 515 62 12</p>
                    </div>
                    <div className='info_container'>
                        <h2 style={{ color: 'Black'}}>Email</h2>
                        <p style={{marginLeft:'50px'}}>rauanuzakbaev@gmail.com</p>
                    </div>
                </div>
                <div className='row_container'>
                    <div className='info_container'>
                        <h2 style={{ color: 'Black'}}>Адрес</h2>
                        <p>Толе би 59</p>
                    </div>
                    <div className='info_container'>
                        <h2 style={{ color: 'Black'}}>Часы Работы</h2>
                        <p>Пн-Пт: 9:00 - 18:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
