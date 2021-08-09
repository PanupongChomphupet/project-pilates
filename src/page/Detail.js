import styles from '../styles/Detail.module.css'
import axios from 'axios'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
/* import { useParams } from 'react-router-dom'; */
import { atom, useRecoilState } from 'recoil'
import Course from '../components/course'
import swal from 'sweetalert'

const namecouse = atom({
    key: "couse",
    default: []
})

const velState = atom({
    key: "vel",
    default: []
})

const idcouse = atom({
    key: "idcouse",
    default: []
})

function Detail() {
    const history = useHistory()
    const id = useParams().id;
    const token = localStorage.getItem("token");
    const [name, setname] = useRecoilState(namecouse)
    const [vel, setvel] = useRecoilState(velState)
    const [idcouseone, setidcouse] = useRecoilState(idcouse)
    const [bill, setbill] = useState([])
    const [levels, setLevel] = useState([])
    const [checklevel, setchecklevel] = useState([])
    const [course, setcourse] = useState([]);
    const [thiscourse, setthiscourse] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://34.66.210.189/detail/${id}`
        }).then(res => {
            setcourse(res.data.cours);
            setLevel(res.data.level);
        })
    }, [])

    useEffect(() => {
        if (token) {
            axios({
                method: "post",
                url: 'http://34.66.210.189/billlevel',
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({ token })
            }).then(res => {
                setchecklevel(res.data.Mycouse)
            })
        }
    }, [])


    function checkdata() {
        if (vel.length > 0) {
            history.push(`/shop`)
        } else {
            swal({
                icon: "warning",
                title: "กรุณาเลือกคอร์ส"
            })
        }
    }
    useEffect(() => {
        setvel([])
    }, [])

    useEffect(() => {
        if (course.level && checklevel && thiscourse.length == 0) {
            if (course.level.length > 0 && checklevel.length > 0) {
                setthiscourse(checklevel.filter(e => e.namecouse == course.name && e.approve))

            }
        }
    }, [course, checklevel, thiscourse])

    function buy(level, name, price) {
        setname(course.name)
        setidcouse(id)
        let approve = false;
        let data = document.getElementById(level).innerHTML;
        if (data === "เพิ่ม") {
            document.getElementById(level).innerHTML = "ลบ";
            setvel([...vel, {
                level, name, price, approve
            }])
        } else if (data === "ลบ") {
            document.getElementById(level).innerHTML = "เพิ่ม";
            setvel(vel.filter(item => item.level != level))
        }
    }
    return (
        <div>
            <div className={styles.content}>
                <h1 className={styles.title}>{course.name}</h1>
                <div className={styles.border} />
                <div className={styles.select_level}>
                    <h4 className={styles.titlelevel}>เลือกเลเวล</h4>
                    {(course.level && thiscourse.length > 0) ? course.level.filter(e => !thiscourse[0].level.some(l => l.level == e.level)).length == 0 ?
                        <div className={styles.texta}>ซื่อคอร์สหมดแล้ว</div> : course.level.filter(e => !thiscourse[0].level.some(l => l.level == e.level)).map((item, index) => {
                            return (
                                <div className={styles.contentlevel} key={index}>
                                    <div className={styles.kob}>
                                        <p className={styles.textlevel}>เลเวล {item.level} : {item.name} </p>
                                    </div>
                                    <div className={styles.btndata}>
                                        <p className={styles.price}>{item.price}&nbsp;บาท</p>
                                        <button onClick={() => { buy(item.level, item.name, item.price) }} className={styles.btn_add}><label id={item.level}>เพิ่ม</label></button>
                                        <button onClick={() => (history.push(`/Preview/${course.name}/${item.level}`))}>ดูตัวอย่างวิดิโอ</button><br />

                                    </div>
                                </div>
                            )
                        }) : course.level ? course.level.map((item, index) => {
                            return (
                                <div key={index} className={styles.contentlevel}>
                                    <div className={styles.kob}>
                                        <p className={styles.textlevel}>เลเวล {item.level} : {item.name} </p>
                                    </div>
                                    <div className={styles.btndata}>
                                        <p className={styles.price}>{item.price}&nbsp;บาท</p>
                                        <button onClick={() => { buy(item.level, item.name, item.price) }} className={styles.btn_add}><label id={item.level}>เพิ่ม</label></button>
                                        <button onClick={() => (history.push(`/Preview/${course.name}/${item.level}`))}>ดูตัวอย่างวิดิโอ</button><br />

                                    </div>
                                </div>
                            )
                        }) : null
                    }


                </div>
                <div className={styles.detail}>
                    <h4 className={styles.titles}>รายละเอียด</h4>
                    <p className={styles.details}>{course.detail}</p>
                </div>
                <button onClick={checkdata} className={styles.btn}><p><RiShoppingBasketLine /></p></button>
            </div>
        </div>
    )
}
export default Detail;
