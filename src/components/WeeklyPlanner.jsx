import React, { useState } from 'react';

// Dados iniciais para exemplo
const initialHabits = [
  { name: 'Devocional', days: ['gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray'] },
  { name: 'Trabalho', days: ['green', 'green', 'yellow', 'red', 'green', 'gray', 'gray'] },
  { name: 'Faculdade', days: ['green', 'green', 'green', 'green', 'green', 'gray', 'gray'] },
];

const initialCommitments = [
  { text: 'Terapia - Quarta às 11:00', completed: true },
  { text: 'Viagem - Domingo às 18:00', completed: false },
];

const initialTasks = [
  { text: 'Pagar o psicólogo', completed: false },
  { text: 'Assistir a aula da faculdade', completed: true },
];


export const WeeklyPlanner = () => {
  // --- Estados para gerenciar os dados ---
  const [habits, setHabits] = useState(initialHabits);
  const [commitments, setCommitments] = useState(initialCommitments);
  const [tasks, setTasks] = useState(initialTasks);

  // --- Estados para os campos de input ---
  const [newHabit, setNewHabit] = useState('');
  const [newCommitment, setNewCommitment] = useState('');
  const [newTask, setNewTask] = useState('');

  // --- Funções para manipular os hábitos ---
  const handleHabitDayClick = (habitIndex, dayIndex) => {
    const newHabits = [...habits];
    const currentStatus = newHabits[habitIndex].days[dayIndex];
    const statusCycle = ['gray', 'green', 'yellow', 'red'];
    const nextStatusIndex = (statusCycle.indexOf(currentStatus) + 1) % statusCycle.length;
    newHabits[habitIndex].days[dayIndex] = statusCycle[nextStatusIndex];
    setHabits(newHabits);
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (newHabit.trim()) {
      setHabits([...habits, { name: newHabit, days: Array(7).fill('gray') }]);
      setNewHabit('');
    }
  };

  // --- Funções para manipular compromissos e tarefas ---
  const toggleItemCompletion = (list, setList, index) => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    setList(newList);
  };

  const addItem = (e, list, setList, newItem, setNewItem) => {
    e.preventDefault();
    if (newItem.trim()) {
      setList([...list, { text: newItem, completed: false }]);
      setNewItem('');
    }
  };

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // --- Estilos embutidos para simplicidade ---
  const styles = {
    plannerContainer: {
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      maxWidth: '700px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
      borderBottom: '2px solid #f0f0f0',
      paddingBottom: '15px',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '1.4em',
      color: '#555',
      borderBottom: '1px solid #eee',
      paddingBottom: '8px',
      marginBottom: '20px',
    },
    habitTracker: {},
    habitRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      padding: '5px 0',
    },
    habitName: {
      flex: 1,
      fontSize: '1em',
      color: '#444',
    },
    daysContainer: {
      display: 'flex',
      gap: '10px',
    },
    dayCircle: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    dayHeader: {
      display: 'flex',
      marginLeft: 'auto',
      gap: '10px',
      width: '266px', /* (28px + 10px) * 7 - 10px */
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#888',
      marginBottom: '10px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      fontSize: '1em',
    },
    checkbox: {
      marginRight: '12px',
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    },
    itemText: (completed) => ({
      color: completed ? '#aaa' : '#444',
      textDecoration: completed ? 'line-through' : 'none',
    }),
    form: {
      display: 'flex',
      marginTop: '20px',
    },
    input: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '6px 0 0 6px',
      fontSize: '1em',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      backgroundColor: '#5A9CFF',
      color: 'white',
      borderRadius: '0 6px 6px 0',
      cursor: 'pointer',
      fontSize: '1em',
      fontWeight: 'bold',
    },
    colors: {
      green: '#4CAF50',
      yellow: '#FFC107',
      red: '#F44336',
      gray: '#E0E0E0',
    }
  };

  return (
    <div style={styles.plannerContainer}>
      <header style={styles.header}>
        <h1>Planejador Semanal</h1>
      </header>

      {/* --- Seção de Hábitos --- */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Rastreador de Hábitos</h2>
        <div style={styles.habitTracker}>
          <div style={{ display: 'flex' }}>
            <div style={styles.habitName}></div> {/* Espaço em branco */}
            <div style={styles.dayHeader}>
              {weekDays.map((day, i) => <span key={i} style={{width: '28px', textAlign: 'center'}}>{day}</span>)}
            </div>
          </div>
          {habits.map((habit, habitIndex) => (
            <div key={habitIndex} style={styles.habitRow}>
              <span style={styles.habitName}>{habit.name}</span>
              <div style={styles.daysContainer}>
                {habit.days.map((status, dayIndex) => (
                  <div
                    key={dayIndex}
                    style={{ ...styles.dayCircle, backgroundColor: styles.colors[status] }}
                    onClick={() => handleHabitDayClick(habitIndex, dayIndex)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={addHabit} style={styles.form}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Adicionar novo hábito..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>+</button>
        </form>
      </section>

      {/* --- Seção de Compromissos --- */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Compromissos</h2>
        {commitments.map((item, index) => (
          <div key={index} style={styles.listItem}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItemCompletion(commitments, setCommitments, index)}
              style={styles.checkbox}
            />
            <span style={styles.itemText(item.completed)}>{item.text}</span>
          </div>
        ))}
        <form onSubmit={(e) => addItem(e, commitments, setCommitments, newCommitment, setNewCommitment)} style={styles.form}>
          <input
            type="text"
            value={newCommitment}
            onChange={(e) => setNewCommitment(e.target.value)}
            placeholder="Adicionar novo compromisso..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>+</button>
        </form>
      </section>

      {/* --- Seção de Tarefas --- */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tarefas e Lembretes</h2>
        {tasks.map((item, index) => (
          <div key={index} style={styles.listItem}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItemCompletion(tasks, setTasks, index)}
              style={styles.checkbox}
            />
            <span style={styles.itemText(item.completed)}>{item.text}</span>
          </div>
        ))}
        <form onSubmit={(e) => addItem(e, tasks, setTasks, newTask, setNewTask)} style={styles.form}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar nova tarefa..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>+</button>
        </form>
      </section>
    </div>
  );
};

export default WeeklyPlanner;