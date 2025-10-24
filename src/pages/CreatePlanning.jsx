import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const logo = new URL("../assets/new-logo.webp", import.meta.url).href;

export const CreatePlanning = () => {
  const [habits, setHabits] = useState([{ name: "", days: Array(7).fill(null) }]);
  const [commitments, setCommitments] = useState([{ name: "", status: null }]); // null, 'check', 'x'
  const [weeklyTasks, setWeeklyTasks] = useState([{ name: "", color: null }]); // null, 'green', 'yellow', 'red', 'orange'
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
      if (data.habits) setHabits(data.habits);
      if (data.commitments) setCommitments(data.commitments);
      if (data.weeklyTasks) setWeeklyTasks(data.weeklyTasks);
    }
  }, []);

  const addHabit = () => {
    setHabits([...habits, { name: "", days: Array(7).fill(false) }]);
  };

  const addCommitment = () => {
    setCommitments([...commitments, { name: "", completed: false }]);
  };

  const addWeeklyTask = () => {
    setWeeklyTasks([...weeklyTasks, { name: "", color: null }]);
  };

  const savePlanning = () => {
    const planningData = {
      habits,
      commitments,
      weeklyTasks,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('weeklyPlanning', JSON.stringify(planningData));
    alert('Planejamento salvo com sucesso!');
  };

  const clearPlanning = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o planejamento? Esta ação não pode ser desfeita.')) {
      // Limpar localStorage
      localStorage.removeItem('weeklyPlanning');
      
      // Resetar estados para valores iniciais
      setHabits([{ name: "", days: Array(7).fill(null) }]);
      setCommitments([{ name: "", status: null }]);
      setWeeklyTasks([{ name: "", color: null }]);
      
      alert('Planejamento limpo com sucesso!');
    }
  };

  const downloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      // Ocultar elementos que não devem aparecer no PDF
      const hideElements = contentRef.current.querySelectorAll('.hide-in-pdf');
      hideElements.forEach(el => el.style.display = 'none');

      // Adicionar classe para ocultar placeholders
      contentRef.current.classList.add('hide-placeholders');

      // Capturar o elemento HTML como imagem
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Maior qualidade
        useCORS: true,
        backgroundColor: '#FBF5DF',
        logging: false,
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight
      });

      // Restaurar elementos ocultos e remover classe
      hideElements.forEach(el => el.style.display = '');
      contentRef.current.classList.remove('hide-placeholders');

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Adicionar primeira página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Adicionar páginas adicionais se necessário
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

  const getColorForDay = (habit, dayIndex) => {
    return habit.days[dayIndex];
  };

  const cycleColorForDay = (habitIndex, dayIndex) => {
    const newHabits = [...habits];
    const currentColor = newHabits[habitIndex].days[dayIndex];
    // Ciclo: null → green → yellow → red → orange → null
    if (currentColor === null) {
      newHabits[habitIndex].days[dayIndex] = 'green';
    } else if (currentColor === 'green') {
      newHabits[habitIndex].days[dayIndex] = 'yellow';
    } else if (currentColor === 'yellow') {
      newHabits[habitIndex].days[dayIndex] = 'red';
    } else if (currentColor === 'red') {
      newHabits[habitIndex].days[dayIndex] = 'orange';
    } else {
      newHabits[habitIndex].days[dayIndex] = null;
    }
    setHabits(newHabits);
  };

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
            Criar Meu Planejamento
          </h1>
          <p className="text-sm sm:text-base text-[#7C6E65] max-w-2xl mx-auto px-2">
            Organize sua semana de forma personalizada. Adicione seus hábitos, compromissos e tarefas.
          </p>
        </div>

        <div ref={contentRef} className="space-y-8">
          {/* Hábitos Diários */}
          <section className="bg-white rounded-xl border-4 border-[#8AA87B] p-4 sm:p-6 shadow-sm">
            <div className="bg-[#9DBF93] -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#21321F]">1. Hábitos Diários</h2>
            </div>
            
            {/* Layout Desktop - Tabela */}
            <div className="hidden md:block">
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
                    <input
                      type="text"
                      placeholder="Ex: Tomar vitamina B12"
                      value={habit.name}
                      onChange={(e) => {
                        const newHabits = [...habits];
                        newHabits[habitIndex].name = e.target.value;
                        setHabits(newHabits);
                      }}
                      className="px-3 py-3 border-2 border-[#8AA87B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DBF93] text-sm"
                    />
                    
                    {days.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex justify-center">
                        <button
                          onClick={() => cycleColorForDay(habitIndex, dayIndex)}
                          className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:border-[#8AA87B] transition-all hover:scale-110"
                          style={{ 
                            backgroundColor: getColorForDay(habit, dayIndex) ? statusColors[getColorForDay(habit, dayIndex)].bg : 'white'
                          }}
                          title="Click para alternar cores"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Mobile/Tablet - Lista Vertical */}
            <div className="md:hidden space-y-6">
              {habits.map((habit, habitIndex) => (
                <div key={habitIndex} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ex: Tomar vitamina B12"
                    value={habit.name}
                    onChange={(e) => {
                      const newHabits = [...habits];
                      newHabits[habitIndex].name = e.target.value;
                      setHabits(newHabits);
                    }}
                    className="w-full px-3 py-3 border-2 border-[#8AA87B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DBF93] text-sm font-medium"
                  />
                  
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] font-medium text-gray-600">{day}</span>
                        <button
                          onClick={() => cycleColorForDay(habitIndex, dayIndex)}
                          className="w-9 h-9 rounded-full border-2 border-gray-300 cursor-pointer active:scale-95 transition-all"
                          style={{ 
                            backgroundColor: getColorForDay(habit, dayIndex) ? statusColors[getColorForDay(habit, dayIndex)].bg : 'white'
                          }}
                          title={`${day}`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {habitIndex < habits.length - 1 && (
                    <div className="border-b border-gray-200 pt-3" />
                  )}
                </div>
              ))}
            </div>
              
            <button
              onClick={addHabit}
              className="hide-in-pdf w-full py-2 border-2 border-dashed border-[#8AA87B] rounded-lg text-[#8AA87B] text-sm sm:text-base hover:bg-[#9DBF93]/10 transition-colors mt-3 sm:mt-4"
            >
              + Adicionar Hábito
            </button>
          </section>

          {/* Compromissos */}
          <section className="bg-white rounded-xl border-4 border-[#D68847] p-4 sm:p-6 shadow-sm">
            <div className="bg-[#E7A76B] -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#3F2E20]">2. Compromissos</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {commitments.map((commitment, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    placeholder="Ex: Vôlei - terça"
                    value={commitment.name}
                    onChange={(e) => {
                      const newCommitments = [...commitments];
                      newCommitments[index].name = e.target.value;
                      setCommitments(newCommitments);
                    }}
                    className="flex-1 px-3 sm:px-4 py-2 border-2 border-[#D68847] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E7A76B] text-sm sm:text-base"
                  />
                  <button
                    onClick={() => {
                      const newCommitments = [...commitments];
                      // Ciclo: null → check → x → null
                      if (newCommitments[index].status === null) {
                        newCommitments[index].status = 'check';
                      } else if (newCommitments[index].status === 'check') {
                        newCommitments[index].status = 'x';
                      } else {
                        newCommitments[index].status = null;
                      }
                      setCommitments(newCommitments);
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-sm flex items-center justify-center border-2 transition-all active:scale-95 hover:scale-110 flex-shrink-0 ${
                      commitment.status === 'check' 
                        ? 'bg-[#7FC06C] border-[#7FC06C] text-white' 
                        : commitment.status === 'x'
                        ? 'bg-[#D94A4A] border-[#D94A4A] text-white'
                        : 'border-gray-300 hover:border-[#D68847]'
                    }`}
                    title="Click para alternar"
                  >
                    {commitment.status === 'check' && '✓'}
                    {commitment.status === 'x' && '✗'}
                  </button>
                </div>
              ))}
              
              <button
                onClick={addCommitment}
                className="hide-in-pdf w-full py-2 border-2 border-dashed border-[#D68847] rounded-lg text-[#D68847] text-sm sm:text-base hover:bg-[#E7A76B]/10 transition-colors"
              >
                + Adicionar Compromisso
              </button>
            </div>
          </section>

          {/* Tarefas da Semana */}
          <section className="bg-white rounded-xl border-4 border-[#C7B192] p-4 sm:p-6 shadow-sm">
            <div className="bg-[#D6C29A] -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#4A3F36]">3. Tarefas da Semana</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {weeklyTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    placeholder="Ex: Sol na varanda"
                    value={task.name}
                    onChange={(e) => {
                      const newTasks = [...weeklyTasks];
                      newTasks[index].name = e.target.value;
                      setWeeklyTasks(newTasks);
                    }}
                    className="flex-1 px-3 sm:px-4 py-2 border-2 border-[#C7B192] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6C29A] text-sm sm:text-base"
                  />
                  <button
                    onClick={() => {
                      const newTasks = [...weeklyTasks];
                      const currentColor = newTasks[index].color;
                      // Ciclo: null → green → yellow → red → orange → null
                      if (currentColor === null) {
                        newTasks[index].color = 'green';
                      } else if (currentColor === 'green') {
                        newTasks[index].color = 'yellow';
                      } else if (currentColor === 'yellow') {
                        newTasks[index].color = 'red';
                      } else if (currentColor === 'red') {
                        newTasks[index].color = 'orange';
                      } else {
                        newTasks[index].color = null;
                      }
                      setWeeklyTasks(newTasks);
                    }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-300 cursor-pointer hover:border-[#C7B192] transition-all active:scale-95 hover:scale-110 flex-shrink-0"
                    style={{ 
                      backgroundColor: task.color ? statusColors[task.color].bg : 'white'
                    }}
                    title="Click para alternar cores"
                  />
                </div>
              ))}
              
              <button
                onClick={addWeeklyTask}
                className="hide-in-pdf w-full py-2 border-2 border-dashed border-[#C7B192] rounded-lg text-[#C7B192] text-sm sm:text-base hover:bg-[#D6C29A]/10 transition-colors"
              >
                + Adicionar Tarefa
              </button>
            </div>
          </section>

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

          {/* Action Buttons */}
          <div className="hide-in-pdf flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8">
            <button
              onClick={clearPlanning}
              className="px-6 sm:px-8 py-3 bg-red-100 text-red-700 rounded-full font-semibold hover:bg-red-200 transition-colors text-center text-sm sm:text-base"
            >
              Limpar
            </button>
            <button
              onClick={savePlanning}
              className="px-6 sm:px-8 py-3 bg-[#B6926C] text-white rounded-full font-semibold hover:bg-[#3C342B] transition-colors shadow-lg text-sm sm:text-base"
            >
              Salvar Planejamento
            </button>
          </div>

          {/* Download PDF Button */}
          <div className="hide-in-pdf flex justify-center pt-4">
            <button
              onClick={downloadPDF}
              className="px-6 sm:px-8 py-3 bg-[#3C342B] text-white rounded-full font-semibold hover:bg-[#B6926C] transition-colors shadow-lg text-sm sm:text-base flex items-center gap-2"
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
              Baixar Planejamento
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
