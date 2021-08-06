import styles from '../styles/Videoplay.module.css'
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'

function Videoplay() {
    const id = useParams().id;
    const level = useParams().level;
    const [vel, setvel] = useState([])

    useEffect(() => {
        axios({
            method: 'POST',
            url: 'http://34.66.210.189/video',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                id,
                level
            })
        }).then(res => {
            setvel(res.data.level)
        })

    }, [])
    return (
        <div className={styles.video}>
            <div>
                <h2>เลเวล: {vel.level}. {vel.name}</h2>
                {vel.video ? vel.video.map((item, index) =>
                    <div key={index}>
                        {<ReactPlayer
                            url={[{ src: `https://storage.googleapis.com/videoimg-course/${vel.video[index]}`, type: 'video/mp4' }]}
                            controls  // gives the front end video controls 
                            width='100%'
                            height='100%'
                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                            onContextMenu={e => e.preventDefault()}
                        />}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
export default Videoplay;