import { useHistory, useParams } from 'react-router-dom';
import styles from '../styles/Datacouse.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

function Datacouse() {
    const id = useParams().id;
    const [couse, setcouse] = useState([])
    const history = useHistory();

    function checkstatus() {
        const token = localStorage.getItem("token");
        axios({
            method: 'POST',
            url: 'http://34.66.210.189/check-status',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ token })
        }).then(res => {
            if (res.data !== 'admin') {
                history.push("/home");
            }
        })
    }

    function datas() {
        axios({
            method: "GET",
            url: `http://34.66.210.189/couseone/${id}`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({})
        }).then(res => {
            setcouse(res.data.couse)
        })
    }
    
    useEffect(() => {
        datas()
        checkstatus();
    }, [])

    function deletelevel(level, id) {
        swal({
            title: "ต้องการลบเลเวลนี้ใช่หรือไม่",
            buttons: {
                cancel: "ยกเลิก",
                ยืนยัน: true,
            },
        }).then(re => {
            if (re) {
                axios({
                    method: "post",
                    url: "http://34.66.210.189/removelevel",
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify({ level, id })
                }).then(res => {
                    if (res.data.datae == "seccess") {
                        swal({
                            icon: "success",
                            title: "ลบข้อมูลเรียบร้อย"
                        })
                    }
                    datas()
                })
            }
        })

    }

    function checkadmin() {

    }

    return (
        <div className={styles.bg}>
            <h2 className={styles.title}>ข้อมูลคอร์ส</h2>
            <div className={styles.border}></div>
            <div className={styles.content}>
                <h3 className={styles.cousetitle}>ชื่อคอร์ส</h3>
                <p className={styles.namecouse}>{couse.name}</p>
                <h3 className={styles.detailt}>รายละเอียด</h3>
                <p className={styles.detail}>{couse.detail}</p>
                <div className={styles.level}>
                    <h3 className={styles.sumlelve}>เลเวลทั้งหมด</h3>
                    <div className={styles.levellist}>
                        {couse.level ? couse.level.map((item, index) =>
                            <div key={index}>
                                <div className={styles.leveldiv}>
                                    <div className={styles.vel}>
                                        <label className={styles.datalevel}> เลเวล {item.level} : {item.name}</label>
                                    </div>
                                    <div className={styles.btn}>
                                        <button onClick={() => { deletelevel(item.level, couse._id) }} className={styles.deletee}>ลบ</button>
                                        <button onClick={() => { history.push(`/updatelevel/${couse._id}/${item.level}`) }} className={styles.update}>แก้ไขเลเวล</button>

                                    </div>
                                </div>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Datacouse;