import CalculadoraLuz from '../components/CalculadoraLuz';
import SchemaMarkup from '../components/SchemaMarkup';

export default function Page() {
    return (
        <>
            <SchemaMarkup /> {/* Esto ayuda al SEO que vimos antes */}
            <CalculadoraLuz session={undefined} /> {/* Esto muestra tu calculadora */}
        </>
    );
}