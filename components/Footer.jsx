import styles from "styles/Footer.module.css";
import Link from "next/link";
import { Favorite } from "@material-ui/icons";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={"container " + styles.layout}>
        <Link href="/">
          <a className={styles.logo}>Eventhut</a>
        </Link>
        <div className={styles.navContainer}>
          <Link href="/login">
            <a className={styles.navLinks}>Login</a>
          </Link>
          <a
            href="https://www.linkedin.com/in/taran-arora/"
            className={styles.navLinks}
          >
            Contact
          </a>
          <a
            href="https://github.com/itstaranarora"
            className={styles.navLinks}
          >
            Github
          </a>
        </div>
        <span className={styles.credit}>
          Built with <Favorite style={{ margin: "0 10px" }} /> by Taran Arora
        </span>
      </div>
    </div>
  );
}

export default Footer;
