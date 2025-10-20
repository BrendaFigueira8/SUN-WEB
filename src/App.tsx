import { Sun, Target, Calendar, Award } from 'lucide-react';
// no hooks needed in App after removing contact form
import WeeklyPlanner from './components/WeeklyPlanner';
import logo from "./assets/logo.png"

function App() {
  // contact form removed — WeeklyPlanner will be displayed below

  return (
    <div className="min-h-screen bg-[#BB9A7F]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={logo} className='w-auto h-12 object-contain'/> 
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="#sobre" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                    Descrição
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                    Como Funciona?
                  </a>
                </li>
                <li>
                  <a href="#contato" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium">
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                Descrição Sobre o Aplicativo Sun
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
            </div>
            <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
              <p className="text-lg text-gray-700 leading-relaxed">
                SUN é uma iniciativa que oferece suporte para quem está enfrentando desafios da vida, como ansiedade,
                depressão ou falta de organização. Não se trata de "superar" esses problemas de forma definitiva,
                mas sim de criar momentos de progresso contínuo em direção a uma vida mais plena e equilibrada.
              </p>
            </article>
          </div>
        </section>

        <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Como Funciona?
              </h2>
              <div className="w-20 h-1 bg-[#EBE1D7] mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#BB9A7F] rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Desafios</h3>
                <p className="text-gray-700 leading-relaxed">
                  O SUN te incentiva a criar desafios para a semana. Coisas que estão difíceis de fazer podem
                  ficar mais fáceis quando se tem um desafio a se cumprir.
                </p>
              </article>

              <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#BB9A7F] rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Planejamento Semanal</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  SUN ajuda você a definir metas e a criar um plano de ação para a semana.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>O calendário visual é fundamental: organize compromissos, tarefas, atividades de autocuidado e tempo livre.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>A plataforma oferece sugestões para otimizar sua rotina com base em seus desafios.</span>
                  </li>
                </ul>
              </article>

              <article className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#BB9A7F] rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Recompensas para Avançar</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cada conquista, por menor que seja, te recompensa a progredir na jornada:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Você ganha pontos ao atingir uma meta ou se manter consistente durante a semana.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Isso cria um sentimento positivo e motivação para continuar se desenvolvendo.</span>
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
      </main>

      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sun className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold">SUN</span>
          </div>
          <p className="text-gray-400">
            &copy; 2025 SUN. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
