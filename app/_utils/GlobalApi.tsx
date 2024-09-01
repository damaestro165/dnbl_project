import axios from "axios";

// Create an axios instance with the base URL for your API
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api", // Replace with your actual base URL
});

// Define a function to create a product
const createProduct = async (data: FormData) => {
  try {
    const response = await axiosClient.post('/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Required for uploading files
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
};

// Export the createProduct function for use in other parts of your application
export default {
  createProduct,
};