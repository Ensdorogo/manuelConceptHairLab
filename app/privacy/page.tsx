import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="bg-[#f7f5f2] min-h-screen flex flex-col">

            {/* ── Header Scuro (Per contrasto Navbar) ── */}
            <div className="bg-[#1a1a1a] pb-16">
                <Navbar />

                <div className="max-w-[95%] mx-auto px-8 md:px-16 pt-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 mb-8 anony text-xs tracking-wider uppercase">
                        <span>←</span> Torna alla Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Privacy Policy
                    </h1>
                </div>
            </div>

            {/* ── Contenuto Testuale ── */}
            <div className="flex-1 max-w-[95%] mx-auto px-8 md:px-16 py-20 w-full text-[#1a1a1a]/80 leading-relaxed text-base">

                <div className="space-y-16">

                    {/* Sezione 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
                            Nessuna Raccolta Dati dal Sito Web
                        </h2>
                        <div className="h-px w-8 bg-[#1a1a1a]/20 mb-6" />
                        <p>
                            Presso <strong>Manuel Concept Hair Lab</strong> teniamo alla tua privacy. Desideriamo informare i nostri visitatori che il presente sito web ha uno scopo puramente informativo e di vetrina.
                        </p>
                        <p className="mt-4">
                            <strong>Non raccogliamo in alcun modo dati personali</strong> durante la tua navigazione sul sito.
                        </p>
                        <ul className="list-disc pl-6 mt-6 space-y-3 text-[#1a1a1a]/70">
                            <li>Non utilizziamo form di contatto automatici o moduli di iscrizione.</li>
                            <li>Non impieghiamo cookie di profilazione o strumenti di tracciamento invasivi per scopi di marketing.</li>
                            <li>Nessun dato viene salvato, richiesto o immagazzinato nei nostri database tramite la semplice consultazione del sito.</li>
                        </ul>
                    </section>

                    {/* Sezione 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
                            Modalità di Prenotazione e Contatto
                        </h2>
                        <div className="h-px w-8 bg-[#1a1a1a]/20 mb-6" />
                        <p>
                            Poiché il sito non raccoglie dati, gli appuntamenti e le richieste di informazioni possono avvenire esclusivamente attraverso i canali diretti forniti:
                        </p>
                        <ul className="list-disc pl-6 mt-6 space-y-3 text-[#1a1a1a]/70">
                            <li><strong>Chiamata telefonica:</strong> al numero fisso o mobile indicato.</li>
                            <li><strong>Email diretta:</strong> aprendo il tuo client di posta per inviare una comunicazione.</li>
                        </ul>
                        <p className="mt-6">
                            Qualora tu decida di contattarci tramite questi mezzi, tratteremo i dati condivisi volontariamente (es. nome, numero di telefono, motivo dell&apos;appuntamento) in via prettamente privata ed esclusivamente per lo scopo di gestire l&apos;agenda e il tuo appuntamento in salone.
                        </p>
                    </section>

                    {/* Sezione 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
                            Social Media
                        </h2>
                        <div className="h-px w-8 bg-[#1a1a1a]/20 mb-6" />
                        <p>
                            Il sito potrebbe presentare dei link esterni (es. Instagram o Facebook). Cliccando su queste icone o collegamenti, vieni reindirizzato direttamente sulle rispettive app e piattaforme. Da quel momento, le interazioni saranno soggette alle specifiche policy sulla privacy dei rispettivi social network.
                        </p>
                    </section>

                    {/* Sezione 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 tracking-tight">
                            Titolare del Trattamento
                        </h2>
                        <div className="h-px w-8 bg-[#1a1a1a]/20 mb-6" />
                        <p>
                            Il Titolare del trattamento per i dati condivisi offline o via mail diretta è:<br /><br />
                            <strong>Manuel Concept Hair Lab</strong><br />
                            Via S. Vitale, 114,<br />
                            20831 Seregno MB<br />
                            Contatto: <a href="tel:+3903621739643" className="border-b border-[#1a1a1a]/30 hover:border-[#1a1a1a] transition-all">+39 0362 173 9643</a>
                        </p>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
}
