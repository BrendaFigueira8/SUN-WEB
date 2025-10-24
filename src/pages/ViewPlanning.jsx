import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const logo = new URL("../assets/new-logo.webp", import.meta.url).href;

export const ViewPlanning = () => {
  const [habits, setHabits] = useState([]);
  const [commitments, setCommitments] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const contentRef = useRef(null);

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const statusColors = {
    green: { bg: '#7FC06C', label: 'Verde: consegui fazer' },
    yellow: { bg: '#E2C15A', label: 'Amarelo: tempo livre' },
    red: { bg: '#D94A4A', label: 'Vermelho: foi cancelado' },
    orange: { bg: '#D68847', label: 'Laranja: adiado' }
  };

  // Carregar do localStorage ao montar o componente
  useEffect(() => {
    const saved = localStorage.getItem('weeklyPlanning');
    if (saved) {
      const data = JSON.parse(saved);
      setHabits(data.habits || []);
      setCommitments(data.commitments || []);
      setWeeklyTasks(data.weeklyTasks || []);
    }
  }, []);

  const downloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      // Capturar o elemento HTML como imagem
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FBF5DF',
        logging: false,
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('planejamento-semanal.pdf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const hasData = habits.length > 0 || commitments.length > 0 || weeklyTasks.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-[#FBF5DF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#3C342B] mb-4">Nenhum planejamento encontrado</h1>
          <p className="text-[#7C6E65] mb-8">Crie seu primeiro planejamento para visualizar e baixar.</p>
          <Link
            to="/criar-planejamento"
            className="px-8 py-3 bg-[#B6926C] text-white rounded-full font-semibold hover:bg-[#3C342B] transition-colors shadow-lg inline-block"
          >
            Criar Planejamento
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF5DF]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-[#3C342B] hover:text-[#B6926C] transition-colors">
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar
            </Link>
            <img src={logo} className="h-12 w-auto object-contain" alt="Logo Sun" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8E705B] mb-3 sm:mb-4">
            Meu Planejamento Semanal
          </h1>
          <p className="text-sm sm:text-base text-[#7C6E65] max-w-2xl mx-auto px-2">
            Visualize e baixe seu planejamento em PDF
          </p>
        </div>

        {/* Conteúdo para PDF */}
        <div ref={contentRef} className="space-y-8 hide-placeholders">
          {/* Hábitos Diários */}
          {habits.length > 0 && (
            <section className="bg-white rounded-xl border-4 border-[#8AA87B] p-4 sm:p-6 shadow-sm">
              <div className="bg-[#9DBF93] -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#21321F]">1. Hábitos Diários</h2>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-[1fr_repeat(7,60px)] gap-2 mb-4 pb-3 border-b-2 border-[#8AA87B]">
                    <div className="font-semibold text-[#21321F]">Hábito</div>
                    {days.map((day, index) => (
                      <div key={index} className="text-center text-xs font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {habits.map((habit, habitIndex) => (
                      <div key={habitIndex} className="grid grid-cols-[1fr_repeat(7,60px)] gap-2 items-center">
                        <div className="px-3 py-3 border-2 border-[#8AA87B] rounded-lg text-sm bg-white">
                          {habit.name || '\u00A0'}
                        </div>

                        {days.map((day, dayIndex) => (
                          <div key={dayIndex} className="flex justify-center">
                            <div
                              className="w-8 h-8 rounded-full border-2 border-gray-300"
                              style={{
                                backgroundColor: habit.days[dayIndex] ? statusColors[habit.days[dayIndex]].bg : 'white'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Compromissos */}
          {commitments.length > 0 && (
            <section className="bg-white rounded-xl border-4 border-[#D68847] p-4 sm:p-6 shadow-sm">
              <div className="bg-[#E7A76B] -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#3F2E20]">2. Compromissos</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 px-3 sm:px-4 py-2 border-2 border-[#D68847] rounded-lg text-sm sm:text-base bg-white">
                      {commitment.name || '\u00A0'}
                    </div>
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm flex items-center justify-center border-2 flex-shrink-0 ${
                        commitment.status === 'check'
                          ? 'bg-[#7FC06C] border-[#7FC06C] text-white'
                          : commitment.status === 'x'
                          ? 'bg-[#D94A4A] border-[#D94A4A] text-white'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {commitment.status === 'check' && '✓'}
                      {commitment.status === 'x' && '✗'}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tarefas da Semana */}
          {weeklyTasks.length > 0 && (
            <section className="bg-white rounded-xl border-4 border-[#C7B192] p-4 sm:p-6 shadow-sm">
              <div className="bg-[#D6C29A] -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#4A3F36]">3. Tarefas da Semana</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {weeklyTasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 px-3 sm:px-4 py-2 border-2 border-[#C7B192] rounded-lg text-sm sm:text-base bg-white">
                      {task.name || '\u00A0'}
                    </div>
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 flex-shrink-0"
                      style={{
                        backgroundColor: task.color ? statusColors[task.color].bg : 'white'
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Legenda de Cores */}
          <div className="bg-[#EDE5DA] rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-sm">
              {Object.entries(statusColors).map(([key, data]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: data.bg }}
                  />
                  <span className="text-[#3E322A] text-[10px] sm:text-xs">{data.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-8">
          <Link
            to="/criar-planejamento"
            className="px-6 sm:px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors text-center text-sm sm:text-base"
          >
            Editar Planejamento
          </Link>
          <button
            onClick={downloadPDF}
            className="px-6 sm:px-8 py-3 bg-[#3C342B] text-white rounded-full font-semibold hover:bg-[#B6926C] transition-colors shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar PDF
          </button>
        </div>
      </main>
    </div>
  );
};
