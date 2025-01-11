import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

// Send the DELETE request to the backend API to delete the cluster
export async function deleteCluster(id) {
  try {
    const response = await axios.delete(`${serverUrl}/cluster/delete/${id}`);

    // console.log("Cluster deleted successfully:", response.data.message);

    return response.data;
  }

  catch (error) {
    if (error.response) {
      // console.error("Error:", error.response.data.detail);
    }
    else if (error.request) {
      // console.error("Error: No response received from server");
    }
    else {
      // console.error("Error:", error.message);
    }
    throw error;
  }
}