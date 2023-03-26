import { TvShowListItem } from "../TvShowListItem/TvShowListItem"
import s from "./style.module.css"

export function TvShowList({ tvShowList, onClickItem }) {
  return (
    <div>
      <div className={s.title}>You'll probably like :</div>
      <div className={s.list}>
        {tvShowList.map((tvShow) => {
          return (
            <span key={tvShow.id} className={s.tvShowItem}>
              <TvShowListItem tvShow={tvShow} onClick={onClickItem} />
            </span>
          )
        })}
      </div>
    </div>
  )
}
