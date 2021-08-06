import styles from '../styles/Updatecouse.module.css'
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert'
function Updatecouse() {
    const id = useParams().id;
    const [datacouse, setdatacouse] = useState({})
    const [from, setfrom] = useState({})
    const [preview, setPreview] = useState(null);
    const history = useHistory()
    
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

    useEffect(() => {
        axios({
            method: "post",
            url: "http://34.66.210.189/udatacouse",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ id })
        }).then(res => {
            setdatacouse(res.data.result)
            setfrom({
                namecouse: res.data.result.name,
                detail: res.data.result.detail,
                img : res.data.result.url,
                number : res.data.result.number,
            })
            setPreview( "https://storage.googleapis.com/videoimg-course/" + res.data.result.url)
        })
        checkstatus()
    }, [])

    function updatecouse() {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", from.namecouse);
        formData.append("img", from.img);
        formData.append("detail", from.detail);
        formData.append("number", from.number)
        
        axios ({
            method: "post",
            url: "http://34.66.210.189/updatecouse",
            headers: { "Content-Type": "application/json" },
            data: formData
        }).then(res => {
            if (res.data.status === "success") {
                swal({
                    icon: "success",
                    title: "แก้ไขข้อมูลสำเร็จ"
                })
                history.push('/dasboradadmin')
            }
        })
    }

    function handleChoosepic (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreview([reader.result]);
        }
        setfrom({...from, img: file});
    }
    
    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                <h2 className={styles.titledas}>แก้ไขคอร์ส</h2>
                <div className={styles.border}></div>
                <div className={styles.paragrap}>
                    <label>ชื่อคอร์ส</label>
                    <input type="text"
                        value={from.namecouse}
                        onChange={e => setfrom({ ...from, namecouse: e.target.value })}
                    />
                    <label>รูปภาพ</label>
                    <img src={preview} width={200} alt=""/>
                    <input type="file"
                        onChange={handleChoosepic}
                    />
                    <label>รายละเอียด</label>
                    <textarea
                        value={from.detail}
                        onChange={e => setfrom({ ...from, detail: e.target.value })}
                    />
                    <label>จำนวนเลเวล</label>
                    <input type = "number"
                        value = {from.number}
                        onChange = {(e) => setfrom({...from, number: e.target.value})}
                    />
                    <div className={styles.btn}><button onClick={updatecouse} className={styles.btn_b}>ยืนยัน</button></div>
                </div>
            </div>
        </div>
    )
}
export default Updatecouse;