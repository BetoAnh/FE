import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonateAD.css";
import DataTable, { defaultThemes } from "react-data-table-component";
import { VscError } from "react-icons/vsc";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDeleteForever, MdEdit, MdOutlineNotes } from "react-icons/md";
import DonateHistoryAD from "./DonateHistoryAD";
import DonateAddAD from "./DonateAddAD";
import DonateEditAD from "./DonateEditAD";

const DonateAD = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selected, setSelected] = useState(0);
  const [showProgressPending, setShowProgressPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);

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
      name: "Ảnh",
      cell: (row) => (
        <img src={`../../img/${row.img}`} alt="?" className="w-[100px]" />
      ),
      maxWidth: "100px",
    },
    {
      name: "Tên Donate",
      cell: (row) => row.donatename,
      selector: (row) => row.donatename,
      sortable: true,
    },
    {
      name: "Giá",
      cell: (row) => <>{row.price} $</>,
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Mô tả",
      cell: (row) => row.description,
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="pl-[10px]">
          <button
            onClick={() => handleDelete(row.donateid)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 flex items-center rounded mr-1"
          >
            <MdDeleteForever className="mr-1" />
            Delete
          </button>
          <button
            onClick={() => handleEdit(row.donateid)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 flex items-center rounded mt-1"
          >
            <MdEdit className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleHistory(row.donateid)}
            className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 flex items-center rounded mt-1"
          >
            <MdOutlineNotes className="mr-1" />
            History
          </button>
        </div>
      ),
      minWidth: "120px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/donate`
      );
      setData(response.data.donates);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleAdd = async (e) => {
    setSelectedData(true);
    setSelected(2);
  };

  const handleDelete = async (donateid) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa donate này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/admin/donate/${donateid}`
        );
        fetchData(); // Sau khi xóa, gọi lại fetchData để cập nhật danh sách phim
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  const handleEdit = async (donateid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/donate/${donateid}`
      );
      setSelectedData(response.data.donates);
      setSelected(3);
    } catch (error) {
      console.error("Error getting movie details: ", error);
    }
  };

  const handleHistory = async (donateid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/donate/${donateid}`
      );
      setSelectedData(response.data.donates);
      setSelected(1);
    } catch (error) {
      console.error("Error getting movie details: ", error);
    }
  };

  const handleCloseSelected = () => {
    setSelected(0);
    setSelectedData(null);
    fetchData();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgressPending(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      const donatename = item.donatename ? item.donatename.toLowerCase() : "";
      const description = item.description
        ? item.description.toLowerCase()
        : "";
      const price = item.price ? item.price.toString() : "";
      return (
        donatename.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase()) ||
        price.includes(searchTerm.toLowerCase())
      );
    });
    setFilter(result);
  }, [searchTerm, data]);

  const clearSearch = () => {
    setSearchTerm("");
  };
  return (
    <div className="bg-white text-black p-5 w-full">
      <div className="react-data-table-component">
        <DataTable
          title="Danh Sách Donate"
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
            <div className="flex flex-row justify-between items-center w-full">
              <div className="">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded flex items-center "
                  onClick={handleAdd}
                >
                  <RiAddCircleLine className="mr-1" />
                  Add
                </button>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm donate..."
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
          }
        />
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center thanhbar ${
          selectedData ? "block" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative bg-transparent">
          {selected == 1 &&
            selectedData &&
            selectedData.map((donate) => (
              <DonateHistoryAD key={donate.donateid} donate={donate} />
            ))}
          {selected == 2 && selectedData && (
            <DonateAddAD handleCloseSelected={handleCloseSelected} />
          )}
          {selected == 3 &&
            selectedData &&
            selectedData.map((donate) => (
              <DonateEditAD
                key={donate.donateid}
                donate={donate}
                handleCloseSelected={handleCloseSelected}
              />
            ))}
          <button
            className="absolute top-0 -right-10 text-[35px] z-20 text-white rounded hover:text-orange-600"
            onClick={handleCloseSelected}
          >
            <VscError />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateAD;
