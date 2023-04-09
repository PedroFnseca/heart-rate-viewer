import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { decodeJWT } from "@/utils/JWT";

export default function GeneralConfig() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userData, setUserData] = useState({});

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  const onSubmit = async (data) => {
    setIsLoading(true);

    const token = sessionStorage.getItem("token");
    const id = decodeJWT(token).id;

    data.emergency_contact_id = userData.emergency_contact_id;

    const response = await fetch(`/api/user?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Dados atualizados com sucesso!");
    } else {
      alert("Erro ao atualizar dados!");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const id = decodeJWT(token).id;

    getUserData(id)
  }, [])

  async function getUserData(id) {
    const response = await fetch(`/api/user?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      showUserDataInInputs(data);
    }

    setIsLoading(false);
    setIsFirstLoad(false);
  }

  function showUserDataInInputs(data){
    setUserData(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto bg-white shadow-md rounded-md px-8 py-6">
      <div className="flex flex-col mt-5 pb-2">
        <h1 className="text-xl font-bold text-black mb-2 text-left">Meus dados</h1>
        <hr className="my-2 border-blue-300"/>
        <label className="block text-gray-600 font-bold mb-2">Nome:</label>
        <input
          autoComplete="off"
          type="text"
          defaultValue={userData.username}
          {...register("username", { required: true })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" 
        />
        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}

        <label className="block text-gray-600 font-bold mb-2">Email:</label>
        <input
          autoComplete="off"
          type="email"
          defaultValue={userData.email}
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" 
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col mt-5 pb-2">
        <h1 className="text-xl font-bold text-black mb-2 text-left">Contato de emergência</h1>
        <hr className="my-2 border-blue-300"/>
        <label className="block text-gray-600 font-bold mb-2">Nome:</label>
        <input
          autoComplete="off"
          type="text"
          defaultValue={userData.emergency_contact_name}
          {...register("emergency_contact_name", { required: true })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
        />
        {errors.emergency_contact_name && <span className="text-red-500 text-xs">{errors.emergency_contact_name.message}</span>}

        <label className="block text-gray-600 font-bold mb-2">Telefone:</label>
        <input
          autoComplete="off"
          type="text"
          defaultValue={userData.emergency_contact_phone}
          {...register("emergency_contact_phone", { required: true })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
        />
        {errors.emergency_contact_phone && <span className="text-red-500 text-xs">{errors.emergency_contact_phone.message}</span>}

        <label className="block text-gray-600 font-bold mb-2">Email:</label>
        <input
          autoComplete="off"
          type="email"
          defaultValue={userData.emergency_contact_email}
          {...register("emergency_contact_email", { required: true, pattern: /^\S+@\S+$/i })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
        />
        {errors.emergency_contact_email && <span className="text-red-500 text-xs">{errors.emergency_contact_email.message}</span>}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out flex ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a 8 0 100-16 8 8 0 000 16z"
                ></path>
              </svg>
              { isFirstLoad ? "Carregando..." : "Atualizando..." }
            </>
          ) : (
            <>
              Enviar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  )
}