import React, { useContext } from "react";
import useHttp from "../hooks/useHttp";
//*từng bộ phim một
import ContextMovies from "../hooks/ContextMovies";
import MovieDetail from "./MovieDetail";
const MovieItem = ({ movie, title }) => {
  const { setMovie, showTrailerHandler, settitleList } =
    useContext(ContextMovies);

  let imagePath = "";
  let heighImg = "";
  if (title === "Original") {
    imagePath = `https://image.tmdb.org/t/p/w200${movie?.poster_path}`;
    heighImg = " mb-2";
  } else {
    imagePath = `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}`;
    heighImg = "sizeImg mb-2";
  }

  return (
    <li className={heighImg}>
      <img
        src={imagePath}
        alt={movie?.original_title || ""}
        className="scaleImg "
        onClick={() => {
          showTrailerHandler(movie.id);
          setMovie(movie);
          settitleList(title);
          return;
        }}
      />
    </li>
  );
};

//tungw the loai phim
export const ListItem = (props) => {
  const { movie, showTrailer, titleList } = useContext(ContextMovies);

  return (
    <li className="m-5">
      <h3>{props.title}</h3>
      <ul className="list-unstyled d-flex gap-4 custom-scroll">
        {props.requests.map((movie) => (
          <MovieItem movie={movie} title={props.title} key={movie.id} />
        ))}
      </ul>
      {showTrailer && titleList === props.title && (
        <MovieDetail movie={movie} />
      )}
    </li>
  );
};

//tất cả các thể loại phim

const MovieList = () => {
  const {
    originalMovies,
    topRateMovies,
    trendMovies,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentMovies,
  } = useHttp();
  //tạo mảng chứa dữ liệu tất cả thể loại phim
  const movieCategories = [
    { title: "Original", requests: originalMovies },
    { title: "Xu hướng", requests: trendMovies },
    { title: "Xếp hạng cao", requests: topRateMovies },
    { title: "Hành động", requests: actionMovies },
    { title: "Hài kịch", requests: comedyMovies },
    { title: "Kinh dị", requests: horrorMovies },
    { title: "Lãng mạn", requests: romanceMovies },
    { title: "Tài liệu", requests: documentMovies },
  ];

  return (
    <ul className="list-unstyled">
      {movieCategories.map((category) => (
        <ListItem
          key={category.title}
          title={category.title}
          requests={category.requests}
        />
      ))}
    </ul>
  );
};

export default MovieList;
