import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Dassboradadmin.module.css'
import swal from 'sweetalert'


function Dassborad() {
    const history = useHistory();
    const [itemcouse, setitemcouse] = useState([]);

    function loadpage() {
        axios({
            method: "GET",
            url: "http://34.66.210.189/course",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            setitemcouse(res.data.cos)
        })
    }

    function checkstatus() {
        const token = localStorage.getItem("token");
        axios({
            method: 'post',
            url: 'http://34.66.210.189/check-status',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ token })
        }).then(res => {
            if (res.data !== 'admin') {
                history.push("/home");
            }
        })
    }

    useEffect(() => {
        loadpage()
        checkstatus()
    }, [])

    function deletes(ids) {
        const id = ids;
        swal({
            title: "ต้องการลบคอร์สนี้ใช่หรือไม่",
            buttons: {
                cancel: "ยกเลิก",
                ยืนยัน: true,
            },
        }).then(result => {
            if (result) {
                axios({
                    method: "POST",
                    url: "http://34.66.210.189/deletecouse",
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify({ id })
                }).then(res => {
                    if (res.data === "สำเร็จ") {
                        loadpage()
                    }
                })
            }
        })
    }

    return (
        <div className={styles.bg}>
            {itemcouse.map((item, index) =>
                <div key={index} className={styles.couse}>
                    <div onClick={() => { history.push(`/datacouse/${item._id}`) }} style={{ background: `url(https://storage.googleapis.com/videoimg-course/${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className={styles.img}></div>
                    <div className={styles.page}>
                        <div className={styles.name}>
                            <h2 className={styles.title}>{item.name}</h2>
                        </div>
                        <div className={styles.btn}>
                            <button onClick={() => { history.push(`/updatecouse/${item._id}`) }} >แก้ไข</button>
                            <button onClick={() => { deletes(item._id) }}>ลบ</button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
export default Dassborad;