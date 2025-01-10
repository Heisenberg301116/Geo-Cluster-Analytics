import axios from "axios";

export async function deleteCluster(id) {
  try {
    // Send the DELETE request to the backend API to delete the cluster
    console.log("===================> id = ", id)
    const response = await axios.delete(`http://localhost:8000/cluster/delete/${id}`);

    // const response = await axios.delete(`https://geo-cluster-analytics-production.up.railway.app/cluster/delete/${id}`);

    // If the deletion is successful, handle the response here
    console.log("Cluster deleted successfully:", response.data.message);

    // Optionally, return the success message
    return response.data;
  } catch (error) {
    // Handle errors from the API
    if (error.response) {
      // The request was made and the server responded with a status other than 200
      console.error("Error:", error.response.data.detail);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error: No response received from server");
    } else {
      // Something else happened in setting up the request
      console.error("Error:", error.message);
    }
    throw error;
  }
}