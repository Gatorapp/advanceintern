"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  toggleModal: () => void;
  onLogin?: () => void;
  onLoginSuccess?: () => void;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, toggleModal }: ModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  if (!isOpen) return null;

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      toggleModal();
      router.push("/for-you");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("guestUser", "true");
    toggleModal();
    router.push("/for-you");
  };

  const handleGoogleLogin = async () => {
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toggleModal();
      router.push("/for-you");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="modal__overlay" onClick={toggleModal}></div>
      <div className="modal">
        <div className="modal__content">
          <span className="modal__close" onClick={toggleModal}>
            &times;
          </span>
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          {error && <p className="error">{error}</p>}
          <button className="btn btn--guest" onClick={handleGuestLogin}>
            Login as a Guest
          </button>
          <div className="divider">
            <span>or</span>
          </div>
          <button className="btn btn--google" onClick={handleGoogleLogin}>
            Login with Google
          </button>
          <form onSubmit={handleAuth}>
            <div className="form__group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="form__group--forgot">
            <a href="#" className="forgot__password">
              Forgot your Password?
            </a>
          </div>
          <button className="auth__switch--btn" type="button" onClick={toggleSignUp}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </>
  );
}