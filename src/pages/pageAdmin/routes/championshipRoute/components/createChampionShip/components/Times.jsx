function Times(props) {
  return (
    <div
      className={`${
        props.name ? `bg-[#235545]` : "bg-transparent"
      } border border-amber-50 w-50 p-3 py-4 rounded-[9px] m-1
      transition duration-300 ease-in-out
      `}
    >
      <div className="flex items-center justify-between">
        <p className="capitalize text-white font-semibold ml-1">
          {props.name || ""}
        </p>
      </div>
    </div>
  );
}

export default Times;
