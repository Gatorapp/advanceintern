"use client"

import React, { useState } from 'react';
import '/app/choose-plan/choose-plan.css';
import { FaHandshake } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import Modal from "../components/Modal";

export default function Page() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const handlePlanClick = (plan: string) => {
        setSelectedPlan(plan);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };




    return (
        <div id='__next'>
            <div className="wrapper wrapper-full">
                <div className="sidebar__overlay sidebar__overlay--hidden"></div>
                <div className="plan">
                    <div className="plan__header--wrapper">
                        <div className="plan__header">
                            <div className="plan__title">Get unlimited access to many amazing books to read</div>
                            <div className="plan__sub--title">Turn ordinary moments into amazing learning opportunities</div>
                            <figure className="plan__img--mask">
                                <img src="/assets/pricing-top.png" alt="pricing-top" />
                            </figure>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="plan__features--wrapper">
                                <div className="plan__features">
                                    <div className="plan__features--icon"><IoDocumentText /></div>
                                    <div className="plan__features--text">
                                        <b>Key ideas in few min</b>
                                        with many books to read
                                    </div>
                                </div>
                                <div className="plan__features">
                                    <div className="plan__features--icon"><RiPlantFill /></div>
                                    <div className="plan__features--text">
                                        <b>3 million</b>
                                        people growing with Summarist everyday
                                    </div>
                                </div>
                                <div className="plan__features">
                                    <div className="plan__features--icon"><FaHandshake /></div>
                                    <div className="plan__features--text">
                                        <b>Precise reommendations</b>
                                        collections curated by experts
                                    </div>
                                </div>
                            </div>
                            <div className="section__title">Choose the plan that fits you</div>
                            <div
                                className={`plan__card ${selectedPlan === 'yearly' ? 'plan__card--active' : ''}`}
                                onClick={() => handlePlanClick('yearly')}
                            >
                                <div className="plan__card--circle">
                                    {selectedPlan === 'yearly' && <div className="plan__card--dot"></div>}
                                </div>
                                <div className="plan__card--content">
                                    <div className="plan__card--title">Premium Plus Yearly</div>
                                    <div className="plan__card--price">$99.99/year</div>
                                    <div className="plan__card--text">7-day free trial included</div>
                                </div>
                            </div>
                            <div className="plan__card--separator">
                                <div className="plan__separator">or</div>
                            </div>

                            <div
                                className={`plan__card ${selectedPlan === 'monthly' ? 'plan__card--active' : ''}`}
                                onClick={() => handlePlanClick('monthly')}
                            >
                                <div className="plan__card--circle">
                                    {selectedPlan === 'monthly' && <div className="plan__card--dot"></div>}
                                </div>
                                <div className="plan__card--content">
                                    <div className="plan__card--title">Premium Monthly</div>
                                    <div className="plan__card--price">$9.99/month</div>
                                    <div className="plan__card--text">No trial included</div>
                                </div>
                            </div>
                            <div className="plan__card--cta">
                                <span className="btn--wrapper">
                                    <button className="btn btn--wide" onClick={toggleModal}>
                                        <span>
                                            {selectedPlan === 'monthly' ? 'Start your first month' : 'Start your free 7-day trial'}
                                        </span>
                                    </button>
                                </span>
                                    <div className="plan__disclaimer">
                                        <span>
                                            {selectedPlan === 'monthly' ? '30-day money back guarantee, no questions asked.' : 'Cancel your trial at any time before it ends, and you won&apos;t be charged.'}
                                        </span>
                                    </div>
                            </div>
                            <Modal
                                isOpen={isModalOpen}
                                onClose={toggleModal}
                            >
                                <div>
                                    <h2>Confirm Your Plan</h2>
                                    <p>You have selected the {selectedPlan} plan. Proceed to payment?</p>
                                    <button onClick={toggleModal}>Close</button>
                                </div>
                            </Modal>
                            <div className="faq__wrapper">
                                <div className="accordion__card">
                                    <div className="accordion__header" onClick={() => toggleAccordion(0)}>
                                        <div className="accordion__title">How does the free 7-day trial work?</div>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            className={`accordion__icon ${openIndex === 0 ? "accordion__icon--rotate" : ""}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M1.5 3.5l6 6 6-6" />
                                        </svg>
                                    </div>
                                    {openIndex === 0 && (
                                        <div className="collapse show">
                                            <div className="accordion__body">
                                                Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="accordion__card">
                                    <div className="accordion__header" onClick={() => toggleAccordion(1)}>
                                        <div className="accordion__title">Can I switch subscriptions from monthly to yearly?</div>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            className={`accordion__icon ${openIndex === 1 ? "accordion__icon--rotate" : ""}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M1.5 3.5l6 6 6-6" />
                                        </svg>
                                    </div>
                                    {openIndex === 1 && (
                                        <div className="collapse show">
                                            <div className="accordion__body">
                                                While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="accordion__card">
                                    <div className="accordion__header" onClick={() => toggleAccordion(2)}>
                                        <div className="accordion__title">What&apos;s included in the Premium plan?</div>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            className={`accordion__icon ${openIndex === 2 ? "accordion__icon--rotate" : ""}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M1.5 3.5l6 6 6-6" />
                                        </svg>
                                    </div>
                                    {openIndex === 2 && (
                                        <div className="collapse show">
                                            <div className="accordion__body">
                                                Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="accordion__card">
                                    <div className="accordion__header" onClick={() => toggleAccordion(3)}>
                                        <div className="accordion__title">Can I cancel during my trial or subscription?</div>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            className={`accordion__icon ${openIndex === 3 ? "accordion__icon--rotate" : ""}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M1.5 3.5l6 6 6-6" />
                                        </svg>
                                    </div>
                                    {openIndex === 3 && (
                                        <div className="collapse show">
                                            <div className="accordion__body">
                                                You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        <section id='footer'>
                            <div className="container">
                                <div className="row">
                                    <div className="footer__top--wrapper">
                                        <div className="footer__block">
                                            <div className="footer__link--title">Actions</div>
                                            <div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Summarist Magazine</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Cancel Subscription</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Help</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Contact us</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer__block">
                                            <div className="footer__link--title">Useful Links</div>
                                            <div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Pricing</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Summarist Business</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Gift Cards</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Authors & Publishers</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer__block">
                                            <div className="footer__link--title">Company</div>
                                            <div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">About</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Careers</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Partners</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Code of Conduct</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="footer__block">
                                            <div className="footer__link--title">Other</div>
                                            <div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Sitemap</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Legal Notice</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Terms of Sercive</a>
                                                </div>
                                                <div className="footer__link--wrapper">
                                                    <a className="footer__link">Privacy Policies</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer__copyright--wrapper">
                                        <div className="footer__copyright">Copyright © 2025 Summarist.</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
