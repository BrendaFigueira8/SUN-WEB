import { Target, Calendar, Award } from "lucide-react";
// no hooks needed in App after removing contact form
import WeeklyPlanner from "./components/WeeklyPlanner";
import { HabitTracker } from "./components/HabitTracker";
import { CommitmentsList } from "./components/CommitmentsList";
import { WeeklyTasks } from "./components/WeeklyTasks";
import { StatusLegend } from "./components/StatusLegend";
const logo = new URL("./assets/logo.png", import.meta.url).href;

function App() {
  // contact form removed — WeeklyPlanner will be displayed below

  return (
    <div className="min-h-screen bg-[#FBF5DF]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={logo} className="w-16 h-16 object-contain" />
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a
                                                                                href="#sobre"
                    className="text-gray-700 hover:text-[#3D618A] transition-colors duration-200 font-medium"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#servicos"
                    className="text-gray-700 hover:text-[#3D618A] transition-colors duration-200 font-medium"
                  >
                    Como Funciona?
                  </a>
                </li>
                <li>
                  <a
                    href="#planejamento-semanal"
                    className="text-gray-700 hover:text-[#3D618A] transition-colors duration-200 font-medium"
                  >
                    Planejamento Semanal
                  </a>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="text-gray-700 hover:text-[#3D618A] transition-colors duration-200 font-medium"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
            <button className="md:hidden text-gray-700">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Sobre o Sun
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
            </div>
            <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
              <p className="text-lg text-gray-700 leading-relaxed">
                SUN é uma iniciativa que oferece suporte para quem está
                enfrentando desafios da vida, como ansiedade, depressão ou falta
                de organização. Não se trata de "superar" esses problemas de
                forma definitiva, mas sim de criar momentos de progresso
                contínuo em direção a uma vida mais plena e equilibrada.
              </p>
            </article>
          </div>
        </section>

        <section
          id="servicos"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Como Funciona?
              </h2>
              <div className="w-20 h-1 bg-[#EBE1D7] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#E9D7A5] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Desafios
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  O SUN te incentiva a criar desafios para a semana. Coisas que
                  estão difíceis de fazer podem ficar mais fáceis quando se tem
                  um desafio a se cumprir.
                </p>
              </article>

              <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#E9D7A5] rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Planejamento Semanal
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  SUN ajuda você a definir metas e a criar um plano de ação para
                  a semana.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      O calendário visual é fundamental: organize compromissos,
                      tarefas, atividades de autocuidado e tempo livre.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      A plataforma oferece sugestões para otimizar sua rotina
                      com base em seus desafios.
                    </span>
                  </li>
                </ul>
              </article>

              <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#E9D7A5] rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Recompensas para Avançar
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cada conquista, por menor que seja, te recompensa a progredir
                  na jornada:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      Você ganha pontos ao atingir uma meta ou se manter
                      consistente durante a semana.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>
                      Isso cria um sentimento positivo e motivação para
                      continuar se desenvolvendo.
                    </span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="planejador" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <WeeklyPlanner />
          </div>
        </section>

        {/* New Hero + Planner Summary Section */}
        <section id="planejamento-semanal" className="py-12 px-4 sm:px-6 lg:px-8">
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
                </div>
              </main>
            </div>
          </div>
        </section>

        <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contato
            </h2>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/BrendaFigueira8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 transition-colors duration-200"
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors duration-200"
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition-colors duration-200"
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

      <footer className="bg-[#3d618a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={logo} className="w-20 h-16 object-contain brightness-0 invert" />
          </div>
          <p className="text-white mb-4">
            &copy; 2025 Brenda Figueira. Todos os direitos reservados.<br />
            Este site oferece informações de apoio e não substitui tratamento profissional.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
