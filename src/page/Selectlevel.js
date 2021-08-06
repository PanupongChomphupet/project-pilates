import styles from '../styles/Selectlevel.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Selectlevel() {
    const id = useParams().id;
    const token = localStorage.getItem("token");
    const [level, setlevel] = useState([])
    const [vel , setvel] = useState ([])
    const history = useHistory()
    useEffect(() => {
        axios({
            url: `http://34.66.210.189/billlevel/${id}`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                token
            }),
        }).then(res => {
            setlevel(res.data.level)
            let arr = []
            res.data.level.level.forEach((items, index) => {
                arr.push({items})
                if (index == res.data.level.level.length - 1) {
                    arr.sort((a, b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))
		    arr.reverse();
                    setvel(arr)
                }
            });
        })
    }, [])
    
    return (
        <div className={styles.bg_level}>
            <div className={styles.content}>
                <h2>เลือกเลเวล</h2>
                <div className={styles.border} />
                {level.level ? level.level.filter(e => e.approve).map((item, index) =>
                    <div key = {index}>
                        <div onClick={() => history.push(`/video/${id}/${item.level}`)} className={styles.level}>
                            <div className={styles.a}>เลเวลที่ : {item.level}. {item.name}</div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div >
    )
}
export default Selectlevel
