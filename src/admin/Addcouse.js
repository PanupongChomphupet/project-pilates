import styles from '../styles/Addcouse.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
function Addcouse() {
    const [from, setfrom] = useState({
        newcousename: '',
        img: {},
        detail: '',
        numberlevel: 0
    });
    const history = useHistory();
    const [preview, setPreview] = useState(null);
    
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
    useEffect (() => {
        checkstatus()    
    }, [])

    function insertdata(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", from.newcousename);
        formData.append("img", from.img);
        formData.append("detail", from.detail);
        formData.append("numberlevel", from.numberlevel)

        axios({
            method: "POST",
            url: "http://34.66.210.189/insertcouse",
            headers: { "Content-Type": "application/json" },
            data: formData
        }).then(res => {
            if (res.data === "success") {
                swal({
                    icon: "success",
                    title: "เพิ่มข้อมูลสำเร็จ"
                })
                history.push('/dasboradadmin')
            }else if (res.data === "incomplete") {
                swal({
                    icon: "info",
                    title: "กรอกข้อมูลไม่ครบ"
                })
            } else {
                swal({
                    icon: "warning",
                    title: "เพิ่มข้อมูลไม่สำเร็จ"
                })
            }
        })
    }

    function handleChoosepic(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreview([reader.result]);
        }
        setfrom({ ...from, img: file });
    }
    
    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                <h2 className={styles.titledas}>เพิ่มคอร์สใหม่</h2>
                <div className={styles.border}></div>
                <div className={styles.paragrap}>
                    <label>ชื่อคอร์สใหม่</label>
                    <input type="text"
                        onChange={e => setfrom({ ...from, newcousename: e.target.value })}
                    />
                    <label>เพิ่มรูปภาพ</label>
                    <img src={preview} width={200}/>
                    <input type="file"
                        onChange={handleChoosepic}
                    />
                    <label>เพิ่มรายละเอียด</label>
                    <textarea onChange={e => setfrom({ ...from, detail: e.target.value })} />
                    <label>จำนวนเลเวล</label>
                    <input type="number"
                        onChange={e => setfrom({ ...from, numberlevel: e.target.value })}
                    />
                    <div className={styles.btn}><button className={styles.btn_b} onClick={insertdata}>ยืนยัน</button></div>
                </div>
            </div>
        </div>
    )
}
export default Addcouse;