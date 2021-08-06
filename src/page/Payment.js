import styles from '../styles/Pay.module.css'
import { useHistory, useParams } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil'
import axios from 'axios';
import { useEffect, useState } from 'react'
import swal from 'sweetalert'

// levelcouse
const velState = atom({
    key: "vel",
    default: []
})

// cousename
const namecouse = atom({
    key: "couse",
    default: []
})
// sumprice
const sumprice = atom({
    key: "price",
    default: 0
})

const idcouse = atom({
    key: "idcouse",
    default: []
})


function Pay() {
    const history = useHistory()
    const [vel, setvel] = useRecoilState(velState)
    const [name, setname] = useRecoilState(namecouse)
    const [price, setprice] = useRecoilState(sumprice)
    const [idcouseone, setidcouseone] = useRecoilState(idcouse)
    const [num, setnum] = useState(0)
    const [bank, setbank] = useState([])
    const prices = useParams().price;

    useEffect(() => {
        let nums = 0;
        if (vel.length > 0) {
            vel.forEach((item, index) => {
                nums += parseInt(item.price);
                if (index == vel.length - 1) setnum(nums)
            })
        } else {
            setnum(prices)
        }
        axios({
            method: 'GET',
            url: 'http://34.66.210.189/bank',
        }).then(res => {
            setbank(res.data.bank)
        })
    }, []);

    function path() {
        const token = localStorage.getItem("token");
        if ((vel.length > 0)) {
            axios({
                method: "POST",
                url: "http://34.66.210.189/bill-ckeck",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({
                    idcouse: idcouseone,
                    token: token,
                    namecouse: name,
                    level: vel,
                    sumprice: num,

                })
            }).then(res => {
                if (res.data == "สำเร็จ") {
                    swal({
                        icon: "info",
                        title: "กำลังตรวจสอบข้อมูล"
                    })
                    history.push("/home")
                }
            })
        }
        setvel([])
        setname([])
        setprice([])
        setidcouseone([])
        history.push("/dasborad")
    }
    
    return (
        <div className={styles.bg_pay}>
            <div className={styles.content}>
                <h2 className={styles.titletop}>ชำระเงิน</h2>
                <div className={styles}>
                    <p className={styles.title}>โอนเงินไปที่</p>
                    <p className={styles.text}>{bank.account_number}-{bank.name_bank}</p>
                </div><br />
                <div className={styles}>
                    <p className={styles.title}>ชื่อ</p>
                    <p className={styles.text}>{bank.name_account}</p>
                </div><br />
                <div className={styles}>
                    <p className={styles.title}>ส่งสลิปพร้อมชื่อไปที่ Line ID</p>
                    <p className={styles.text} >ID : {bank.Line_id}</p>
                </div><br />
                <div className={styles}>
                    <p className={styles.title}>ชื่อคอร์ส</p>
                    <p className={styles.text} >{name}</p>
                </div><br />
                <div className={styles}>
                    <p className={styles.title}>ราคา</p>
                    <p className={styles.text}>{num} บาท</p>
                </div>
                <button onClick={path} className={styles.btn_pay}>ยืนยัน</button>
            </div>
        </div>
    )
}
export default Pay
