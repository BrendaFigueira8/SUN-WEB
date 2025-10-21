import { Check } from "lucide-react";

export const CommitmentsList = () => {
  return (
    <div className="bg-white rounded-xl border-4 border-[#D68847] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-[#E7A76B] -mx-6 -mt-6 px-6 py-4 rounded-t-lg mb-6">
        <h2 className="text-xl font-bold text-[#3F2E20]">2. Compromissos</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        No campo de compromissos, será para que você lembre-se e se organize com antecedência.
      </p>

      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Como usar: pode usar o ✓ ou um ✗
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#7FC06C] flex items-center justify-center flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm text-foreground">Vôlei - terça-feira</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-sm border-2 border-muted-foreground flex-shrink-0" />
            <p className="text-sm text-foreground">Terapia - quarta-feira</p>
          </div>
        </div>
      </div>
    </div>
  );
};
