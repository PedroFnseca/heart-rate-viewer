import { useForm } from "react-hook-form"

export default function GeneralConfig() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto bg-white shadow-md rounded-md px-8 py-6">
      <div className="pb-2">
        <h1 className="text-xl font-bold text-black mb-2 text-left">Meus dados</h1>
        <hr className="my-2 border-blue-300"/>
        <label className="block text-gray-600 font-bold mb-2">Nome:</label>
        <input
          autoComplete="off"
          type="text"
          {...register("name", { required: true })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" 
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

        <label className="block text-gray-600 font-bold mb-2">Email:</label>
        <input
          autoComplete="off"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" 
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col mt-5">
        <h1 className="text-xl font-bold text-black mb-2 text-left">Contato de emergência</h1>
        <hr className="my-2 border-blue-300"/>
        <label className="block text-gray-600 font-bold mb-2">Nome:</label>
        <input
          autoComplete="off"
          type="text"
          {...register("emergencyContactName", { required: true })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
        />
        {errors.emergencyContactName && <span className="text-red-500 text-xs">{errors.emergencyContactName.message}</span>}

        <label className="block text-gray-600 font-bold mb-2">Telefone:</label>
        <input
          autoComplete="off"
          type="text"
          {...register("emergencyContactPhone", { required: true })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
        />
        {errors.emergencyContactPhone && <span className="text-red-500 text-xs">{errors.emergencyContactPhone.message}</span>}

        <label className="block text-gray-600 font-bold mb-2">Email:</label>
        <input
          autoComplete="off"
          type="email"
          {...register("emergencyContactEmail", { required: true, pattern: /^\S+@\S+$/i })}
          className="appearance-none border rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
        />
        {errors.emergencyContactEmail && <span className="text-red-500 text-xs">{errors.emergencyContactEmail.message}</span>}
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out flex">
          Enviar
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </form>
  )
}