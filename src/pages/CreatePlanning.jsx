import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RandomCatBackground } from "../components/RandomCatBackground";
import { HabitTracker } from "../components/HabitTracker";
import { CommitmentsList } from "../components/CommitmentsList";
import { WeeklyTasks } from "../components/WeeklyTasks";

const logo = new URL("../assets/new-logo.webp", import.meta.url).href;
const tutorialVideo = new URL("../assets/tutorial.mp4", import.meta.url).href;

export const CreatePlanning = () => {
  const [habits, setHabits] = useState([{ name: "", days: Array(7).fill(null) }]);
  const [commitments, setCommitments] = useState([{ name: "", status: null }]); // null, 'check', 'x'
  const [weeklyTasks, setWeeklyTasks] = useState([{ name: "", color: null }]); // null, 'green', 'yellow', 'red', 'orange'
  const [hasSavedData, setHasSavedData] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedState, setLastSavedState] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const navigate = useNavigate();

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const statusColors = {
    green: { bg: '#7FC06C', label: 'Verde: consegui fazer' },
    yellow: { bg: '#E2C15A', label: 'Amarelo: tempo livre' },
    red: { bg: '#D94A4A', label: 'Vermelho: foi cancelado' },
    orange: { bg: '#D68847', label: 'Laranja: adiado' }
  };

  // Verificar se há dados salvos e se já viu o tutorial
  useEffect(() => {
    const saved = localStorage.getItem('weeklyPlanning');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setHabits(parsedData.habits || []);
        setCommitments(parsedData.commitments || []);
        setWeeklyTasks(parsedData.weeklyTasks || []);
        setLastSavedState(JSON.stringify(parsedData));
        setHasSavedData(true);
      } catch (error) {
        console.error('Erro ao recuperar dados do localStorage:', error);
      }
    }
    
    const tutorialSeen = localStorage.getItem('tutorialSeen');
    if (tutorialSeen === 'true') {
      setHasSeenTutorial(true);
    }
  }, []);

  // Detectar mudanças não salvas
  useEffect(() => {
    if (lastSavedState) {
      const currentState = JSON.stringify({ habits, commitments, weeklyTasks });
      setHasUnsavedChanges(currentState !== lastSavedState);
    }
  }, [habits, commitments, weeklyTasks, lastSavedState]);

  const addHabit = () => {
    setHabits([...habits, { name: "", days: Array(7).fill(false) }]);
  };

  const addCommitment = () => {
    setCommitments([...commitments, { name: "", status: null }]);
  };

  const addWeeklyTask = () => {
    setWeeklyTasks([...weeklyTasks, { name: "", color: null }]);
  };

  const deleteCommitment = (index) => {
    if (!window.confirm('Deseja apagar este compromisso?')) return;
    const newCommitments = commitments.filter((_, i) => i !== index);
    setCommitments(newCommitments);
  };

  const deleteHabit = (index) => {
    if (!window.confirm('Deseja apagar este hábito?')) return;
    const newHabits = habits.filter((_, i) => i !== index);
    setHabits(newHabits);
  };

  const deleteWeeklyTask = (index) => {
    if (!window.confirm('Deseja apagar esta tarefa?')) return;
    const newTasks = weeklyTasks.filter((_, i) => i !== index);
    setWeeklyTasks(newTasks);
  };

  const savePlanning = () => {
    const planningData = {
      habits,
      commitments,
      weeklyTasks,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('weeklyPlanning', JSON.stringify(planningData));
    setHasSavedData(true);
    setHasUnsavedChanges(false);
    setLastSavedState(JSON.stringify({ habits, commitments, weeklyTasks }));
    alert('Planejamento salvo com sucesso!');
    // Redirecionar para a página de visualização
    navigate('/visualizar-planejamento');
  };

  const clearPlanning = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o planejamento? Esta ação não pode ser desfeita.')) {
      // Limpar localStorage
      localStorage.removeItem('weeklyPlanning');
      
      // Resetar estados para valores iniciais
      setHabits([{ name: "", days: Array(7).fill(null) }]);
      setCommitments([{ name: "", status: null }]);
      setWeeklyTasks([{ name: "", color: null }]);
      setHasSavedData(false);
      setHasUnsavedChanges(false);
      setLastSavedState(null);
      
      alert('Planejamento limpo com sucesso!');
    }
  };

  // Determinar se o botão de visualizar deve estar habilitado
  const canViewPlanning = hasSavedData && !hasUnsavedChanges;

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
      <RandomCatBackground />
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
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>

            <nav className="flex items-center gap-6">
              <Link 
                to="/criar-planejamento" 
                className="text-[#3C342B] hover:text-[#B6926C] transition-colors font-medium"
              >
                Criar Planejamento
              </Link>
              <Link 
                to="/visualizar-planejamento" 
                className="text-[#3C342B] hover:text-[#B6926C] transition-colors font-medium"
              >
                Visualizar Planejamento
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8E705B] mb-3 sm:mb-4">
            Criar Meu Planejamento
          </h1>
          <p className="text-sm sm:text-base text-[#7C6E65] max-w-2xl mx-auto px-2">
            Organize sua semana de forma personalizada. Adicione seus hábitos, compromissos e tarefas.
          </p>
        </div>

        {/* Seção Tutorial */}
        <section className="bg-gradient-to-b from-[#FBF5DF] to-white rounded-2xl border-4 border-[#B6926C] p-8 sm:p-10 mb-12 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#8E705B] mb-3">
              Como Funciona?
            </h2>
            <p className="text-[#7C6E65] max-w-xl mx-auto">
              Aqui está um exemplo de como você pode organizar seus hábitos, compromissos e tarefas semanais:
            </p>
          </div>
          
          {/* Componentes Tutorial */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HabitTracker />
            <CommitmentsList />
            <WeeklyTasks />
          </div>
        </section>

        <div className="space-y-8">
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
                  <div key={habitIndex} className="grid grid-cols-[40px_1fr_repeat(7,60px)] gap-2 items-center">
                    <button
                      onClick={() => deleteHabit(habitIndex)}
                      title="Apagar hábito"
                      aria-label="Apagar hábito"
                      className="w-8 h-8 rounded-sm flex items-center justify-center border-2 text-red-600 hover:bg-red-50 transition-all flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Ex: Tomar vitamina B12"
                      value={habit.name}
                      onChange={(e) => {
                        const newHabits = [...habits];
                        newHabits[habitIndex].name = e.target.value;
                        setHabits(newHabits);
                      }}
                      className="font-medium px-3 py-3 border-2 border-[#8AA87B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DBF93] text-sm"
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
              className="w-full py-2 border-2 border-dashed border-[#8AA87B] rounded-lg text-[#8AA87B] text-sm sm:text-base hover:bg-[#9DBF93]/10 transition-colors mt-3 sm:mt-4"
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
                  <button
                    onClick={() => deleteCommitment(index)}
                    title="Apagar"
                    aria-label="Apagar compromisso"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm flex items-center justify-center border-2 text-red-600 hover:bg-red-50 transition-all flex-shrink-0 mr-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>

                  <input
                    type="text"
                    placeholder="Ex: Vôlei - terça"
                    value={commitment.name}
                    onChange={(e) => {
                      const newCommitments = [...commitments];
                      newCommitments[index].name = e.target.value;
                      setCommitments(newCommitments);
                    }}
                    className="font-medium flex-1 px-3 sm:px-4 py-2 border-2 border-[#D68847] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E7A76B] text-sm sm:text-base"
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
                className="w-full py-2 border-2 border-dashed border-[#D68847] rounded-lg text-[#D68847] text-sm sm:text-base hover:bg-[#E7A76B]/10 transition-colors"
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
                  <button
                    onClick={() => deleteWeeklyTask(index)}
                    title="Apagar tarefa da semana"
                    aria-label="Apagar tarefa da semana"
                    className="w-8 h-8 rounded-sm flex items-center justify-center border-2 text-red-600 hover:bg-red-50 transition-all flex-shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Ex: Assistir ao pôr do sol na varanda"
                    value={task.name}
                    onChange={(e) => {
                      const newTasks = [...weeklyTasks];
                      newTasks[index].name = e.target.value;
                      setWeeklyTasks(newTasks);
                    }}
                    className="font-medium flex-1 px-3 sm:px-4 py-2 border-2 border-[#C7B192] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D6C29A] text-sm sm:text-base"
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
                className="w-full py-2 border-2 border-dashed border-[#C7B192] rounded-lg text-[#C7B192] text-sm sm:text-base hover:bg-[#D6C29A]/10 transition-colors"
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8">
            <button
              onClick={clearPlanning}
              className="px-6 sm:px-8 py-3 bg-red-100 text-red-700 rounded-full font-semibold hover:bg-red-200 transition-colors text-center text-sm sm:text-base"
            >
              Limpar
            </button>
            
            {hasUnsavedChanges || !hasSavedData ? (
              <button
                onClick={savePlanning}
                className="px-6 sm:px-8 py-3 bg-[#B6926C] text-white rounded-full font-semibold hover:bg-[#3C342B] transition-colors shadow-lg text-sm sm:text-base"
              >
                Salvar Planejamento
              </button>
            ) : (
              <div className="relative group">
                <button
                  disabled
                  className="px-6 sm:px-8 py-3 bg-gray-300 text-gray-500 rounded-full font-semibold cursor-not-allowed text-center text-sm sm:text-base"
                >
                  Salvar Planejamento
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Não há alterações para salvar
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>

          {/* Download Button */}
          <div className="flex justify-center pt-4">
            {canViewPlanning ? (
              <Link
                to="/visualizar-planejamento"
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
                Visualizar e Baixar PDF
              </Link>
            ) : (
              <div className="relative group">
                <button
                  disabled
                  className="px-6 sm:px-8 py-3 bg-gray-300 text-gray-500 rounded-full font-semibold cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
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
                  Visualizar e Baixar PDF
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {!hasSavedData 
                    ? 'Salve o planejamento primeiro para visualizar e baixar' 
                    : 'Salve as alterações antes de visualizar'}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Botão Flutuante com Animação */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Círculo Pulsante de Fundo - Apenas se não viu o tutorial */}
        {!hasSeenTutorial && (
          <div className="absolute inset-0 animate-ping bg-[#B6926C] rounded-full opacity-75"></div>
        )}
        
        {/* Botão Principal */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            if (!hasSeenTutorial) {
              localStorage.setItem('tutorialSeen', 'true');
              setHasSeenTutorial(true);
            }
          }}
          className={`relative w-14 h-14 bg-[#B6926C] hover:bg-[#8E705B] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center ${
            !hasSeenTutorial ? 'hover:scale-110' : ''
          }`}
          title="Assistir Tutorial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      {/* Modal Tutorial */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between bg-[#B6926C] text-white p-6 rounded-t-xl">
              <h2 className="text-2xl font-bold">Tutorial - Como Usar</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="p-6">
              <video
                className="w-full rounded-lg"
                controls
                src={tutorialVideo}
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
