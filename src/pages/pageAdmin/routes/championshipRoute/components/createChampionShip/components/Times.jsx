function Times({ name }) {
  const hasName = Boolean(name && name.trim());

  return (
    <div
      className={`${
        hasName ? "bg-[#235545]" : "bg-transparent"
      } border border-amber-50 w-[200px] p-3 py-4 rounded-[9px] m-1
      transition duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <p className="capitalize text-white font-semibold ml-1">
          {hasName ? name : "——"}
        </p>
      </div>
    </div>
  );
}

export default Times;
