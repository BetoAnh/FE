import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "axios";

const DonateHistoryAD = ({ donate }) => {
  const [data, setData] = useState([]);
  const [showProgressPending, setShowProgressPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/donate/history/${donate.donateid}`
      );
      setData(response.data.donates);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const customStyles = {
    header: {
      style: {
        padding: "0px",
        minHeight: "56px",
        fontSize: "35px",
      },
    },
    subHeader: {
      style: {
        padding: "0px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };
  const columns = [
    {
      name: "Người dùng",
      cell: (row) => row.username,
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Ngày",
      cell: (row) => {
        const date = new Date(row.date);
        const isoDateString = date.toISOString().split('T')[0]; // Lấy phần ngày từ chuỗi ISO
        return isoDateString;
      },
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Giờ",
      cell: (row) => {
        const date = new Date(row.date);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      },
      selector: (row) => row.date,
      sortable: true,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgressPending(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      const username = item.username ? item.username.toLowerCase() : "";
      const date = item.date ? item.date.toLowerCase() : "";
      return (
        username.includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm.toLowerCase())
      );
    });
    setFilter(result);
  }, [searchTerm, data]);

  const clearSearch = () => {
    setSearchTerm("");
  };
  return (
    <div
      className="relative h-[650px] font-semibold capitalize bg-white p-4 z-20 w-[850px] rounded text-black overflow-y-auto"
      key={donate.donateid}
    >
      <DataTable
        title="Lịch Sử Donate"
        columns={columns}
        data={filter}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
        className="border-x-[1px]"
        progressPending={showProgressPending}
        subHeader
        subHeaderComponent={
          <div className="flex flex-row w-full my-4">
            <div className="flex flex-row w-full">
              <img
                src={`../../img/${donate.img}`}
                className="w-[100px] rounded mr-2"
              />
              <div className="font-semibold text-left flex flex-col justify-between">
                <div>
                <p className="font-bold text-[20px] mb-1">{donate.donatename}</p>
                <p className="text-[15px]">{donate.description}</p>
                </div>
                <p className="text-[20px]">Giá: <span className="text-red-500">{donate.price}</span>$</p>
              </div>
            </div>
            <div className="flex flex-row justify-end items-end w-full">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 px-4 border border-gray-300 rounded mr-2"
                />
                <button
                  onClick={clearSearch}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DonateHistoryAD;
