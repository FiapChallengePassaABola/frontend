import React from "react";

export default function InputCustom({ text, className = "", ...props }) {
  const base = `
    relative z-10 overflow-hidden border-2 rounded-2xl font-semibold w-fit
    cursor-text transition border-white
    duration-300 ease-in-out group text-white
    text-[1vmax]
  `;
  const estilo = `${base} ${className}`;

  return (
    <div className={estilo.trim()}>
      {/* Efeito roxo no hover */}
      <span
        className={`
          absolute inset-0 transform scale-x-0 scale-y-0
          w-full h-full rounded-full
          origin-center transition-all duration-700 ease-in-out
          bg-[#8B5DE4] group-hover:scale-x-200 group-hover:scale-y-200
        `}
      ></span>

      {/* Campo de input */}
      <input
        {...props}
        className={`
          relative z-20 bg-transparent outline-none text-white 
          placeholder-gray-300 pl-3 pr-3 py-2 rounded-2xl
          transition group-hover:text-white
          w-full text-center
        `}
        placeholder={text}
      />
    </div>
  );
}
