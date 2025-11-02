import React from 'react'

function CardJogadoras(props) {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md mb-7">
      <div className="grid grid-cols-3 items-center gap-2 ">
        <h1 className="capitalize font-semibold text-lg">{props.name}</h1>
        <h1 className="col-span-2 text-right font-medium">Pontos: {props.pontos}</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <h1>Idade: {props.idade}</h1>
        <h1 className="text-right">Tempo: {props.tempo}</h1>
      </div>
    </div>

  )
}

export default CardJogadoras