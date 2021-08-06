import styles from '../styles/Home.module.css';
import Course from '../components/course'
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
/* import { useHistory } from 'react-router-dom'; */
import { atom, useRecoilState } from 'recoil'

function Home() {

    /* const history = useHistory(); */
    const [searctext, setSearctext] = useState('')
    const [itemcourse, setitemcourse] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://34.66.210.189/course",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            setitemcourse(res.data.cos)
        })
    }, [])
    const CourseElement = itemcourse.filtersearch = itemcourse.filter((course) => {
        return course.name.includes(searctext);
    }).map((couse, index) => {
        return <Course key={index} couses={couse} />
    })

    return (
        <div className={styles.bg_select}>
            <div className={styles.contend_select}>
                <div className={styles.search_input}>
                    <input
                        type="text"
                        placeholder="ค้นหาคอร์ส"
                        value={searctext}
                        onChange={(e) => { setSearctext(e.target.value) }}
                    />
                    <a><AiOutlineSearch /></a>
                </div>
                <div className={styles.borderr}></div>
                <div className={styles.grid}>
                    {CourseElement}
                </div>
            </div>

        </div>
    )
}
export default Home;