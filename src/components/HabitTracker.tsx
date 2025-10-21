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

        <div className="flex items-center gap-4">
            <p className="font-medium text-sm whitespace-nowrap">Vitamina B12</p>
          <div className="flex items-center gap-2">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1.5">
                <span className="text-xs text-muted-foreground font-medium">{day}</span>
                {/* <Checkbox className="rounded-full data-[state=checked]:bg-[hsl(var(--sage-green-dark))] data-[state=checked]:border-[hsl(var(--sage-green-dark))]" /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
