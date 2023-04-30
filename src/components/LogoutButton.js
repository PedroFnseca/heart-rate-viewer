import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  function onClick() {
    sessionStorage.removeItem("token");
    setIsHovered(false);
    router.push("/auth");
  }

  function getSizeWindow() {
    return window.innerWidth;
  }

  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center hover:bg-blue-700 transition duration-200"
      onClick={onClick}
    >
      <span className="mr-1">
        <AiOutlineLogout />
      </span>
      { getSizeWindow() > 640 ? "Sair" : "" }
    </button>
  );
}