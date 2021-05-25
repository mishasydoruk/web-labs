import './HomeComponent.css'
import ContentMenu from '../ContentMenu/ContentMenu.js'
import Content from '../Content/Content.js';
function HomeComponent() {
  return (
      <div>
    <div className="cont">
        <h1>OnlyMusicFans</h1>
      <h2>A place where you can find music</h2>
      </div>
      {window.localStorage.getItem('jwt') !== null ?
      (
      <div>
      <ContentMenu/>
      <Content/>
      </div>
    ):(null)
    }
      </div>
  );
}

export default HomeComponent;
