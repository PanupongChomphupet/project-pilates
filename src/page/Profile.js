import styles from '../styles/profile.module.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Login from '../page/Login'
import { RiContactsLine } from 'react-icons/ri';

function Profile() {
    const history = useHistory();
    const token = localStorage.getItem("token");
    // ข้อมูล user
    const [valeue, setvelue] = useState([])

    useEffect(() => {
        axios({
            url: "http://34.66.210.189/dataprofile",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ token })
        }).then(res => {
            setvelue(res.data.user)
        })
    }, [])

    return (
        <div className={styles.profile_bg}>
            <div className={styles.content_profile}>
                <div className={styles.bg_img}>
                    {
                        valeue.img_path ? <img src={`https://storage.googleapis.com/videoimg-course/${valeue.img_path}`} />
                            : null
                    }
                </div>
                <div className={styles.border}></div>
                <h1 className={styles.title}>โปรไฟล์</h1>
                <div className={styles.datauser}>
                    <div>
                        <div className={styles.name}>
                            <h3>ชื่อ : <a>{valeue.name}</a></h3>
                        </div>
                        <div className={styles.age}>
                            <h3>อายุ : <a>{valeue.age} ปี</a></h3>
                        </div>
                        <div className={styles.weight}>
                            <h3>น้ำหนัก : <a> {valeue.weight} กิโลกรัม</a></h3>
                        </div>
                        <div className={styles.height}>
                            <h3>ส่วนสูง : <a>{valeue.height} เซนติเมตร</a></h3>
                        </div>
                        <div className={styles.gender}>
                            <h3>เพศ : <a>{valeue.gender}</a></h3>
                        </div>
                        <div className={styles.tel}>
                            <h3>เบอร์โทรศัพท์ : <a>{valeue.tel}</a></h3>
                        </div>
                    </div>
                </div>
                <div className={styles.btn}>
                    <button onClick={() => { history.push('/update') }} className={styles.btn_update}>แก้ไขโปรไฟล์</button><br />
                </div>
            </div>
        </div>
    )
}
export default Profile