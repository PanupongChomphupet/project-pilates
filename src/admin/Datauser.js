import styles from '../styles/Datauser.module.css'
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert'

function Datauser() {
    const id = useParams().id;
    const idcouse = useParams().idcouse;
    const history = useHistory()
    var levelsname = []
    const [level, setlevel] = useState([])
    const [user, setuser] = useState([])
    const [bill, setbill] = useState([])

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
            method: "POST",
            url: `http://34.66.210.189/datauser/${id}`
        }).then(res => {
            setuser(res.data.datae)
        })
    }, [])

    useEffect(() => {
        axios({
            method: "POST",
            url: `http://34.66.210.189/databill/${id}/${idcouse}`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({})
        }).then(res => {

            res.data.bill.level.forEach((item, index) => {
                levelsname.push({ level: item.level, name: item.name })
                if (!(index == res.data.bill.level - 1)) {
                    setlevel(levelsname)
                }
            });
            setbill(res.data.bill)
        })
        checkstatus()
    }, [])

    function approve() {
        swal({
            title: "ต้องการจะอนุญาติสิทธิ์คอร์สนี้",
            buttons: {
                cancel: "ยกเลิก",
                ยืนยัน: true,
            },
        }).then(re => {
            if (re) {
                axios({
                    method: "POST",
                    url: 'http://34.66.210.189/approve',
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify({
                        id,
                        idcouse,
                        levelsname: level
                    })
                }).then(res => {
                    if (res.data.re) {
                        swal({
                            icon: "success",
                            title: "อนุญาติสิทธ์แล้ว"
                        })
                        history.push('/userdata')
                    }

                })
            }
        })
    }

    function deletedata() {
        swal({
            title: "ต้องการจะยกเลิกสิทธิ์คอร์สนี้",
            buttons: {
                cancel: "ยกเลิก",
                ยืนยัน: true,
            },
        }).then(re => {
            if (re) {
                axios({
                    method: "POST",
                    url: 'http://34.66.210.189/deletebill',
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify({
                        id,
                        idcouse
                    })
                }).then(res => {
                    if (res.data.datae == "seccess") {
                        swal({
                            icon: "success",
                            title: "ยกเลิกสิทธิ์คอร์สนี้แล้ว"
                        })
                        history.push('/userdata')
                    }
                })
            }
        })
    }

    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                <p>ชื่อ-นามสกุล : <span>{user.name}</span> </p>
                <p>เบอร์โทร : <span>{user.tel}</span></p>
            </div>
            <h2 className={styles.title}>รายการคำสั่งซื้อ</h2>
            <div className={styles.bill}>
                <div className={styles.listbill}>
                    <span>{bill.date}/{bill.time}</span>
                    <h3 className={styles.namedate}>{bill.namecouse}</h3>
                      {bill.level ? bill.level.map((item, index) =>
                        <div key={index} className={styles.level}>
                            <p className={styles.levelone}>เลเวล {item.level} : {item.name}</p>
                            <p> {item.price} บาท</p>
                        </div>
                    ) : null}
                    <h3 className={styles.sumpricetitle}>ราคารวม <span>{bill.sumprice} บาท</span></h3>
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={deletedata}>ยกเลิก</button>
                <button onClick={approve}>อนุญาต</button>
            </div>
        </div>
    )
}
export default Datauser;
