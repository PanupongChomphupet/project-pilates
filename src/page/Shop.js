import styles from '../styles/Shop.module.css'
import { useHistory } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'

const velState = atom({
    key: "vel",
    default: []
})
const namecouse = atom ({
    key : "couse", 
    default: []
})

function Shop() {
    const history = useHistory()
    
    // vel = levelcouse
    const [vel, setvel] = useRecoilState(velState) 

    // name = namecouse
    const [name, setname] = useRecoilState(namecouse) 

    // num = sumprice
    const [num, setnum] = useState(0)


    useEffect (() => {
        let nums = 0;
        vel.forEach((item, index)=>{

            nums += parseInt(item.price);
            if (index === vel.length-1) setnum(nums)  
        })
    }, []);
    return (
        <div className={styles.bg_shop}>
            <h1 className={styles.title}>รายการทั้งหมด</h1>
            <h2 className={styles.namecouse}>{name}</h2>
            <div className={styles.content}>
                {vel.map((items, index) =>
                    <div key={index} className={styles.level}>
                        <p className={styles.vel}>เลเลว {items.level} : {items.name}</p>
                        <div className = {styles.price}>
                            <p>{items.price} บาท</p>
                        </div>
                    </div>
                )
                }
                <div className = {styles.sumpice}>
                    <h3 className = {styles.sumpicetitle}>ราคารวม</h3>
                    <span> {num} บาท</span>
                </div>
                
            </div>

            <button onClick={() => { history.push(`/payment/${num}`) }} className={styles.btn_shop}>ชื้อเลย</button>
        </div>
    )
}

export default Shop;
