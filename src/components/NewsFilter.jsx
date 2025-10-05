import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function NewsFilter({
  categories,
  activeFilter,
  onFilterChange,
  onSearchChange,
  onTimeFilterChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("todas");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleTimeFilterChange = (e) => {
    const value = e.target.value;
    setTimeFilter(value);
    onTimeFilterChange(value);
  };

  return (
    <div className="bg-[#a065a46c] rounded-lg shadow-md p-6 mb-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 bg-white py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B4509] focus:border-transparent"
          />
        </div>

        <select
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4509] focus:border-transparent min-w-[180px]"
        >
          <option value="todas">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={timeFilter}
          onChange={handleTimeFilterChange}
          className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4509] focus:border-transparent min-w-[140px]"
        >
          <option value="todas">Todo o tempo</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mês</option>
        </select>
      </div>
    </div>
  );
}

export default NewsFilter;
