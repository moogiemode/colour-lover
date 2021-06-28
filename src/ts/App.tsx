import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import '../styles.scss';

interface IPalette  {
  id: number;
  title: string;
  userName: string;
  numViews: number;
  numVotes: number;
  numComments: number;
  numHearts: number;
  rank: number;
  dateCreated: string;
  colors: string[];
  description: string;
  url: string;
  imageUrl: string;
  badgeUrl: string;
  apiUrl: string;
}

const App: FC = () => {

  const [colorPalettes, setColorPalettes] = useState<IPalette[] | undefined>([]);
  const [currentTime, setCurrentTime] = useState<String | undefined>(undefined);

  useEffect(() => {
    getPalettes();
    setCurrentTime(getTime(Date.now()));

    const everyMinute: NodeJS.Timeout = setInterval(() => {
      getPalettes();
      setCurrentTime(getTime(Date.now()));
    }, 60000)
    return () => clearInterval(everyMinute)
  }, []);

  const getPalettes = () => {
    axios.get("/api")
    .then(res => setColorPalettes(res.data))
    .catch(err => console.error(err))
  }

  const getTime = (time: string | number) => {
    return new Date(time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

  const mappedPalettes: JSX.Element[] = colorPalettes.map(palette => {
    return (
      <div className="palette-div" key={palette.id}>
        <div className="palette-info-div">
          <div>
            <h2 className="palette-title-div">{palette.title}</h2>
            <p className="palette-owner-time-div">by {palette.userName} at {getTime(palette.dateCreated)}</p>
          </div>
          <div>
            <div className="view-votes">{palette.numViews} views &nbsp; {palette.numVotes} {palette.numVotes === 1 ? 'vote' : 'votes'}</div>
          </div>
        </div>
        <div className="palette-image-div">
          <img src={palette.imageUrl} alt={palette.description} />
        </div>
      </div>
    )
  });
  
  return (
    <div className="palette-main">
      <div className="palette-header">
        <h1 className="title">ColourLovers. <strong>Live.</strong></h1>
        <span className="updated-at">Last Updated at {currentTime}</span>
      </div>
      <div className="palette-container">
      {mappedPalettes}
      </div>
    </div>
  );
};

export default App;
