import axios from 'axios';
import styles from '../styles/Addvideo.module.css'
import { useState } from 'react'
import { Progress } from 'react-sweet-progress';
import swal from 'sweetalert'
import { useHistory, useParams } from 'react-router-dom';
function Addvideo() {
    const history = useHistory();
    const name = useParams().name;
    const level = useParams().level;
    const [video, setvideo] = useState([])
    const [loaded, setLoaded] = useState(-1);

    function save() {
        const formdata = new FormData();
        formdata.append("name", name)
        formdata.append("level", level)

        let data = document.getElementById("confirm-cancel").innerHTML;
        if (data === "ยืนยัน") {
            if (video.length) {
                for (let i = 0; i < video.length; ++i) {
                    formdata.append("videos", video[i]);
                    if (i == video.length - 1) {
                        document.getElementById("confirm-cancel").innerHTML = "ยกเลิก";
                        axios({
                            method: 'POST',
                            url: 'http://34.66.210.189/addvideo',
                            headers: { "Content-Type": "multipart/form-data" },
                            data: formdata,
                            onUploadProgress: (e) => {
                                if (e.lengthComputable) {
                                    setLoaded((e.loaded * 100 / e.total + "%").split(".")[0])
                                }
                            }
                        }).then(res => {
                            if (res.data === "สำเร็จ") {
                                swal({
                                    icon: "warning",
                                    title: "กำลังอัพโหลดวิดิโออาจใช้เวลาสักครู่"
                                })
                                history.push(`/dasboradadmin`)
                            }
                        })
                    }
                }
            } else {
                axios({
                    method: 'POST',
                    url: 'http://34.66.210.189/addvideo',
                    headers: { "Content-Type": "multipary/form-data" },
                    data: formdata,
                }).then(res => {
                    if (res.data === "ข้อมูลไม่คบ") {
                        swal({
                            icon: "info",
                            title: "ใส่วิดิโอ"
                        })
                    }
                })
            }
        } else if (data === "ยกเลิก") {
            window.location.reload();
            document.getElementById("confirm-cancel").innerHTML = "เพิ่มเลเวล";
        }
    }

    return (
        <div className={styles.bg}>
            <h2 className={styles.title}>เพิ่มวิดิโอตัวอย่าง</h2>
            <div className={styles.content}>
                <label className={styles.text}>เพิ่มวิดิโอ</label>
                <input type="file" multiple
                    onChange={(e) => setvideo(e.target.files)}
                />
                <div className={styles.upload}>
                    {loaded > -1 ? <Progress percent={loaded} /> : null}
                </div>
                <div className={styles.btn}>
                    <button onClick={save} id="confirm-cancel" >ยืนยัน</button>
                </div>
            </div>
        </div>
    )
}
export default Addvideo;
