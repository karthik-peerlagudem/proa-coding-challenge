import styles from './index.module.css';

/**
 * Header Component
 *
 * @component
 * @description Renders the application header with title "Proa Solar Farm Map"
 *
 */
export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles['header-container']}>
                <h1 className={styles['header-title']}>Proa Solar Farm Map</h1>
            </div>
        </header>
    );
};
