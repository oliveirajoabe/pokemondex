import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.scss';

function ComponentSkeleton() {
    return (
        <>
            <div className={styles.cardContainer}>
                {Array(12).fill().map((item, index)=>(
                    <div className={styles.cardContent} key={index}>    
                        {/* <Skeleton height={195} width={387} /> */}
                        <Skeleton height={195} width={`100%`} />
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <div className={styles.paginationArea}>
                    <Skeleton className={styles.page} height={20} width={20} />
                    
                    <Skeleton className={styles.page} height={20} width={20} />
                </div>
            </div>
        </>
    )
}

export default ComponentSkeleton;