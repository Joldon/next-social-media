import styles from "./postCard.module.css";
import Image from "next/image";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            src="https://images.pexels.com/photos/20451936/pexels-photo-20451936/free-photo-of-nazare.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            // src="https://images.pexels.com/photos/20412064/pexels-photo-20412064/free-photo-of-portofino.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className={styles.img}
          />
        </div>
        <span className={styles.date}>01.03.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          labore, fuga repellat cumque eligendi aperiam quod expedita, quia
          obcaecati numquam autem blanditiis harum at. Eaque esse cumque
          deserunt doloribus provident dignissimos placeat aperiam corporis ab.
        </p>
        <Link className={styles.link} href="/blog/post">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
