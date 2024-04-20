import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TypeAD.css";
import DataTable, { defaultThemes } from "react-data-table-component";
import { VscError } from "react-icons/vsc";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDeleteForever, MdEdit, MdOutlineNotes } from "react-icons/md";
import TypeAddAD from "./TypeAddAD";
import TypeEditAD from "./TypeEditAD";

const TypeAD = () => {
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
      name: "ID",
      cell: (row) => row.typeid,
      selector: (row) => row.typeid,
      maxWidth: "100px",
    },
    {
      name: "Tên Thể Loại",
      cell: (row) => row.typename,
      selector: (row) => row.typename,
      sortable: true,
    },
    {
      name: "URL",
      cell: (row) => (
        <a
          href={`the-loai/${row.typeurl}`}
          className="hover:text-blue-500 underline"
        >
          {process.env.REACT_APP_WEB_URL}/the-loai/{row.typeurl}
        </a>
      ),
      selector: (row) => row.typeurl,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="pl-[10px] py-[5px]">
          <button
            onClick={() => handleDelete(row.typeid)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 flex items-center rounded mr-1"
          >
            <MdDeleteForever className="mr-1" />
            Delete
          </button>
          <button
            onClick={() => handleEdit(row.typeid)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 flex items-center rounded mt-1"
          >
            <MdEdit className="mr-1" />
            Edit
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
        `${process.env.REACT_APP_API_URL}/api/admin/type`
      );
      setData(response.data.types);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleAdd = async (e) => {
    setSelectedData(true);
    setSelected(2);
  };

  const handleDelete = async (typeid) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa thể loại này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/admin/type/${typeid}`
        );
        fetchData(); // Sau khi xóa, gọi lại fetchData để cập nhật danh sách phim
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  const handleEdit = async (typeid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/type/${typeid}`
      );
      setSelectedData(response.data.types);
      setSelected(3);
    } catch (error) {
      console.error("Error getting category details: ", error);
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
      const typename = item.typename
        ? item.typename.toLowerCase()
        : "";
      const typeurl = item.typeurl
        ? item.typeurl.toLowerCase()
        : "";
      return (
        typename.includes(searchTerm.toLowerCase()) ||
        typeurl.includes(searchTerm.toLowerCase())
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
          title="Danh Sách Thể Loại"
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
                  placeholder="Tìm kiếm thể loại..."
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
          {selected == 2 && selectedData && (
            <TypeAddAD handleCloseSelected={handleCloseSelected} />
          )}
          {selected == 3 &&
            selectedData &&
            selectedData.map((type) => (
              <TypeEditAD
                key={type.typeid}
                type={type}
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

export default TypeAD;
