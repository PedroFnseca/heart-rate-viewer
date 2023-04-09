import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  function onClick() {
    sessionStorage.removeItem("token");
    setIsHovered(false);
    router.push("/auth");
  }

  function handleHover() {
    setIsHovered(true);
  }

  function handleLeave() {
    setIsHovered(false);
  }

  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center hover:bg-blue-700 transition duration-200"
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <span className="mr-1">
        <AiOutlineLogout />
      </span>
      {isHovered ? "Desconectar" : "Sair"}
    </button>
  );
}