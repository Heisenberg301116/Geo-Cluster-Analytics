import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";

const TableComponent = () => {
  const { clusters, setClusters, skip, setSkip, field, setField, sorted, setSorted } = useContext(DataContext);


  // Function to handle sorting
  const handleSort = (key) => {
    if (key === field) {
      if (sorted === "asc") {
        setSorted("desc")
      }
      else {
        setSorted("asc")
      }
    }
    else {
      setField(key)
      setSorted("asc")
    }
  };



  return (
    <div className="table-container mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Metrics Table
      </h2>
      <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md bg-white">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {field === "name" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600"
              onClick={() => handleSort("users")}
            >
              Users{" "}
              {field === "users" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600"
              onClick={() => handleSort("projects")}
            >
              Projects{" "}
              {field === "projects" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600"
              onClick={() => handleSort("leads")}
            >
              Leads{" "}
              {field === "leads" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {clusters.length > 0 ? (
            clusters.map((cluster, index) => (
              <tr
                key={cluster.name}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
              >
                <td className="px-6 py-4">{cluster.name}</td>
                <td className="px-6 py-4">{cluster.users}</td>
                <td className="px-6 py-4">{cluster.projects}</td>
                <td className="px-6 py-4">{cluster.leads}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-gray-500 font-medium"
              >
                No clusters available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
