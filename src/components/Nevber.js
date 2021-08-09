import styles from '../styles/Navber.module.css'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi'
import { HiUserCircle } from 'react-icons/hi'
import swal from 'sweetalert'
import axios from 'axios';
import { RiContactsBookLine } from 'react-icons/ri';

function Navber(props) {
    const { rights } = props
    const token = localStorage.getItem("token");
    const history = useHistory()
    const [bill, setbill] = useState([])
    const [noti, setnoti] = useState([])

    function nitis() {
        axios({
            method: "get",
            url: "http://34.66.210.189/sumbill",
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            if (res.data.sumbill.length !== noti.length) {
                setnoti(res.data.sumbill)
            }
        })
    }

    useEffect(() => {
        nitis()
    })

    function myLinks() {
        var x = document.getElementById("myLinks")
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    function ppath() {
        swal({
            title: "ต้องการออกจากระบบใช่หรือไม่",
            buttons: {
                cancel: "ยกเลิก",
                ยืนยัน: true,
            },
        }).then(res => {
            if (res) {
                localStorage.removeItem('token')
                history.push('/login')
                window.location.reload();

            }
        });
        document.getElementById("myLinks").style.display = 'none'
    }

    function check(value) {
        if (value == "home") {
            history.push('/')
        } else if (value == "dasborad") {
            history.push('/dasborad')
        } else if (value == "dasboradadmin") {
            history.push('/dasboradadmin')
        } else if (value == "userdata") {
            history.push('/userdata')
        } else if (value == "insertdata") {
            history.push('/insertdata')
        } else if (value == "addlevel") {
            history.push('/addlevel')
        } else if (value == "history") {
            history.push('/history')
        } else if (value == "bank-account") {
            history.push('/bank-account')
        } else if (value == "profile") {
            history.push('/profile')
        } else {
            ppath()
        }
        document.getElementById("myLinks").style.display = 'none'
    }


    function user() {
        return (
            <nav>
                <div className={styles.bg_navber}>
                    <div className={styles.content}>
                        <h1 className={styles.nav_title}>VPilates</h1>
                        <div className={styles.nav_menu} id="myLinks">
                            <a onClick={() => check("home")}>คอร์สเรียนทั้งหมด</a>
                            <a onClick={() => check("dasborad")} >คอร์สเรียนของฉัน</a>
                            <a onClick={() => check("history")} >ประวัติการทำรายการ</a>
                            <a onClick={() => ppath()} >ออกจากระบบ</a>
                        </div>
                        <div className={styles.icon}>
                            <a className={styles.iconuser} onClick={(e) => check('profile')} ><HiUserCircle /></a>
                            <a className={styles.iconmenu} onClick={myLinks}><FiMenu /></a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    function admin() {
        return (
            <nav style={{ zIndex: 999999 }}>
                <div className={styles.bg_navber}>
                    <div className={styles.content}>
                        <h1 className={styles.nav_title}>VPilates</h1>
                        <div className={styles.nav_menu} id="myLinks">
                            <a onClick={() => check('dasboradadmin')}>รายการคอร์ส</a>
                            <a onClick={() => check('userdata')}>รายการสั่งซื้อ</a>
                            <a onClick={() => check('insertdata')}>เพิ่มคอร์ส</a>
                            <a onClick={() => check('addlevel')}>เพิ่มเลเวล</a>
                            <a onClick={() => check('bank-account')}>แก้ไขบัญชีธนาคาร</a>
                            <a onClick={() => ppath()}>ออกจากระบบ</a>
                        </div>
                        <div className={styles.icon}>
                            <a className={styles.iconmenu} onClick={myLinks}><FiMenu /></a>
                            {(noti.length > 0) ? <div className={styles.notication}>{noti.length}</div> : null}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    function login() {
        return (
            <nav>
                <div className={styles.bg_navber}>
                    <div className={styles.content}>
                        <h1 className={styles.nav_title}>VPilates</h1>
                        <div className={styles.nav_menu} id="myLinks">
                            <a onClick={(e) => check("home")}>คอร์สเรียนทั้งหมด</a>
                        </div>
                        <div className={styles.icon}>
                            <a className={styles.iconuser} onClick={(e) => { history.push('/login') }} ><HiUserCircle /></a>
                            <a className={styles.iconmenu} onClick={myLinks}><FiMenu /></a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    if (rights === "user") {
        return user()
    } else if (rights === "admin") {

        return admin()
    } else {
        return login()
    }


}
export default Navber
