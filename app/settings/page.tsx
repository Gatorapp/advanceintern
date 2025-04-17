"use client";


import Sidebar from '../components/SideBar/page';
import React, { useState } from 'react';
import './settings.css';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar/page';
import { useAuth } from '@/AuthContext';

export default function Page() {
  const { isLoggedOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLoginSuccess = () => {
    setIsModalOpen(false); 
  };

  return (
    <div id="__next">
      <div className="wrapper">
        <div className="search__background">
          <SearchBar />
        </div>
        <div className="sidebar__overlay sidebar_overlay--hidden"></div>
        <div className="sidebar sidebar--closed">
          <Sidebar />
        </div>
        <div className="container">
          <div className="row">
            <div className="section__title page__title">Settings</div>
            
                {isLoggedOut ? (
                  <>
                    <div className='setting__content'>
                        <div className="settings__sub--title">Your Subscription plan</div>
                        <div className="settings__text">premium-plus</div>
                    </div>
                    <div className='setting__content'>
                        <div className="settings__sub--title">Email</div>
                        <div className="settings__text">patel@gmail.com</div>
                    </div>
                  </>
                  ) : (
                    <div className='settings__login--wrapper'>                      
                      <img src="/assets/login.png" alt="login" width={1033} height={712} />
                      <div className="settings__login--text">Log in to your account to see your details.</div>
                    <button className='btn settings__login--btn' onClick={toggleModal}>Login</button>
                    
                  </div>
                )}
              </div>
              <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                toggleModal={toggleModal} 
                onLoginSuccess={handleLoginSuccess} 
              />
            </div>
          </div>
        </div>
  );
}