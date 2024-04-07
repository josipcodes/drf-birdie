import React, { useEffect, useState } from "react";
import axios from "axios";
import appStyles from ".././App.module.css";
import Asset from ".././components/Asset";
import { Image } from "react-bootstrap";
import styles from ".././styles/Adds.module.css";

const Add = () => {
  const [advertisements, setAdvertisements] = useState("");
  const [selectedAdd, setSelectedAdd] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // fetching existing Advertisements
    const fetchAdds = async () => {
      try {
        const { data } = await axios.get("/advertisements/");
        setAdvertisements(data);
        setIsLoaded(true)
        // console.log("advertisements", advertisements);
      } catch (err) {
        console.log(err);
      }
    };
    // setIsLoaded(false)
    fetchAdds();
  }, []);

  useEffect(() => {
    if (isLoaded && advertisements.results.length > 0) {
      const randomSelect = Math.floor(Math.random() * advertisements.results.length);
      setSelectedAdd(advertisements.results[randomSelect]);
    }
  }, [advertisements, isLoaded]);

    useEffect(() => {
    console.log(selectedAdd)
  }, [selectedAdd])

  return (
    <div className={`${appStyles.Content}`}>
      {selectedAdd && isLoaded ? (
          <div>
            <Image
              className={styles.AddImage}
              src={selectedAdd?.image}
              alt={selectedAdd?.alt}
            ></Image>
            <p className={`${styles.AddText} text-center mt-5`}>{selectedAdd?.description}</p>
          </div>
        ) : (
          <Asset spinner />
        )}
    </div>
  );
};

export default Add;
