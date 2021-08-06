import styles from '../styles/Historylist.module.css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


import axios from 'axios'

function Historylist() {
    const history = useHistory();

    const [value, setvalue] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios({
            method: "post",
            url: "http://34.66.210.189/history",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({token})
        }).then(res => {
            setvalue(res.data.history)
        })
    }, [])
    return (
        <div>
            <div className={styles.content}>
                <h2 className={styles.title}>ประวัติการทำรายการ</h2>
                <div className={styles.bg}>
                    {value.map((items, index) =>
                        <div key={index} className={styles.data}>
                            <p>{items.namecouse}</p>
                            <div className = {styles.btn}>
                                <button onClick={e => { history.push(`/historydetail/${items.Id}`) }} className={styles.date}>{items.date} / {items.time}</button><br /><br />
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}
export default Historylist;
