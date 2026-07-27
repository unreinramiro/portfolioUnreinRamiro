import React, {useRef, useState, useEffect} from 'react'
import styles from './AnimatedCard.module.css'

const AnimatedCard = ({ children }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${styles.card} ${visible ? styles.visible : ""}`}
        >
            {children}
        </div>
    )
}

export default AnimatedCard