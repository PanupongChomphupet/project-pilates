import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import styles from '../styles/ForgotPassword.module.css'
import swal from 'sweetalert'
import { atom, useRecoilState } from 'recoil'

const tellect = atom({
    key: "tel",
    default: []
})

function ForgotPassword() {
    const [tel, settel] = useState("")
    const [numberfour, setnumberfour] = useState("")
    const [telre, settelre] = useRecoilState(tellect)
    const history = useHistory()

    function sendpassword() {
        if (tel) {
            if (tel.length === 10 && tel.match(/[0-9]+/)) {
                axios({
                    method: "POST",
                    url: "http://34.66.210.189/forgot",
                    headers: { "Content-Type": "application/json" },
                    data: JSON.stringify({
                        tel
                    })
                }).then(res => {
                    if (res.data === "ส่งข้อมูลไปแล้ว") {

                        document.getElementById("textshow").innerHTML = " ตรวจสอบ SMS ที่เบอร์ " + tel

                        swal({
                            icon: "success",
                            title: "ส่งรห้สไปที่ " + tel + " แล้ว"
                        })
                    } else {
                        swal({
                            icon: "error",
                            title: "ไม่มีข้อมูลในสมาชิก"
                        })
                    }
                })
            } else {
                swal({
                    icon: "info",
                    title: "กรอกเบอร์โทรศัพท์"
                })
            }
        } else {
            swal({
                icon: "info",
                title: "กรอกเบอร์โทรศัพท์"
            })
        }
    }

    function passwordnumber() {
        settelre(tel)
        if (tel) {
            axios({
                method: "POST",
                url: "http://34.66.210.189/sendpassword",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({
                    tel,
                    numberfour
                })
            }).then(res => {
                if (res.data === "datacorrect") {
                    history.push(`/Newpassword`)
                } else {
                    swal({
                        icon: "error",
                        title: "รหัสไม่ถูกต้อง"
                    })
                }
            })
        } else {
            swal({
                icon: "info",
                title: "กรอกเบอร์โทรศัพท์"
            })
        }
    }

    return (
        <div className={styles.bg}>
            <h2 className={styles.title}>ลืมรหัสผ่าน</h2>
            <div className={styles.content}>
                <div className={styles.senddata}>
                    <label className={styles.sendtext}>กรอกเบอร์โทรศัพท์</label><br />
                    <input
                        type="text"
                        placeholder="0XXXXXXXXX"
                        maxLength="10"
                        onChange={(e) => { settel(e.target.value) }}
                    /><br />
                    <button onClick={sendpassword}>ส่งรหัส</button><br/>
                    <label id="textshow" className={styles.sendtext}></label>
                </div>
                <div className={styles.getdata}>
                    <label className={styles.sendtext}>กรอกรหัส 4 ตัว</label><br />
                    <input type="text"
                        placeholder="1234"
                        maxLength="4"
                        onChange={(e) => { setnumberfour(e.target.value) }}
                    /><br />
                    <div className={styles.btn}>
                        <button onClick={passwordnumber}>ยืนยัน</button>
                    </div>
                </div>


            </div>
            <div>

            </div>
        </div>
    )
}
export default ForgotPassword;