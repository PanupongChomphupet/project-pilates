import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/Lojgin.module.css'
import swal from 'sweetalert'
function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const token = localStorage.getItem("token");
    const history = useHistory();
    useEffect(() => {
        if (token) {
            if (1) {
                history.push('/dasborad')
            } else {
                history.push('/dasboradadmin')
            }
        }
    }, [])
    function sendData(e) {
        e.preventDefault()
        axios({
            method: "POST",
            url: "http://34.66.210.189/login",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                tel: username,
                password: password
            })
        }).then(result => {
            if (!result.data.token) {
                swal({
                    icon: "error",
                    title: "เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง"
                })
            } else {
                if (result.data.right == 'user') {
                    localStorage.setItem("token", result.data.token);
                    history.push('/dasborad')

                } else if (result.data.right == "admin") {
                    localStorage.setItem("token", result.data.token);
                    history.push('/dasboradadmin')
                }
            }
        })
    }
    return (
        <div>
            <div className={styles.login_harder}>
                <form className={styles.login}>
                    <h2 className={styles.title}>ลงชื่อเข้าใช้งาน</h2>
                    <div className={styles.border_button} />
                    <div className={styles.input_login}>
                        <input type="number"
                            placeholder="เบอร์โทรศัพท์"
                            onChange={e => { setusername(e.target.value) }}
                        />
                    </div>
                    <div className={styles.input_login}>
                        <input
                            type="password"
                            placeholder="รหัสผ่าน"
                            onChange={e => { setpassword(e.target.value) }}
                        />
                    </div>
                    <div className = {styles.forgot}>
                        <label onClick = {() => {history.push('/ForgotPassword')}}  className={styles.forgotpassword}>ลืมรหัสผ่าน ?</label>
                    </div>


                    <input
                        type="submit"
                        value="เข้าสู่ระบบ"
                        className={styles.btn_login}
                        onClick={sendData}
                    />
                    <div className={styles.border_button1} />
                    <p className={styles.member_login}>ยังไม่เป็นสมาชิก ?<a onClick={() => history.push('/register')} className={styles.register}> สมัครเลย</a></p>
                </form>
            </div>
        </div>
    )
}
export default Login
