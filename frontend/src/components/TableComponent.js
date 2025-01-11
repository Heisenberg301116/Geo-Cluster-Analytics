import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { deleteCluster } from "../controllers/delete_cluster";

const TableComponent = () => {
  const { clusters, setClusters, skip, setSkip, field, setField, sorted, setSorted, setalert, setIsLoading } = useContext(DataContext);

  // Function to handle sorting
  const handleSort = (key) => {
    let new_sorted_order = 'ascending'

    if (key === field) {
      if (sorted === "asc") {
        setSorted("desc");
        new_sorted_order = "descending"
      }
      else {
        setSorted("asc");
      }
    }
    else {
      setField(key);
      setSorted("asc");
    }

    setalert({ colour: '#3ad644', message: `Sorted by '${key}' in ${new_sorted_order} !`, fontcolor: 'black' })
  };

  // Function to handle cluster deletion
  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      const response = await deleteCluster(id);
      // Remove the deleted cluster from the UI by filtering out the deleted cluster
      setClusters(clusters.filter(cluster => cluster._id !== id));
      setalert({ colour: '#3ad644', message: 'Cluster deleted successfully !', fontcolor: 'black' })
      setIsLoading(false)
      // console.log(response.message); // Optional: show success message
    }
    catch (error) {
      setIsLoading(false)
      console.error("Failed to delete cluster:", error);
      setalert({ colour: '#f70a0e', message: `Failed to delete cluster: ${error}`, fontcolor: 'black' })
    }
  };

  return (
    <div className="table-container mt-6 overflow-x-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 underline">
        Metrics Table
      </h2>
      <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md bg-white">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600 text-xs sm:text-sm"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {field === "name" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600 text-xs sm:text-sm"
              onClick={() => handleSort("users")}
            >
              Users{" "}
              {field === "users" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600 text-xs sm:text-sm"
              onClick={() => handleSort("projects")}
            >
              Projects{" "}
              {field === "projects" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="px-6 py-3 text-left font-semibold cursor-pointer hover:bg-blue-600 text-xs sm:text-sm"
              onClick={() => handleSort("leads")}
            >
              Leads{" "}
              {field === "leads" ? (sorted === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="px-6 py-3 text-left font-semibold text-xs sm:text-sm">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {clusters.length > 0 ? (
            clusters.map((cluster, index) => (
              <tr
                key={cluster._id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
              >
                <td className="px-6 py-4 text-xs sm:text-sm">{cluster.name}</td>
                <td className="px-6 py-4 text-xs sm:text-sm">{cluster.users}</td>
                <td className="px-6 py-4 text-xs sm:text-sm">{cluster.projects}</td>
                <td className="px-6 py-4 text-xs sm:text-sm">{cluster.leads}</td>
                <td className="px-6 py-4 text-xs sm:text-sm">
                  <button
                    className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded text-xs sm:text-sm"
                    onClick={() => handleDelete(cluster._id)} // Pass the _id of the cluster to delete
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500 font-medium text-xs sm:text-sm">
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
