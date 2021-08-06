import styles from '../styles/Bank.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function Bank() {
    const history = useHistory()
    const [account, setaccount] = useState([])
    const [form, setform] = useState({})
    
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://34.66.210.189/bank",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            setform({
                name_account: res.data.bank.name_account,
                name_bank: res.data.bank.name_bank,
                Line_id: res.data.bank.Line_id,
                account_number: res.data.bank.account_number
            })
        })
        checkstatus()
    }, [])

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

    function save() {
        axios({
            method: "POST",
            url: "http://34.66.210.189/updatebank",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                name_account: form.name_account,
                name_bank: form.name_bank,
                Line_id: form.Line_id,
                account_number: form.account_number,

            })
        }).then(res => {
            if (res.data === "complete") {
                swal({
                    icon: "success",
                    title: "แก้ไขข้อมูลสำเร็จ"
                })
                history.push('/dasboradadmin')
            }
        })
    }

    return (
        <div className={styles.bg}>
            <div className={styles.content}>
                <h2 className={styles.title}>แก้ไขบัญชีธนาคาร</h2>
                <div className={styles.border}></div>
                <div className={styles.inputs}>
                    <label>ชื่อธนาคาร</label><br />
                    <input type="text"
                        value={form.name_bank}
                        onChange={e => setform({ ...form, name_bank: e.target.value })}
                    /><br />
                    <label>ชื่อบัญชี</label><br />
                    <input type="text"
                        value={form.name_account}
                        onChange={e => setform({ ...form, name_account: e.target.value })}
                    /><br />
                    <label>เลขที่บัญชี</label><br />
                    <input type="text"
                        value={form.account_number}
                        onChange={e => setform({ ...form, account_number: e.target.value })}
                    /><br />
                    <label>ID Line</label><br />
                    <input type="text"
                        value={form.Line_id}
                        onChange={e => setform({ ...form, Line_id: e.target.value })}

                    /><br />
                </div>
                <div className={styles.btn}>
                    <button onClick={() => save()} >ยืนยัน</button>
                </div>
            </div>
        </div>
    )
}
export default Bank;