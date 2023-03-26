import s from "./style.module.css"
import { SMALL_IMG_COVER_BASE_URL } from "../../config"
export function TvShowListItem({ tvShow, onClick }) {
  const MAX_TITLE_CHAR = 20

  const onClick_ = () => {
    onClick(tvShow)
  }
  return (
    <div onClick={onClick_} className={s.container}>
      <img
        src={SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path}
        alt="{tvShow.name}"
        className={s.img}
      />
      <div className={s.title}>
        {tvShow.name.length > MAX_TITLE_CHAR
          ? tvShow.name.slice(0, MAX_TITLE_CHAR) + "..."
          : tvShow.name}
      </div>
    </div>
  )
}
