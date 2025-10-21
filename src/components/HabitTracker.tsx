export const HabitTracker = () => {
  const days = ["S", "T", "Q", "Q", "S", "S", "D"];

  return (
    <div className="bg-white rounded-xl border-4 border-[#8AA87B] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-[#9DBF93] -mx-6 -mt-6 px-6 py-4 rounded-t-lg mb-6">
        <h2 className="text-xl font-bold text-[#21321F]">1. Hábitos Diários</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Você pode colocar algo que é fixo na sua rotina, como um uso de um medicamento que não pode esquecer.
      </p>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Como usar: marque o círculo de cada dia com uma determinada cor, dependendo se completou ou não.
        </p>

        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          {/* Letters row */}
          <div />
          <div className="flex items-center gap-2">
            {days.map((day, index) => (
              <div key={`label-${index}`} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground font-medium">{day}</span>
              </div>
            ))}
          </div>

          {/* Dots row: label + dots aligned */}
          <p className="font-medium text-sm whitespace-nowrap">Vitamina B12</p>
          <div className="flex items-center gap-2">
            {days.map((_, index) => {
              let dotClass = "border-2 border-gray-300";
              // days array starts with Sunday (index 0)
              // fill green on Monday (index 1) and Tuesday (index 2)
              // fill yellow on Wednesday (index 3)
              if (index === 1 || index === 2) dotClass = "bg-[#7FC06C]";
              if (index === 3) dotClass = "bg-[#E2C15A]";

              return (
                <div key={`dot-${index}`} className="flex flex-col items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${dotClass}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
