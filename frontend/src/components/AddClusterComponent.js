import { DataContext } from "../context/DataProvider";
import React, { useState, useContext } from "react";
import axios from "axios";

const AddClusterComponent = () => {
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [users, setUsers] = useState("");
    const [projects, setProjects] = useState("");
    const [leads, setLeads] = useState("");
    const [message, setMessage] = useState("");

    const { setClusters } = useContext(DataContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newCluster = {
            name,
            location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
            users: parseInt(users),
            projects: parseInt(projects),
            leads: parseInt(leads),
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/cluster/api/cluster",
                newCluster
            );

            if (response.data.status_code === 400) {
                console.log("================>response.data.status_code = ", response.data.status_code)
                throw new Error(response.data.detail);
            }

            setClusters((prevClusters) => [...prevClusters, response.data.cluster]);
            setMessage("Cluster added successfully!");

            setName("");
            setLatitude("");
            setLongitude("");
            setUsers("");
            setProjects("");
            setLeads("");
        }
        catch (error) {
            console.error("Error adding cluster", error);
            setMessage(`Error: ${error.response?.data?.detail || error.message}`);
        }
    };

    return (
        <div className="add-cluster-container max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Add a New Cluster
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Cluster Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="users" className="block text-sm font-medium text-gray-700">
                        Users
                    </label>
                    <input
                        type="number"
                        id="users"
                        value={users}
                        onChange={(e) => setUsers(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
                        Projects
                    </label>
                    <input
                        type="number"
                        id="projects"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="leads" className="block text-sm font-medium text-gray-700">
                        Leads
                    </label>
                    <input
                        type="number"
                        id="leads"
                        value={leads}
                        onChange={(e) => setLeads(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                        Latitude
                    </label>
                    <input
                        type="number"
                        id="latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                        Longitude
                    </label>
                    <input
                        type="number"
                        id="longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="form-group col-span-1 sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md text-sm"
                    >
                        Add Cluster
                    </button>
                </div>
            </form>
            {message && (
                <p
                    className={`mt-4 text-center text-sm font-medium ${message.includes("successfully") ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddClusterComponent;
