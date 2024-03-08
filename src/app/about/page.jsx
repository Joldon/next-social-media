import Image from "next/image";
import styles from "./about.module.css";

const AboutPage = () => {
  return (
    <div>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/20509971/pexels-photo-20509971/free-photo-of-a-reflection-from-the-courtyard-of-zinciriye-medrese.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
          fill
        />
      </div>
    </div>
  );
};

export default AboutPage;
