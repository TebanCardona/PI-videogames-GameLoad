"use client";
import background from "../img/preview.gif";
import "../app/css/landing.css";
import Link from "next/link";
import Image from "next/image";
import Home from "./home/page";
function page() {
  return (
    <div className="landing">
      <Image src={background} alt="" className="image-start" />
      <div className="landing-content">
        {" "}
        <h1 className="title-start">Games Load</h1>
        <Link href={"/home"} children={Home}>
          <button type={"button"} className="button-start">
            <span>PLAY NOW</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
