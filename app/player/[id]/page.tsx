"use client";

import Sidebar from "@/app/components/SideBar/page";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./player.css";
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri";
import SearchBar from "@/app/components/SearchBar/page";
import Modal from "@/app/components/Modal";
import { useAuth } from "@/AuthContext";
import { useFontSize } from "@/FontSizeContext";

export default function Page() {
    interface Book {
        audioLength: string;
        id: number;
        author: string;
        title: string;
        subTitle: string;
        imageLink: string;
        audioLink: string;
        totalRatings: number;
        averageRating: number;
        keyIdeas: number;
        type: string;
        status: string;
        subscriptionRequired: boolean;
        summary: string;
        tags: string[];
        bookDescription: string;
        authorDescription: string;
    }

    const { isLoggedOut } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ player, setPlayer] = useState<Book[]>([]);
    const [filteredPlayer, setFilteredPlayer] = useState<Book[]>([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const { fontSize } = useFontSize();

    const { id } = useParams(); // Get the id from the route parameters

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
    };

    const handleAudioTimeUpdate = (audioElement: HTMLAudioElement) => {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration || 0);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        const audioElement = document.querySelector("audio");
        if (audioElement) {
            audioElement.addEventListener("timeupdate", () => handleAudioTimeUpdate(audioElement));
        }
        return () => {
            if (audioElement) {
                audioElement.removeEventListener("timeupdate", () => handleAudioTimeUpdate(audioElement));
            }
        };
    }, []);

    useEffect(() => {
        if (!id) return;

        fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API data:", data);
                if (data && typeof data === "object") {
                    setPlayer([data]);
                    setFilteredPlayer([data]);
                } else {
                    console.error("API response is not a valid object:", data);
                    setPlayer([]);
                    setFilteredPlayer([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching book:", error);
                setPlayer([]);
                setFilteredPlayer([]);
            });
    }, [id]);

    return (
        <>
            <div className="__next">
                <Sidebar />
                <div className="wrapper">
                    <div className="summary">
                        <SearchBar />
                        {isLoggedOut ? (
                            <div className="settings__login--wrapper">
                                <img
                                    src="/assets/login.png"
                                    alt="login"
                                    width={1033}
                                    height={712}
                                />
                                <div className="settings__login--text">
                                    Log in to your account to see your details.
                                </div>
                                <button
                                    className="btn settings__login--btn"
                                    onClick={toggleModal}
                                >
                                    Login
                                </button>
                            </div>
                        ) : Array.isArray(filteredPlayer) && filteredPlayer.length > 0 ? (
                            filteredPlayer.map((player) => (
                                <div
                                    key={player.id}
                                    className="audio__book--summary"
                                    style={{ fontSize: "24px" }}
                                >
                                    <div className="audio__book--summary-title">
                                        <b>{player.title}</b>
                                    </div>
                                    <div className="audio__book--summary-text"
                                        style={{
                                            fontSize: 
                                            fontSize === "small" ? "20px" :
                                            fontSize === "medium" ? "24px" :
                                            fontSize === "large" ? "28px" :
                                            fontSize === "xlarge" ? "32px" :
                                            "24px", 
                                }}   >
                                        {player.summary}
                                    </div>
                                    <div className="audio__wrapper">
                                        <div className="audio__track--wrapper">
                                            <figure className="audio__track--image-mask">
                                                <figure
                                                    className="book__imaage--wrapper"
                                                    style={{
                                                        width: "48px",
                                                        height: "48px",
                                                        minWidth: "48px",
                                                    }}
                                                >
                                                    <img
                                                        className="book__image"
                                                        src={player.imageLink}
                                                        alt={player.title}
                                                    />
                                                </figure>
                                            </figure>
                                            <div className="audio__track--details--wrapper">
                                                <div className="audio__track--title">
                                                    {player.title}
                                                </div>
                                                <div className="audio__track--author">
                                                    {player.author}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="audio__controls--wrapper">
                                            <audio
                                                id={`audio-player-${player.id}`}
                                                src={player.audioLink}
                                                onTimeUpdate={(e) =>
                                                    handleAudioTimeUpdate(
                                                        e.target as HTMLAudioElement
                                                    )
                                                }
                                                onLoadedMetadata={(e) =>
                                                    setDuration(
                                                        (e.target as HTMLAudioElement).duration
                                                    )
                                                }
                                            ></audio>
                                            <div className="audio__controls">
                                                <button
                                                    className="audio__controls--btn"
                                                    title="Previous"
                                                    onClick={() => {
                                                        const audioElement = document.getElementById(
                                                            `audio-player-${player.id}`
                                                        ) as HTMLAudioElement;
                                                        if (audioElement)
                                                            audioElement.currentTime = Math.max(
                                                                0,
                                                                audioElement.currentTime - 10
                                                            );
                                                    }}
                                                >
                                                    <RiReplay10Fill />
                                                </button>
                                                <button
                                                    className="audio__controls--btn audio__controls--btn-play"
                                                    title="Play"
                                                    onClick={() => {
                                                        const audioElement = document.getElementById(
                                                            `audio-player-${player.id}`
                                                        ) as HTMLAudioElement;
                                                        if (audioElement) audioElement.play();
                                                    }}
                                                >
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 512 512"
                                                        className="audio__controls--play-icon"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M96 52v408l320-204L96 52z"></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    className="audio__controls--btn"
                                                    title="Pause"
                                                    onClick={() => {
                                                        const audioElement = document.getElementById(
                                                            `audio-player-${player.id}`
                                                        ) as HTMLAudioElement;
                                                        if (audioElement) audioElement.pause();
                                                    }}
                                                >
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth="0"
                                                        viewBox="0 0 24 24"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="6"
                                                            y="4"
                                                            width="4"
                                                            height="16"
                                                        ></rect>
                                                        <rect
                                                            x="14"
                                                            y="4"
                                                            width="4"
                                                            height="16"
                                                        ></rect>
                                                    </svg>
                                                </button>
                                                <button
                                                    className="audio__controls--btn"
                                                    title="Next"
                                                    onClick={() => {
                                                        const audioElement = document.getElementById(
                                                            `audio-player-${player.id}`
                                                        ) as HTMLAudioElement;
                                                        if (audioElement)
                                                            audioElement.currentTime = Math.min(
                                                                audioElement.duration,
                                                                audioElement.currentTime + 10
                                                            );
                                                    }}
                                                >
                                                    <RiForward10Fill />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="audio__progress--wrapper">
                                            <div className="audio__time">
                                                {formatTime(currentTime)}
                                            </div>
                                            <label
                                                htmlFor={`audio-progress-${player.id}`}
                                                className="visually-hidden"
                                            ></label>
                                            <input
                                                type="range"
                                                id={`audio-progress-${player.id}`}
                                                className="audio__progress--bar"
                                                value={currentTime}
                                                onChange={(e) => {
                                                    const audioElement = document.getElementById(
                                                        `audio-player-${player.id}`
                                                    ) as HTMLAudioElement;
                                                    if (audioElement)
                                                        audioElement.currentTime = parseFloat(
                                                            e.target.value
                                                        );
                                                    setCurrentTime(parseFloat(e.target.value));
                                                }}
                                                max={duration}
                                                title="Audio progress bar"
                                            />
                                            <div className="audio__time">
                                                {formatTime(duration)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No books available</div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                toggleModal={toggleModal}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}