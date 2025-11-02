function Times(props) {
  return (
    <div className="bg-[transparent] border-amber-50 border-1 w-50 p-1 py-4 rounded-[9px] m-1">
      <div className="flex items-center justify-between">
        <p className="capitalize text-white font-semibold ml-1">{props.name}</p>
      </div>
    </div>
  );
}

export default Times;
