import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "211caba8f505c4c2098b87270ac30332";
const requests = {
  fetchtmdb: `https://api.themoviedb.org/3`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

const useHttp = () => {
  const [error, setError] = useState(null);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [trendMovies, setTrendMovies] = useState([]);
  const [topRateMovies, setTopRateMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentMovies, setDocumentMovies] = useState([]);

  // lấy dữ liệu cho browse (all)
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const [
          originalResults,
          trendResults,
          topRateResults,
          actionResults,
          comedyResults,
          horrorResults,
          romanceResults,
          documentResults,
        ] = await Promise.all([
          axios.get(`${requests.fetchtmdb}${requests.fetchNetflixOriginals}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchTrending}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchTopRated}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchActionMovies}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchComedyMovies}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchHorrorMovies}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchRomanceMovies}`),
          axios.get(`${requests.fetchtmdb}${requests.fetchDocumentaries}`),
        ]);

        //luu du lieu vao useState

        setOriginalMovies(originalResults.data.results);
        setTrendMovies(trendResults.data.results);
        setTopRateMovies(topRateResults.data.results);
        setActionMovies(actionResults.data.results);
        setComedyMovies(comedyResults.data.results);
        setHorrorMovies(horrorResults.data.results);
        setRomanceMovies(romanceResults.data.results);
        setDocumentMovies(documentResults.data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  //get data detail trailer youtube
  const [trailerMovies, setTrailerMovies] = useState([]);

  const fetchDataTrailer = async (id) => {
    setError(null);
    try {
      const response = await axios.get(
        `${requests.fetchtmdb}/movie/${id}/videos?api_key=${API_KEY}`
      );
      setTrailerMovies(response.data.results[0]);
    } catch (error) {
      setError(error);
    }
  };

  // get data search movies
  const [searchMovies, setSearchMovies] = useState([]);
  const searchResults = useCallback(async (term) => {
    try {
      const search = await axios.get(`${requests.fetchtmdb}/search/movie`, {
        params: {
          query: term,
          api_key: API_KEY,
          language: "en-US",
        },
      });
      setSearchMovies(search.data.results);
    } catch (error) {
      setError(error);
    }
  }, []);

  return {
    //browse.jsx
    originalMovies,
    trendMovies,
    topRateMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentMovies,
    trailerMovies,
    fetchDataTrailer,
    //search.jsx
    error,
    searchMovies,
    searchResults,
  };
};

export default useHttp;
