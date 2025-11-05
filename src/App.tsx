import { useState } from "react";
import { Link } from "react-router-dom";
import { HabitTracker } from "./components/HabitTracker";
import { CommitmentsList } from "./components/CommitmentsList";
import { WeeklyTasks } from "./components/WeeklyTasks";
import { StatusLegend } from "./components/StatusLegend";
import { RandomCatBackground } from "./components/RandomCatBackground";

const logo = new URL("./assets/new-logo.webp", import.meta.url).href;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF5DF] flex flex-col">
      <RandomCatBackground /> {/* componente responsável pelo plano de fundo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <nav className="hidden md:block">
              <ul className="flex items-center justify-center space-x-12">
                <li>
                  <a
                  //mudança no header - ajuste das cores das letras
                    href="#sobre"
                    className="text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#planejamento-semanal"
                    className="text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                  >
                    Modelo
                  </a>
                </li>
                <li>
                  <Link
                    to="/criar-planejamento"
                    className="text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                  >
                    Criar Planejamento
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visualizar-planejamento"
                    className="text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                  >
                    Visualizar Planejamento
                  </Link>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-4">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#sobre"
                    className="block text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#planejamento-semanal"
                    className="block text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Modelo
                  </a>
                </li>
                <li>
                  <Link
                    to="/criar-planejamento"
                    className="block text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Criar Planejamento
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visualizar-planejamento"
                    className="block text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Visualizar Planejamento
                  </Link>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="block text-gray-700 hover:text-[#7C6E65] transition-colors duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16 flex-grow">
        <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3C342B] mb-6 tracking-tight">
                Planeje, Respire, Avance
                <br />
                <span className="text-[#B6926C]">Uma Vida com Mais Luz</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[#B6926C] to-[#E9D7A5] mx-auto rounded-full mb-16" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex justify-center shrink-0">
                <img src={logo} className="h-[250px] w-auto object-contain" alt="Logo Sun" />
              </div>
              <article className="flex-1 bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-gray-700 leading-relaxed">
                  A SUN é uma iniciativa criada para apoiar pessoas que estão enfrentando desafios da vida, como ansiedade, depressão, desmotivação ou dificuldades em se organizar.
                  Nosso propósito não é “curar” ou “superar” esses momentos de forma definitiva, mas sim construir pequenos avanços diários, promovendo uma jornada de autoconhecimento, equilíbrio e bem-estar.
                  Cada passo conta, e acreditamos que o progresso, é o que nos move em direção a uma vida mais leve e significativa.
                </p>
              </article>
            </div>
          </div>
        </section>
        {/* New Hero + Planner Summary Section */}
        <section id="planejamento-semanal" className="py-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="min-h-screen bg-background">
              {/* Hero Section */}
              <header className="py-16 px-4 animate-fade-in">
                <div className="max-w-7xl mx-auto text-center">
                  <div className="inline-block mb-4">
                    <div className="h-1 w-20 bg-[#B6926C] rounded-full mx-auto mb-6" />
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-[#3C342B] mb-4 tracking-tight">
                    Planejamento
                    <br />
                    <span className="text-[#B6926C]">Semanal</span>
                  </h1>
                  <p className="text-base text-[#7C6E65] max-w-2xl mx-auto leading-relaxed">
                    Lembre-se de não ultrapassar seus limites, faça com calma.
                    <br />
                    Com esses "pequenos" passos te levaram em direção à vida {'<3'}
                  </p>
                </div>
              </header>

              {/* Main Content */}
              <main className="px-4 pb-16">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
                    <HabitTracker />
                    <CommitmentsList />
                    <WeeklyTasks />
                  </div>

                  <StatusLegend />

                  {/* Call to Action Button */}
                  <div className="mt-12 text-center">
                    <a
                      href="/criar-planejamento"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#B6926C] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#3C342B] transition-all duration-300 hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Criar Meu Planejamento
                    </a>
                    <p className="mt-4 text-sm text-[#7C6E65]">
                      Comece agora a organizar sua semana!
                    </p>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>

        <section id="contato" className="pt-8 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12 bg-red-50 border-2 border-red-400 rounded-xl p-6 max-w-xl mx-auto">
              <p className="text-red-800 font-semibold text-base leading-relaxed">
                <span className="block mb-2 text-lg">⚠️ Importante ⚠️</span>
                Se você está em crise ou pensando em se machucar, ligue para o CVV (Centro de Valorização da Vida) no <a href="tel:188" className="underline hover:text-red-600">188</a> ou acesse <a href="https://cvv.org.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600">cvv.org.br</a>
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#3C342B] mb-4">
              Contato
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-[#B6926C] to-[#E9D7A5] mx-auto rounded-full mb-8" />

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/BrendaFigueira8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#3C342B] text-white rounded-full shadow hover:bg-[#B6926C] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.467-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.656 1.653.244 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.815 1.103.815 2.222 0 1.606-.015 2.903-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/brenda-figueira/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#3C342B] text-white rounded-full shadow hover:bg-[#B6926C] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4zM8.5 8h3.75v2.2h.05c.52-.98 1.8-2.2 3.7-2.2 3.96 0 4.7 2.6 4.7 5.98V24h-4v-7.1c0-1.69-.03-3.86-2.35-3.86-2.35 0-2.71 1.83-2.71 3.72V24h-4z" />
                </svg>
                LinkedIn
              </a>

              <a
                href="https://www.instagram.com/brendafigueira8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#3C342B] text-white rounded-full shadow hover:bg-[#B6926C] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm5 5.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm6.5-.75a1.25 1.25 0 1 1-1.25-1.25A1.25 1.25 0 0 1 18.5 6.75zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#3C342B] py-8 mt-auto">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={logo} className="w-20 h-16 object-contain brightness-0 invert" alt="Logo Sun" />
          </div>
          <p className="text-white">
            &copy; 2025 Brenda Figueira. Todos os direitos reservados.<br />
            Este site oferece informações de apoio e não substitui tratamento profissional.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
