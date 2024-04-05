import React from "react";
import Link from "next/link";
import joystick from "../../img/joystick.png";
import create from "../../img/create.png";
import arrow from "../../img/return.svg";
import refreshLogo from "../../img/refresh1.png";
import fav from "../../img/fav.svg";
import "../../app/css/nav.css";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gameApi } from "@/lib/services/gameApi";
import { setAllPage } from "@/lib/features/pageSlice";
import { setFilter } from "@/lib/features/filterSlice";
import { useAppDispatch } from "@/lib/hooks";
import { setLoad } from "@/lib/features/loadSlice";
export default function Nav() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  function handleClik() {
    router.back();
  }
  const handleRefresh = async function () {
    dispatch(setLoad(true));
    const fetch = gameApi.endpoints.getGames.initiate(null, {
      subscribe: true,
    });
    const games = await dispatch(fetch);
    dispatch(setAllPage(games.data));
    dispatch(setFilter(games.data));
    dispatch(setLoad(false));
  };
  const handleRedirect = () => {
    redirect;
  };
  return (
    <div className="div-nav">
      <button type={"button"} onClick={handleClik} className="back">
        <div className="nav-center">
          <span className="title-botton">Back</span>
          <Image src={arrow} alt="arrow back" className="logo" />
        </div>
      </button>
      <button className="back" onClick={handleRefresh}>
        <div className="nav-center">
          <span className="title-botton">Refresh</span>
          <Image src={refreshLogo} alt="Logo refresh" className="logo" />
        </div>
      </button>
      <Link
        style={{ textDecoration: "none", color: "#aec3b0" }}
        href={"/home"}
        className={`link ${pathname === "/" ? "active" : ""}`}
      >
        <div className="nav-center">
          <span className="title">Game Load</span>
          <Image src={joystick} alt="Logo" className="logo" />
        </div>
      </Link>

      <Link
        style={{ textDecoration: "none", color: "#aec3b0" }}
        href={"/create"}
        className={`link ${pathname === "/" ? "active" : ""}`}
      >
        <div className="nav-center">
          <span className="title"> Create Game</span>
          <Image src={create} alt="Logo create" className="logo" />
        </div>
      </Link>
    </div>
  );
}
