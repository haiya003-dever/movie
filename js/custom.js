let apikey = "a2257adc574262eea31f2be9bec0d74e";
let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");
let movieBoard = document.querySelector("#movieBoard");
let mainPoster = document.querySelector("#mainPoster");
let movieName = document.querySelector(".movieName");
let movieList;

//영화버튼클릭
async function movie(lists) {
  // console.log(lists);

  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${lists}?api_key=${apikey}&language=ko-KR`,
  );
  let data = await response.json();
  console.log(data.results);

  // console.log(SearchBtn);
  // console.log(SearchInput);
  movieList = data.results;
  render(movieList);
}
//검색버튼 클릭

searchBtn.addEventListener("click", async () => {
  // console.log("click");
  let keyword = searchInput.value;
  console.log(keyword);

  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${apikey}&language=ko-KR`,
  );

  let data = await response.json();
  // console.log(data);
  console.log(data.results);

  movieList = data.results;
  render(movieList);
});

//입력값 초기화
searchInput.addEventListener("focus", () => {
  // console.log("포커스 실행!");
  searchInput.value = "";
});
//화면에 나타내는 함수
function render(movieList) {
  console.log(movieList);
  //초기화
  movieBoard.innerHTML = "";

  let firstMovie = movieList.find((movie) => movie.backdrop_path);

  if (firstMovie) {
    mainPoster.src = `https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`;
    movieName.textContent = firstMovie.title;
  }

  movieList.forEach((movie) => {
    // console.log(movie.title);//제목

    let card = `<div class="card">
            <div class="imgBox">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
                <p class="overview">
                   ${over(movie.overview || "")}
                </p>
                <div class="txt">
                <p class="date">${movie.release_date || ""}</p>
                <p class="avg"><span><i class="fa-solid fa-star"></i>평점</span>  ${Math.round(
                  movie.vote_average,
                )}</p></div>

            </div>
            <h2> ${movie.title}</h2>
        </div>`;

    movieBoard.innerHTML += card;
  });
}
//말줄임표
function over(text) {
  return text.length > 100 ? text.slice(0, 100) + "···" : text;
}
movie("now_playing");

$(function () {
  $(document).on("mouseenter", ".card", function () {
    $(this).find(".overview").addClass("on");
  });

  $(document).on("mouseleave", ".card", function () {
    $(this).find(".overview").removeClass("on");
  });
});
