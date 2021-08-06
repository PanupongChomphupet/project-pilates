import styles from '../styles/Updatelevel.module.css'
import axios from 'axios';
import swal from 'sweetalert'
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Progress } from 'react-sweet-progress';
import "../../node_modules/react-sweet-progress/lib/style.css";
import ReactPlayer from 'react-player'

function Updatelevel() {
    const id = useParams().id;
    const idvel = useParams().level;
    const history = useHistory();
    const [idd, setidd] = useState(id)
    const [levell, setlevell] = useState(idvel)
    const [video, setvideo] = useState([])
    const [listvideo, setlistvideo] = useState([])
    const [form, setform] = useState({})
    const [loaded, setLoaded] = useState(-1);
    const [videoname, setvideoname] = useState({})

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
            url: 'http://34.66.210.189/dataleve',
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ idd, levell })
        }).then(res => {
            setlistvideo(res.data.level.video)

            setform({
                namelevel: res.data.level.name,
                price: res.data.level.price,

            })
        })
        checkstatus()
    }, [])

    function save(e) {
	e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.namelevel);
        formData.append("price", form.price);
        formData.append("videoname", listvideo)
        let data = document.getElementById("confirm-cancel").innerHTML;
        if (data === "ยืนยัน") {
        if (video.length > 0) {
            for (let i = 0; i < video.length; ++i) {
                formData.append("videos", video[i]);
                if (i == video.length - 1) {
                    axios({
                        method: "post",
                        url: `http://34.66.210.189/updatelevel/${id}/${idvel}`,
                        headers: { "Content-Type": "application/json" },
                        data: formData,
                        onUploadProgress: (e) => {
				document.getElementById("confirm-cancel").innerHTML = "ยกเลิก";
                            if (e.lengthComputable) {
                                setLoaded((e.loaded * 100 / e.total + "%").split(".")[0])
                            }
                        }
                    }).then(res => {
                        if (res.data == "สำเร็จ") {
                            swal({
                                icon: "success",
                                title: "แก้ไขข้อมูลสำเร็จ"
                            })
                            history.push(`/datacouse/${id}`)
                        }
                    })
                }
            }
        } else {
            axios({
                method: "post",
                url: `http://34.66.210.189/updatelevel/${id}/${idvel}`,
                headers: { "Content-Type": "application/json" },
                data: formData,
                onUploadProgress: (e) => {
                    if (e.lengthComputable) {
                        setLoaded((e.loaded * 100 / e.total + "%").split(".")[0])
                    }
                }
            }).then(res => {
                if (res.data == "สำเร็จ") {
                    swal({
                        icon: "success",
                        title: "แก้ไขข้อมูลสำเร็จ"
                    })
                    history.push(`/datacouse/${id}`)
                }
            })
        }
	}else if ( data = "ยกเลิก"){
	     window.location.reload();
             document.getElementById("confirm-cancel").innerHTML = "เพิ่มเลเวล"; 
	}
    }

    function delectvideo(e) {
        swal({
            title: "ต้องการลบวิดิโอนี้ใช่หรือไม่",
            buttons: {
                cancel: "ยกเลิก",
                ยืนยัน: true,
            },
        }).then(res => {
            if (res) {
                let listvideos = listvideo
                listvideos = listvideos.filter(v => v != e)
                setlistvideo(listvideos)
            }
        })

    }

    return (
        <div className={styles.bg}>
            <div className={styles.hearder}>
                <h2 className={styles.title}>แก้ไขเลเวล</h2>
                <div className={styles.border}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.inputs}>
                    <label>ชื่อเลเวล</label>
                    <div className={styles.ips}>
                        <input type="text"
                            value={form.namelevel}
                            onChange={(e) => setform({ ...form, namelevel: e.target.value })}
                        />
                    </div>
                    <label>ราคา</label>
                    <div className={styles.ips}>
                        <input type="number"
                            value={form.price}
                            onChange={(e) => setform({ ...form, price: e.target.value })}
                        />
                    </div>
                    {listvideo.map((item, index) =>
                        <div key={index}>
                            <div className={styles.video}>
                                <ReactPlayer
                                    url={[{ src: `https://storage.googleapis.com/videoimg-course/${item}`, type: 'video/mp4' }]}
                                    controls  // gives the front end video controls 
                                    width='100%'
                                    height='100%'
                                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                    onContextMenu={e => e.preventDefault()}
                                />
                                <button onClick={e => delectvideo(item)} className={styles.btn}>ลบ</button>
                            </div>

                        </div>
                    )}<br /><br />
                    <label>เพิ่มวิดิโอ</label><br />
                    <input type="file" multiple
                        onChange={(e) => setvideo(e.target.files)}
                    />
                    <div className={styles.upload}>
                        {loaded > -1 ? <Progress percent={loaded} /> : null}
                    </div>
                </div>
                <div className={styles.btn}>
                    <button onClick={save} className={styles.btns} id = "confirm-cancel">ยืนยัน</button><br />
                </div>
            </div>
        </div>
    )
}
export default Updatelevel;
