import { FaHome, FaBookmark, FaHighlighter, FaSearch } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useRouter } from "next/compat/router";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";
import { useAuth } from "@/AuthContext";
import { RiFontSize } from "react-icons/ri";
import { useFontSize } from "@/FontSizeContext";
import "./Sidebar.css";
import { usePathname } from "next/navigation";



export default function Sidebar() {
  const { isLoggedOut, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const [selectedLink, setSelectedLink] = useState("");
  const { fontSize, setFontSize } = useFontSize();

  const isPlayerPage = /^\/player\/[^/]+$/.test(pathname || "");






  const handleLogin = () => {
    localStorage.setItem("userToken", "dummyToken");
    setIsModalOpen(true);
    login();
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    logout();
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    router?.push("#");
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  const handleFontSizeClick = (size: string) => {
    setFontSize(size); // Update the global font size
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
            href="#"
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
          {isPlayerPage && (
            <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
              <div
                className={`sidebar__font--size-icon ${fontSize === "small" ? "sidebar__font--size-icon--active" : ""
                  }`}
                onClick={() => handleFontSizeClick("small")}
                title="Small Font"
              >
                <RiFontSize style={{ fontSize: "12px" }} />
              </div>
              <div
                className={`sidebar__font--size-icon ${fontSize === "medium" ? "sidebar__font--size-icon--active" : ""
                  }`}
                onClick={() => handleFontSizeClick("medium")}
                title="Medium Font"
              >
                <RiFontSize style={{ fontSize: "16px" }} />
              </div>
              <div
                className={`sidebar__font--size-icon ${fontSize === "large" ? "sidebar__font--size-icon--active" : ""
                  }`}
                onClick={() => handleFontSizeClick("large")}
                title="Large Font"
              >
                <RiFontSize style={{ fontSize: "20px" }} />
              </div>
              <div
                className={`sidebar__font--size-icon ${fontSize === "xlarge" ? "sidebar__font--size-icon--active" : ""
                  }`}
                onClick={() => handleFontSizeClick("xlarge")}
                title="Extra Large Font"
              >
                <RiFontSize style={{ fontSize: "24px" }} />
              </div>
            </div>
          )}

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
              className={`sidebar__link--wrapper ${selectedLink === "/for-you" ? "selected" : ""}`}
              href="/for-you"
              onClick={() => handleLinkClick("/for-you")}
            >
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <IoIosHelpCircleOutline />
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </a>

            {isLoggedOut ? (
              <div
                className="sidebar__link--wrapper"
                onClick={handleLogin}
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
                onClick={handleLogout}
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

