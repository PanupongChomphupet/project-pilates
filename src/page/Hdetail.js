import styles from '../styles/Hdetail.module.css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil'
import axios from 'axios'

const sumprice = atom({
    key: "price",
    default: 0
})
const namecouse = atom({
    key: "couse",
    default: []
})

function Hdetail() {
    const history = useHistory();
    const [value, setvalue] = useState([])
    const [price, setprice] = useRecoilState(sumprice)
    const [name, setname] = useRecoilState(namecouse)
    const Id = useParams().Id;
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios({
            method: "post",
            url: `http://34.66.210.189/hdetail/${Id}`,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ token })
        }).then(res => {
            setvalue(res.data.Bill)
        })
    }, [])
    
    function path(price, name) {
        setprice(price);
        setname(name)
        history.push(`/payment/${price}`)
    }
    return (

    	 <div className={styles.bg}>
            {value.map((item, index) =>
                <div key={index}>
                    <h2 className={styles.title}>{item.namecouse}</h2>
                    <div className={styles.content}>
                        {item.level.map((item1, index) =>
                            <div key={index} className={styles.detail}>
                                <p className={styles.level}>เลเลว {item1.level} : {item1.name}</p>
                                <div className={styles.price}>
                                    <p>{item1.price} บาท</p>
                                </div>
                            </div>
			)}
                        <p className={styles.sumprice}>ราคารวม <span>{item.sumprice} บาท</span></p>
                    </div>
                    <div className={styles.bg_btn}>
                        <button onClick={() => { path(item.sumprice, item.namecouse) }} className={styles.btn}>ยืนยัน</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Hdetail;
