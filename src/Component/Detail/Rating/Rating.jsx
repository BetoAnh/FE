import React, { useState, useEffect } from "react";
import "./Rating.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Rating = (props) => {
  const { movieId } = props;
  const [refreshCount, setRefreshCount] = useState(0);
  const [ratingValue, setRatingValue] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const navigate = useNavigate();
  const movieid = parseInt(movieId);
  const danhgiaroi = () => {
    toast.error("Bạn đã đánh giá rồi. Đừng spam nữa!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const danhgiathanhcong = () => {
    toast.success("Cảm ơn bạn đã đánh giá phim!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rating/${movieid}`)
      .then(function (response) {
        console.log(response.data);
        setRatingData(response.data.ratings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [refreshCount, movieid]);

  const handleRatingChange = async (event) => {
    const storedToken = Cookies.get("token");
    const value = event.target.value;
    setRatingValue(value);
    try {
      if (storedToken) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/rating`,
          {
            movieid: movieid,
            value: value,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (response.status === 201) {
          danhgiaroi();
        } else if (response.status === 200) {
          danhgiathanhcong();
          setRefreshCount(refreshCount + 1);
        }
      } else {
        Swal.fire({
          title: "Bạn phải đăng nhập trước khi đánh giá phim!",
          icon: "warning",
          showCancelButton: true, // Hiển thị nút "Cancel"
          confirmButtonText: "OK",
          cancelButtonText: "Cancel", // Đặt văn bản cho nút "Cancel"
        }).then((result) => {
          if (result.isConfirmed) {
            window.scrollTo(0, 0);
            navigate("/Login");
          }
        });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
    }
  };

  const averageRating =
    ratingData.length > 0 ? Math.floor(ratingData[0].average_rating) : null;
  return (
    <div className="relative flex flex-col">
      <div class="star-rating">
        <div class="stars">
          <label class="number">
            <input
              type="radio"
              name="rating"
              value="0"
              // onClick={handleRatingChange}
              checked={
                // ratingValue === "0" ||
                // (ratingValue === null && averageRating === 0)
                averageRating === 0
              }
            />
          </label>
          <label class="star">
            <input
              type="radio"
              name="rating"
              value="1"
              onClick={handleRatingChange}
              checked={
                // ratingValue === "1" ||
                // (ratingValue === null && averageRating === 1)
                averageRating === 1
              }
            />
          </label>
          <label class="star">
            <input
              type="radio"
              name="rating"
              value="2"
              onClick={handleRatingChange}
              checked={
                // ratingValue === "2" ||
                // (ratingValue === null && averageRating === 2)
                averageRating === 2
              }
            />
          </label>
          <label class="star">
            <input
              type="radio"
              name="rating"
              value="3"
              onClick={handleRatingChange}
              checked={
                // ratingValue === "3" ||
                // (ratingValue === null && averageRating === 3)
                averageRating === 3
              }
            />
          </label>
          <label class="star">
            <input
              type="radio"
              name="rating"
              value="4"
              onClick={handleRatingChange}
              checked={
                // ratingValue === "4" ||
                // (ratingValue === null && averageRating === 4)
                averageRating === 4
              }
            />
          </label>
          <label class="star">
            <input
              type="radio"
              name="rating"
              value="5"
              onClick={handleRatingChange}
              checked={
                // ratingValue === "5" ||
                // (ratingValue === null && averageRating === 5)
                averageRating === 5
              }
            />
          </label>
          <div class="number-rating"></div>
        </div>
      </div>
      {ratingData &&
        ratingData.map((rating) => (
          <div className="text-white font-semibold">
            ( {rating.average_rating}/5 từ {rating.review_count} thành viên )
          </div>
        ))}
      <div class="text-rating"></div>
      <ToastContainer />
    </div>
  );
};

export default Rating;
