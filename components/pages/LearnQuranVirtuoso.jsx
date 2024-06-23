import styles from "./Home.module.css";
import classNames from "classnames";
import { UIStore, setPreviewContainer } from "../../store";
import { youtube, constants, server } from "../../lib/config";
import {
  getAllPlaylists2,
  getVideosDataByUrl,
  getYoutubeVideoDetailsByUrl,
  getYoutubeVideoListByUrl,
} from "../../lib/fetch";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import Layout from "../core/Layout";
import VideoCard from "../cards/Video";
import ChipBar from "../ui/ChipBar";
import Loader from "../utils/Loader";
import useOnScreen from "../../hooks/useOnScreen";
import PlayerModal from "./modal/PlayerModal";
import Meta from "../core/Meta";
import { Virtuoso, VirtuosoGrid } from "react-virtuoso";

const getUrl = (pagination) => {
  let page = pagination.page ? pagination.page : 1;
  if (Object.keys(pagination).length !== 0) {
    if (pagination.page < pagination.pageCount) {
      page = page + 1;
    }
  }

  console.log("page: " + page);

  return `https://dbe.alquranarabia.com/api/contents?pagination[page]=${page}&pagination[pageSize]=${constants.DEFAULT_PAGE_LIMIT}&sort[0]=contentPublishedAt:desc&fields[0]=id&fields[1]=ytVideoId&fields[2]=slug&fields[3]=title&fields[4]=contentPublishedAt&filters[sourceType][$eq]=YouTube&filters[dataContentType][$eq]=Quran Learning&filters[status][$eq]=Approved`;
};

const ListComponent = ({ style, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    style={{
      display: "flex",
      flexWrap: "wrap",
      ...style,
    }}
  >
    {children}
  </div>
);

// Set the display name
ListComponent.displayName = "ListComponent";

const LearnQuranVirtuoso = () => {
  const gridComponents = {
    List: forwardRef(ListComponent),

    Item: ({ children, ...props }) => (
      <div
        {...props}
        // style={{
        //   padding: "0.5rem",
        //   width: "25%",
        //   display: "flex",
        //   flex: "none",
        //   alignContent: "stretch",
        //   boxSizing: "border-box",
        // }}
      >
        {children}
      </div>
    ),
  };

  const isMini = UIStore.useState((s) => s.isMiniNav);

  const [data, setData] = useState({
    pagination: {},
    videos: [],
  });

  // fetch video on first load
  useEffect(() => {
    const url = getUrl({});

    const fetchData = async () => {
      const res = await getVideosDataByUrl(url);
      setData({
        pagination: res.meta.pagination,
        videos: res.data,
      });
    };

    fetchData().catch(console.error);
  }, []);

  const loadMore = () => {
    if (data.pagination.page < data.pagination.pageCount) {
      const url = getUrl(data.pagination);

      const fetchData = async () => {
        const res = await getVideosDataByUrl(url);

        const newData = {
          pagination: res.meta.pagination,
          videos: [...data.videos, ...res.data],
        };

        setData(newData);
      };

      fetchData().catch(console.error);
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    setPreviewContainer(containerRef.current);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const [videoDetail, setVideoDetail] = useState({});
  const [videoId, setVideoId] = useState();

  const handleClick = (id) => {
    const url = `${youtube.url}/videos?key=${youtube.key}&part=snippet,statistics&id=${id}`;
    const fetchData = async () => {
      const res = await getYoutubeVideoDetailsByUrl(url);
      setVideoDetail(res);
    };
    fetchData().catch(console.error);
    setVideoId(id);
    openModal();
  };

  return (
    <>
      <Meta
        title="Learn Quran"
        description="Quran.Tube"
        url={server}
        image={`${server}/img/logo/default_share.png`}
        type="website"
      />

      <PlayerModal
        open={modalOpen}
        closer={handleModalClose}
        src={videoId}
        videoDetail={videoDetail}
      />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* <div className={styles.content} ref={containerRef}> */}
          <VirtuosoGrid
            components={gridComponents}
            style={{ width: "100%", height: "100vh" }}
            totalCount={data.videos.length}
            // useWindowScroll
            data={data.videos}
            endReached={loadMore}
            increaseViewportBy={500}
            overscan={8}
            itemClassName={styles.item}
            itemContent={(index, video) => {
              return (
                <VideoCard
                  handleClick={handleClick}
                  attributes={data.videos[index].attributes}
                />
              );
            }}
          />

          {/* <Virtuoso
            style={{ width: "100%", height: "100vh" }}
            // useWindowScroll
            data={data.videos}
            endReached={loadMore}
            // increaseViewportBy={100}
            overscan={10}
            itemContent={(index, video) => {
              return (
                <div className={styles.item} key={index}>
                  <VideoCard
                    handleClick={handleClick}
                    attributes={video.attributes}
                  />
                </div>
              );
            }}
            components={{ Loader }}
          /> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default LearnQuranVirtuoso;
