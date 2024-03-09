import Image from "next/image";
import styles from "./about.module.css";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          dolorem!
        </h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          blanditiis labore non voluptatem reiciendis necessitatibus sunt, nisi
          odio fugiat accusantium maiores harum enim optio distinctio.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of expreience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of expreience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of expreience</p>
          </div>
        </div>
      </div>

      <div className={styles.imgContainer}>
        <Image className={styles.img} src="/about.png" alt="About" fill />
      </div>
    </div>
  );
};

export default AboutPage;
