import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import { useFirestore } from '../../hooks/useFirestore';

export default function DiaryForm({ uid }) {


    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const { addDocument, response } = useFirestore('secretDiary');

    const handleData = (event) => {
        if (event.target.id === "diary-title") {
            setTitle(event.target.value);
        } else if (event.target.id === "diary-content") {
            setText(event.target.value);
        }
    }

    useEffect(() => {
        if (response.isSuccess) {
            setTitle('');
            setText('');
        }
    }, [response.isSuccess])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, text);
        addDocument({
            uid, title, text
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="a11y-hidden" htmlFor="diary-title">일기 제목</label>
            <input className="input-style" id="diary-title" type="text" placeholder="제목" required value={title} onChange={handleData} />

            <label className="a11y-hidden" htmlFor="diary-content">일기 내용</label>
            <textarea className={styles["diary-textarea"]} id="diary-content" placeholder="오늘의 비밀은 무엇인가요?" value={text} onChange={handleData}></textarea>

            <button className="black-btn" type="submit">작성하기</button>
        </form>
    )
}