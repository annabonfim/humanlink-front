export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} HumanLink. Todos os direitos reservados.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/sobre" className="hover:underline">Sobre</a>
          <a href="/recursos" className="hover:underline">Recursos</a>
          <a href="/contato" className="hover:underline">Contato</a>
        </div>
      </div>
    </footer>
  )
}
