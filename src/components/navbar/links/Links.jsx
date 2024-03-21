"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];
const Links = ({ session }) => {
  // gets session as a prop because this component is 'use client'
  // we moved session to the parent component, navbar.jsx
  const [open, setOpen] = useState(false);

  const isAdmin = true;
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink key={link.title} item={link} />
        ))}
        {session?.user ? ( // checks if the user is logged in
          <>
            {session.user?.isAdmin && ( // checks if the user is an admin
              <NavLink item={{ title: "Admin", path: "./admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "./login" }} />
        )}
      </div>

      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt="menu"
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && ( // checks if the menu is open
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink key={link.title} item={link} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
