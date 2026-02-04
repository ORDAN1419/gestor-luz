// app/components/PublicLanding.tsx

// 1. Definimos qué tipo de datos recibe (puedes usar 'any' para empezar rápido)
interface Props {
  session?: any; 
}

// 2. Le decimos a la función que use esas Props
export default function PublicLanding({ session }: Props) { 
  return (
    <div>
      {/* Tu código de la calculadora aquí */}
      {session ? <p>Hola usuario</p> : <p>Invitado</p>}
    </div>
  );
}