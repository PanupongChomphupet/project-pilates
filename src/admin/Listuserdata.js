import styles from '../styles/Listuserdata.module.css'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'

function Listuserdata() {
    const [user, setuser] = useState([])
    const [bill, setbill] = useState([])
    const [list, setlist] = useState([])
    const history = useHistory()

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

    function userdata() {
        axios({
            method: "GET",
            url: "http://34.66.210.189/userdata",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            setuser(res.data.user)
            let arr = []
            res.data.user.forEach((item, index) => {
                item.Bill.forEach((itembill, index) => {
                    arr.push(itembill)
                })
                if (index == res.data.user.length - 1) setbill(arr)
            })
        })

    }

    useEffect(() => {
        userdata()
        checkstatus()
    }, [])

    useEffect(() => {
        if (user.length > 0) {
            let arr = [];
            user.forEach((item, index) => {
                if (item.Bill.length > 0) {
                    item.Bill.forEach(item2 => {
                        arr.push({
                            _id: item._id,
                            name: item.name,
                            email: item.email,
                            Bill: item2
                        });
                    })
                }
                if (index == user.length - 1) {
                    arr.sort((a, b) => (a.Bill.date > b.Bill.date) ? 1 : ((b.Bill.date > a.Bill.date) ? -1 : 0))
                    arr.sort((a, b) => (a.Bill.time > b.Bill.time && a.Bill.date == b.Bill.date) ? 1 : (a.Bill.time < b.Bill.time && a.Bill.date == b.Bill.date ? -1 : 0))
                    arr.reverse();
                    setlist(arr)
                }
            })
        }
    }, [user.length])

    return (
        <div className={styles.bg}>
            <div className={styles.hearder}>
                <h2 className={styles.title}>รายการสังซื้อ</h2>
                <div className={styles.border}></div>
            </div>
            <div className={styles.content}>
                {list.filter(e => !e.Bill.approve).map((item, index) =>
                    <div key={index}>
                        <div className={styles.user}>
                            <div key={index} onClick={() => { history.push(`/datauser/${item._id}/${item.Bill.Id}`) }} className={styles.bill}>
                                <span>{item.Bill.date}/{item.Bill.time}</span><br />
                                <p>{item.name}</p>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Listuserdata;