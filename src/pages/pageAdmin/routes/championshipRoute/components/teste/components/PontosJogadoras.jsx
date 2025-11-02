import React from 'react'

function PontosJogadoras(props) {
  return (
    <div className="w-full text-center text-white font-handwriting">
  <div className="grid grid-cols-3 items-center justify-between py-2">
    <h1 className="capitalize font-semibold text-lg">{props.name}</h1>
    <h1 className="font-semibold text-lg">Pontos: {props.pontos}</h1>
    <h1 className="font-semibold text-lg">Tempo: {props.tempo}</h1>
  </div>
  <hr className="border-t border-white w-full mt-1" />
</div>

  )
}

export default PontosJogadoras