import styles from "./ChipBar.module.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  exploreOutline,
  previous as prevIcon,
  next as nextIcon,
} from "../../icons";

const ChipBar = ({ locales, activeId, subCatClickHandler }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (dir) => {
    if (dir === "left" && scrollLeft < contentWidth - containerWidth) {
      scrollLeft + 120 > contentWidth - containerWidth
        ? setScrollLeft(contentWidth - containerWidth)
        : setScrollLeft(scrollLeft + 120);
    } else if (dir === "right" && scrollLeft >= 0) {
      scrollLeft - 120 < 0 ? setScrollLeft(0) : setScrollLeft(scrollLeft - 120);
    }
  };

  useEffect(() => {
    const setWidth = () => {
      setContainerWidth(containerRef.current.offsetWidth);
      setContentWidth(contentRef.current.offsetWidth);
    };

    window.addEventListener("load", setWidth);
    window.addEventListener("resize", setWidth);

    return () => {
      window.removeEventListener("load", setWidth);
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
    setContentWidth(contentRef.current.offsetWidth);
  }, [locales]);

  useEffect(() => {
    containerRef.current.scrollLeft = scrollLeft;
  }, [scrollLeft, containerWidth, contentWidth]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} ref={containerRef}>
        <ul className={styles.list} ref={contentRef}>
          <li
            className={classNames(styles.item, activeId ? "" : styles.active)}
            onClick={() => subCatClickHandler(null)}
          >
            <IonLabel className={styles.label}>All</IonLabel>
          </li>
          {locales.map((t, i) => (
            <li
              key={i}
              className={classNames(
                styles.item,
                // t.mobile ? styles.mobile : t.active ? styles.active : ""
                t.id == activeId ? styles.active : ""
              )}
              onClick={() => subCatClickHandler(t.id)}
            >
              {/* {t.icon && (
                <IonIcon icon={t.icon} slot="start" className={styles.icon} />
              )} */}
              <IonLabel className={styles.label}>{t.attributes.name}</IonLabel>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={classNames(
          styles.btn,
          styles.left,
          containerWidth < contentWidth && scrollLeft > 0 ? styles.show : ""
        )}
      >
        <button
          className={styles.btn_icon} //
          onClick={() => handleScroll("right")}
        >
          <IonIcon
            icon={prevIcon} //
            slot="start"
            className={styles.icon}
          />
        </button>
      </div>
      <div
        className={classNames(
          styles.btn,
          styles.right,
          containerWidth < contentWidth &&
            scrollLeft < contentWidth - containerWidth
            ? styles.show
            : ""
        )}
      >
        <button
          className={styles.btn_icon} //
          onClick={() => handleScroll("left")}
        >
          <IonIcon
            icon={nextIcon} //
            slot="start"
            className={styles.icon}
          />
        </button>
      </div>
    </div>
  );
};

export default ChipBar;
