function Botao({ children, onClick, className = "" }) {
  const base = `
    relative z-10 overflow-hidden border-2 rounded-2xl font-semibold 
    w-fit cursor-pointer transition border-white duration-300 ease-in-out 
    group text-white pl-3 pr-3 hover:border-[#8B5DE4] text-[1vmax]
    flex items-center justify-center
  `;
  const estilo = `${base} ${className}`;

  return (
    <button className={estilo.trim()} onClick={onClick}>
      <span
        className={`
          absolute inset-0 transform scale-x-0 scale-y-0
          w-full rounded-full origin-center
          transition-all duration-600 ease-in-out
          bg-[#8B5DE4] group-hover:scale-x-200 group-hover:scale-y-200
        `}
      ></span>

      <span
        className={`relative z-20 transition text-gray-300 group-hover:text-white text-center`}
      >
        {children}
      </span>
    </button>
  );
}

export default Botao;
