import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-sm py-6 px-4 bg-white rounded-md shadow-lg">
        <Image src="Bug.svg" alt="Página não encontrada" width={300} height={300} className="mb-2"/>

        <h2 className="text-2xl font-bold mb-4">Opsss... Página não encontrada</h2>
        <p className="text-lg mb-4">Desculpe, a página que você está tentando acessar não existe ou foi removida.</p>

        <Link href="/">
          <p className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200">
            Voltar para a página inicial
          </p>
        </Link>
      </div>
    </div>
  )
}