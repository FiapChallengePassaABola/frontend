

function Times(props) {
  return (
    <div className="bg-[#288F73] w-50 p-1 py-3 rounded-[9px] m-1">
        <div className="flex items-center justify-between">
            <p className="capitalize text-white font-semibold ml-1">{props.name}</p>
            <p className="bg-white text-black px-1.5 rounded-sm mr-1">{props.points}</p>
        </div>
    </div>
  )
}

export default Times