import React, { useEffect, useState } from 'react';
import style from './ScrollToTopButton.module.css';
import { BiArrowToTop } from 'react-icons/bi';

export default function ScrollToTopButton() {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) {  
                setBackToTopButton(true);
            } else {
                setBackToTopButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={style.scrollButton}>
            {backToTopButton && (
                <BiArrowToTop className={style.botaoUp} onClick={scrollUp} />
            )}
        </div>
    );
}
