export const StatusLegend = () => {
  return (
    <div className="mt-12 bg-[#EDE5DA] rounded-2xl px-8 py-8 max-w-4xl mx-auto shadow-sm">
      <p className="text-center text-sm leading-relaxed mb-6 text-[#6B5E52]">
        Para não me sentir pressionada e ansiosa,
        <br />
        eu determinei cores para aliviar a pressão que fazia em mim mesma.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#b73434] flex-shrink-0" />
          <p className="text-[#3E322A]">
            <span className="font-semibold">Vermelho:</span> foi cancelado
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#7FC06C] flex-shrink-0" />
          <p className="text-[#3E322A]">
            <span className="font-semibold">Verde:</span> consegui fazer
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#E2C15A] flex-shrink-0" />
          <p className="text-[#3E322A]">
            <span className="font-semibold">Amarelo:</span> tempo livre
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#ef8e3e] flex-shrink-0" />
          <p className="text-[#3E322A]">
            <span className="font-semibold">Laranja:</span> foi adiado para próxima semana
          </p>
        </div>
      </div>
    </div>
  );
};
