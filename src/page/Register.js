import { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import styles from '../styles/Register.module.css'
import swal from 'sweetalert'

function Register() {
    const history = useHistory();
    const [preview, setPreview] = useState(null);
    
    const [from, setfrom] = useState({
        name_surname: "",
        age: 0,
        weight: 0,
        heigth: 0,
        gender: "",
        tel: "",
        password: "",
        image_path: "",
    })

    function senddata(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name_surname", from.name_surname)
        formData.append("age", from.age)
        formData.append("weight", from.weight)
        formData.append("heigth", from.heigth)
        formData.append("gender", from.gender)
        formData.append("tel", from.tel)
        formData.append("password", from.password)
        formData.append("image_path", from.image_path)

        let strength;
        if ((from.tel.length === 10 && from.tel.match(/[0-9]+/)) && (from.password.match(/[a-z]+/) || from.password.match(/[A-Z]+/)) && (from.password.match(/[0-9]+/) && from.password.length >= 8)) {
            strength = 1;
        } else {
            strength = 0;
            if (!(from.tel.length === 10 && from.tel.match(/[0-9]+/))) {
                document.getElementById("tel").innerHTML = "กรอกเบอร์โทรศัพท์"
                document.getElementById("tel").style.color = "red"
                document.getElementById("tel").style.fontSize = "12px"
                document.getElementById("texttel").style.border = "2px solid red"
            }else{
                document.getElementById("tel").style.color = "black"
                document.getElementById("texttel").style.border = "2px solid #BE9BDD"
            }
            if (!((from.password.match(/[a-z]+/) || from.password.match(/[A-Z]+/)) && (from.password.match(/[0-9]+/) && from.password.length >= 8))) {
                document.getElementById("ps").innerHTML = "ใช้ตัวอักษร ตัวเลข และต้องมากกว่า8ตัว"
                document.getElementById("ps").style.color = "red"
                document.getElementById("ps").style.fontSize = "12px"
                document.getElementById("pass").style.border = "2px solid red"
            }else {
                document.getElementById("ps").style.color = "black"
                document.getElementById("pass").style.border = "2px solid #BE9BDD"
            }
        }

        if (strength) {
            axios({
                method: "POST",
                url: "http://34.66.210.189/register",
                headers: { "Content-Type": "application/json" },
                data: formData
            }).then(res => {
                if (res.data == 'ข้อมูลไม่คบ') {
                    swal({
                        icon: "error",
                        title: "ใส่ชื่อ เบอร์โทรศัพท์ และรหัสผ่าน"
                    })
                } else if (res.data == 'อีเมลนี้มีคนใช้แล้ว') {
                    swal({
                        icon: "warning",
                        title: "มีชื่อผู้ใช้นี้แล้ว"
                    })
                } else {
                    axios({
                        method: "POST",
                        url: "http://34.66.210.189/login",
                        headers: { "Content-Type": "application/json" },
                        data: JSON.stringify({
                            tel: res.data.tel,
                            password: res.data.password
                        })
                    }).then(re => {
                        if (re.data) {
                            localStorage.setItem("token", re.data.token);
			    history.push('/dasborad')
                        }
                    })

                }
            })
        }
    }

    function handleChoosepic(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setPreview([reader.result]);
        }
        setfrom({ ...from, image_path: file });
    }

    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                <h2 className={styles.title}>สมัครสมาชิก</h2>
                <div className={styles.inputs}>
                    <input type="text"
                        placeholder="ชื่อ-นามสกุล"
                        onChange={e => setfrom({ ...from, name_surname: e.target.value })}
                    />
                    <div className={styles.inputnumber}>
                        <input className={styles.box1}
                            type="number"
                            placeholder="อายุ"
                            onChange={e => setfrom({ ...from, age: e.target.value })}
                        /><label>ปี</label>
                        <input className={styles.box2}
                            type="number"
                            placeholder="น้ำหนัก"
                            onChange={e => setfrom({ ...from, weight: e.target.value })}
                        /><label>กิโลกรัม</label>
                        <input className={styles.box3}
                            type="number"
                            placeholder="ส่วนสูง"
                            onChange={e => setfrom({ ...from, heigth: e.target.value })}
                        /><label>เชนติเมตร</label>
                    </div>
                    <div className={styles.gender}>
                        <h3>เพศ</h3>
                        <div className={styles.gbox1}><input type="radio" value="ชาย" onChange={e => setfrom({ ...from, gender: e.target.value })} name="gender" /><label>ชาย</label></div>
                        <div className={styles.gbox2}><input type="radio" value="หญิง" onChange={e => setfrom({ ...from, gender: e.target.value })} name="gender" /><label>หญิง</label></div>
                    </div>
                    <input type="text"
                        placeholder="เบอร์โทรศัพท์"
                        onChange={e => setfrom({ ...from, tel: e.target.value })}
                        id="texttel"
                    />
                    <div className={styles.chekpassword}>
                        <div id="tel" >กรอกเบอร์โทรศัพท์</div>
                    </div>
                    <input type="password"
                        placeholder="รหัสผ่าน"
                        id="pass"
                        onChange={e => setfrom({ ...from, password: e.target.value })}
                    />
                    <div className={styles.chekpassword}>
                        <div id="ps" >ใช้ตัวอักษร ตัวเลข และต้องมากกว่า8ตัว</div>
                    </div>
                    <p className = {styles.imgprofile}>รูปโปรไฟล์</p>
                    <img src={preview} width={300} />
                    <input type="file"
                        onChange={handleChoosepic}
                    />

                </div>
                <div className={styles.btn}>
                    <button className={styles.btn_register} onClick={senddata}>สมัครสมาชิก</button>
                </div>
            </div>

        </div>
    )
}
export default Register;
