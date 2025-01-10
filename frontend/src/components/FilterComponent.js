import React, { useState } from "react";

const FilterComponent = ({ setFilters }) => {
  const [filters, updateFilters] = useState({ minUsers: 0, minProjects: 0 });

  const handleUserFilter = (event) => {
    const value = parseInt(event.target.value) || 0;
    updateFilters((prev) => ({ ...prev, minUsers: value }));
    setFilters((prev) => ({ ...prev, minUsers: value }));
  };

  const handleProjectsFilter = (event) => {
    const value = parseInt(event.target.value) || 0;
    updateFilters((prev) => ({ ...prev, minProjects: value }));
    setFilters((prev) => ({ ...prev, minProjects: value }));
  };

  const resetFilters = () => {
    const resetValues = { minUsers: 0, minProjects: 0 };
    updateFilters(resetValues);
    setFilters(resetValues);
  };

  const isFilterActive = filters.minUsers > 0 || filters.minProjects > 0;

  return (
    <div className="filter-container flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-1">Minimum Users:</span>
          <input
            type="number"
            value={filters.minUsers}
            onChange={handleUserFilter}
            className="border border-gray-300 rounded-md p-2 w-full md:w-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="0"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-1">Minimum Projects:</span>
          <input
            type="number"
            value={filters.minProjects}
            onChange={handleProjectsFilter}
            className="border border-gray-300 rounded-md p-2 w-full md:w-40 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="0"
          />
        </label>
      </div>

      <button
        onClick={resetFilters}
        className={`px-4 py-2 rounded-md font-semibold text-white ${isFilterActive
          ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
          : "bg-gray-400 cursor-not-allowed"
          }`}
        disabled={!isFilterActive}
      >
        Remove Filter
      </button>
    </div>
  );
};

export default FilterComponent;
