// import axios from "axios";
// import debounce from "lodash.debounce";

// const fetchResults =debounce(async(searchTerm)=>{
//     const API_URL = import.meta.env.VITE_API_URL;
//      const API_SEARCH_EXPENSE_URL=`${API_URL}/expenseTracker/search/`;

//     try {
//         return await axios.get(`${API_SEARCH_EXPENSE_URL}`+`${searchTerm}`,{
//             withCredentials: true,
//         })
        
//     } catch (error) {
//         return await Promise.reject(error);
//       }
// })

// export default fetchResults;
import axios from "axios";
import debounce from "lodash.debounce";

const API_URL = import.meta.env.VITE_API_URL;
const API_SEARCH_EXPENSE_URL = `${API_URL}/search`;

const fetchResults = async (searchTerm) => {
  if (!searchTerm.trim()) return []; // Prevent API calls on empty input

  try {
    const response = await axios.get(API_SEARCH_EXPENSE_URL, {
      params: { q: searchTerm }, // Use params instead of concatenation
      withCredentials: true,
    });

    return response.data; // Return only the data
  } catch (error) {
    console.error("Error fetching search results:", error);
    return []; // Return an empty array on error
  }
};

// Debounce function to limit API calls
export const debouncedFetchResults = debounce(fetchResults, 500);

export default fetchResults;
