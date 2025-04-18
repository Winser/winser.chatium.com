import { jsx } from "@app/html-jsx"

export const TabBar = () => {
  return (
    <div class="tab-bar">
      <a class="tab-bar-item" href="/upload">
        <img src="/assets/icons/folder_plus.svg" />
        <span>Загрузка</span>
      </a>
      <a class="tab-bar-item" href="/">
        <img src="/assets/icons/img.svg" />
        <span>Главная</span>
      </a>
      <a class="tab-bar-item" href="/top">
        <img src="/assets/icons/star.svg" />
        <span>Рейтинг</span>
      </a>
    </div>
  )
}