export default function Breadcrumbs() {
  return (
    <nav aria-label="Migajas de pan" className="max-w-6xl w-full mx-auto px-4 py-3 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Inicio
          </a>
        </li>
        <li className="text-slate-400">/</li>
        <li className="text-slate-600 font-medium">
          Calculadora de Luz Perú
        </li>
      </ol>
    </nav>
  )
}