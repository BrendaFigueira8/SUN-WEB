export const WeeklyTasks = () => {
  return (
    <div className="bg-card rounded-xl border-4 border-[hsl(var(--warm-tan-dark))] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-[hsl(var(--warm-tan))] -mx-6 -mt-6 px-6 py-4 rounded-t-lg mb-6">
        <h2 className="text-xl font-bold text-foreground">3. Tarefas da Semana</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Aqui quero que você preencha com algo que está procrastinando ou quer se fazer para si mesmo.
      </p>

      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Como usar: marque o círculo de cada dia com uma determinada cor, dependendo se completou ou não.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--status-done))] flex-shrink-0" />
            <p className="text-sm text-foreground">Tomar um pouco de sol na varanda</p>
          </div>
        </div>
      </div>
    </div>
  );
};
