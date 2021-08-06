import styles from '../styles/Newpassword.module.css'
import axios from 'axios'
import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

const tellect = atom({
    key: "tel",
    default: []
})

function Newpassword() {
    const [telre, settelre] = useRecoilState(tellect)
    const [newp, setnewp] = useState("")
    const [pagain, setpagain] = useState("")
    const history = useHistory()
    function Newpassword() {

        if (newp) {
            if (((newp.match(/[a-z]+/) || newp.match(/[A-Z]+/)) && (newp.match(/[0-9]+/) && newp.length >= 8))) {
                if (newp === pagain) {
                    axios({
                        method: "post",
                        url: "http://34.66.210.189/newpassword",
                        headers: { "Content-Type": "application/json" },
                        data: JSON.stringify({
                            telre,
                            newp
                        })
                    }).then(res => {
                        if (res.data === "success") {
                            swal({
                                icon: "success",
                                title: "เปลี่ยนรหัสผ่านสำเร็จ"
                            })
                            history.push('/login')
                            settelre([])
                        }
                    })
                } else {
                    swal({
                        icon: "info",
                        title: "รหัสผ่านไม่ตรงกัน"
                    })
                }
            }else {
                swal({
                    icon: "info",
                    title: "รหัสผ่านต้องเป็นตัวเลข ตัวอักษร และมากกว่า 8 ตัว"
                }) 
            }
        } else {
            swal({
                icon: "info",
                title: "กรุณากรอกรหัสผ่าน"
            })
        }


    }

    return (
        <div className={styles.bg}>
            <h2 className={styles.title}>รหัสผ่านใหม่</h2>
            <div className={styles.content}>
                <div className={styles.input}>
                    <label>รหัสผ่านใหม่</label><br />
                    <input
                        type="password"
                        onChange={(e) => { setnewp(e.target.value) }}
                    /><br />
                    <label>ยืนยันรหัสผ่านอีกครั้ง</label><br />
                    <input
                        type="password"
                        onChange={(e) => { setpagain(e.target.value) }}
                    /><br />
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={Newpassword}>ยืนยันการเปลียนรหัส</button>
            </div>
        </div>
    )
}
export default Newpassword;