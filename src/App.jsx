import { useEffect, useState } from "react"
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail"
import { TVShowAPI } from "./api/tv-show"
import { Logo } from "./components/Logo/Logo"
import { BACKDROP_BASE_URL } from "./config"
import s from "./style.module.css"
import logoImg from "./assets/images/logo.png"
import { TvShowList } from "./components/TvShowList/TvShowList"
import { SearchBar } from "./components/SearchBar/SearchBar"

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState()
  const [recommendationList, setRecommendationList] = useState([])

  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopular()
      if (popularTVShowList.length) setCurrentTVShow(popularTVShowList[0])
    } catch (error) {
      alert("Something went wrong  when fetching popular tv shows")
    }
  }
  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      )
      if (recommendationListResp.length)
        setRecommendationList(recommendationListResp.slice(0, 10))
    } catch (error) {
      alert("Something went wrong  when fetching recommendations")
    }
  }

  async function fetchByTitle(title) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(title)
      if (searchResponse.length) setCurrentTVShow(searchResponse[0])
    } catch (error) {
      alert("Something went wrong  when fetching popular tv show")
    }
  }

  function updateCurrentTvShow(tvShow) {
    setCurrentTVShow(tvShow)
  }

  useEffect(() => {
    fetchPopulars()
  }, [])

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id)
    }
  }, [currentTVShow])

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              img={logoImg}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommentend_tv_shows}>
        {currentTVShow && (
          <TvShowList
            tvShowList={recommendationList}
            onClickItem={updateCurrentTvShow}
          />
        )}
      </div>
    </div>
  )
}
