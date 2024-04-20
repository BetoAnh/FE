import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const DonateHistory = () => {
  const [donates, setDonates] = useState([]);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/history`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setDonates(response.data.history);
        })
        .catch((error) => {
          console.error("Error fetching donate history:", error);
        });
    }
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col flex-1 px-[35px] bg-[#263238] ">
      <div className="flex flex-row flex-1">
        <div className="main flex flex-col flex-1">
          <div className="flex flex-1 flex-row justify-between  text-[25px] text-white ">
            <div className="flex flex-col  ">
              <span>STT</span>
              <div className="flex flex-col text-[15px] justify-center items-center">
                {donates.length > 0 ? (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    donates.map((donate, index) => (
                      <div key={donate.donatehistoryid} className="border-b-[1px] mt-1 border-gray-500 w-full flex justify-center">{index + 1}</div>
                    ))
                  )
                ) : (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>No data</div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col  ">
              <span>Name</span>
              <div className="text-[15px] ">
              {donates.length > 0 ? (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    donates.map((donate, index) => (
                      <div key={donate.donatehistoryid}  className="border-b-[1px] mt-1 border-gray-500 w-full">{donate.donatename}</div>
                    ))
                  )
                ) : (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>No data</div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col ">
              <span>Price</span>
              <div className="text-[15px] ">
              {donates.length > 0 ? (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    donates.map((donate, index) => (
                      <div key={donate.donatehistoryid} className="border-b-[1px] mt-1 border-gray-500 w-full">{donate.price}</div>
                    ))
                  )
                ) : (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>No data</div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col ">
              <span>Mô tả gói</span>
              <div className="text-[15px] ">
              {donates.length > 0 ? (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    donates.map((donate, index) => (
                      <div key={donate.donatehistoryid} className="border-b-[1px] mt-1 border-gray-500 w-full">{donate.description}</div>
                    ))
                  )
                ) : (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>No data</div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span>Thời gian donate</span>
              <div className="text-[15px] ">
              {donates.length > 0 ? (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    donates.map((donate, index) => (
                      <div key={donate.donatehistoryid} className="border-b-[1px] mt-1 border-gray-500 w-full">{donate.date}</div>
                    ))
                  )
                ) : (
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>No data</div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateHistory;
