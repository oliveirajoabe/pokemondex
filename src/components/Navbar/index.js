import styles from './styles.module.scss';
import Link from 'next/link';

function Header (){
    return (
        <div className={styles.header}>
            <div>
                <a href="/">
                    <img width="110" height="50" src="/logo.png" alt="fonte-de-pokemon" border="0"/>
                </a>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;