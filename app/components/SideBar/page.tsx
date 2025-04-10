import { FaHome, FaBookmark, FaHighlighter, FaSearch } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import "./Sidebar.css";
import { useRouter } from "next/compat/router";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";
import { useAuth } from "@/AuthContext";


export default function Sidebar() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(""); 

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleLogin = () => {
    localStorage.setItem("userToken", "dummyToken");
    login();
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    router?.push("/for-you");
  };

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
    localStorage.setItem("selectedLink", link); 
  };
  

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link href="/for-you" passHref>
          <img src="/assets/logo.png" alt="logo" width={100} height={100} style={{ cursor: "pointer" }} />
        </Link>
      </div>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
        <a
          className={`sidebar__link--wrapper ${selectedLink === "/for-you" ? "selected" : ""}`}
          href="/for-you"
          onClick={() => handleLinkClick("/for-you")}
        >
        <div className="sidebar__link--line"></div>
        <div className="sidebar__icon--wrapper">
        <FaHome />
        </div>
        <div className="sidebar__link--text">For you</div>
        </a>
          <a
            className={`sidebar__link--wrapper ${selectedLink === "/my-library" ? "selected" : ""}`}
            href="/my-library"
            onClick={() => handleLinkClick("/my-library")}
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaBookmark />
            </div>
            <div className="sidebar__link--text">My Library</div>
          </a>
          <a 
          className={`sidebar__link--wrapper ${selectedLink === "/highlights" ? "selected" : ""}`}  
          href="/for-you"
          onClick={() => handleLinkClick("/highlights")}>
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaHighlighter />
            </div>
            <div className="sidebar__link--text">Highlights</div>
          </a>
          <a className="sidebar__link--wrapper" href="/for-you">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <FaSearch />
            </div>
            <div className="sidebar__link--text">Search</div>
          </a>
        </div>
        <div className="sidebar__bottom">
          <div className="sidebar__footer">
            <a 
            className={`sidebar__link--wrapper ${selectedLink === "/settings" ? "selected" : ""}`} 
            href="/settings"            
            onClick={() => handleLinkClick("/settings")}
            >
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <CiSettings />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </a>
            <a
            className={`sidebar__link--wrapper ${selectedLink === "/helpsupport" ? "selected" : ""}`}
            href="/for-you"
            onClick={() => handleLinkClick("/helpsupport")}
          >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper">
              <IoIosHelpCircleOutline />
            </div>
            <div className="sidebar__link--text">Help & Support</div>
          </a>

            {isLoggedIn ? (
              <div
                className="sidebar__link--wrapper"
                onClick={handleSignInClick}
              >
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <IoIosLogOut />
                </div>
                <div className="sidebar__link--text">Login</div>
              </div>
            ) : (
              <div
                className="sidebar__link--wrapper"
                onClick={handleLogin}
              >
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <IoIosLogOut />
                </div>
                <div className="sidebar__link--text">Logout</div>
              </div>
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
    </div>
  );
};

