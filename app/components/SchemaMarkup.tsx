// app/components/SchemaMarkup.tsx - VERSIÓN OPTIMIZADA
export default function SchemaMarkup() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Calculadora de Luz Perú 2026",
                        "description": "Calculadora gratuita para estimar recibos de electricidad en Perú con precisión. Ahorra en tu factura de luz.",
                        "url": "https://www.gestorluz.com",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "PEN",
                            "availability": "https://schema.org/InStock"
                        },
                        "author": {
                            "@type": "Organization",
                            "name": "Gestor de Luz Perú",
                            "url": "https://www.gestorluz.com",
                            "logo": "https://www.gestorluz.com/logo.png",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Paita",
                                "addressRegion": "Piura",
                                "addressCountry": "PE"
                            }
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": "125",
                            "bestRating": "5",
                            "worstRating": "1"
                        },
                        "featureList": [
                            "Cálculo preciso de recibos de luz",
                            "Historial de consumo mensual",
                            "Comparativa de tarifas por región",
                            "Guías de ahorro energético",
                            "Dashboard personalizado"
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Inicio",
                                "item": "https://www.gestorluz.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Calculadora de Luz Perú",
                                "item": "https://www.gestorluz.com/CalculadoraLuz"
                            }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "¿La calculadora de luz es precisa para todo Perú?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Sí, nuestra calculadora utiliza las tarifas oficiales de OSINERGMIN y se ajusta automáticamente según tu departamento, distrito y proveedor eléctrico (Enosa, Luz del Sur, etc.)."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Cómo calculan el alumbrado público en el recibo?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "El alumbrado público se calcula según rangos establecidos por cada municipalidad peruana, basados en tu nivel de consumo mensual en kWh."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Es gratis usar la calculadora de luz?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Totalmente gratis. No requiere registro para cálculos básicos. Solo necesitas crear una cuenta si quieres guardar historial y personalizar tarifas."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Los datos de mi consumo son seguros?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Sí, usamos encriptación SSL de 256 bits y cumplimos con la Ley de Protección de Datos Personales del Perú (Ley 29733). Tus datos nunca se comparten con terceros."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Puedo calcular mi recibo sin tener el recibo anterior?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Sí, puedes usar valores estimados. Para mayor precisión, recomendamos ingresar los datos exactos de tu último recibo de luz."
                                }
                            }
                        ]
                    }
                ])
            }}
        />
    )
}