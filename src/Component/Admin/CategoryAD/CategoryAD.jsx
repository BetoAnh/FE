import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryAD.css";
import DataTable, { defaultThemes } from "react-data-table-component";
import { VscError } from "react-icons/vsc";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDeleteForever, MdEdit, MdOutlineNotes } from "react-icons/md";
import CategoryAddAD from "./CategoryAddAD";
import CategoryEditAD from "./CategoryEditAD";

const CategoryAD = () => {
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
      cell: (row) => row.categoryid,
      selector: (row) => row.categoryid,
      maxWidth: "100px",
    },
    {
      name: "Tên Danh Mục",
      cell: (row) => row.categoryname,
      selector: (row) => row.categoryname,
      sortable: true,
    },
    {
      name: "URL",
      cell: (row) => (
        <a
          href={`danh-muc/${row.categoryurl}`}
          className="hover:text-blue-500 underline"
        >
          {process.env.REACT_APP_WEB_URL}/danh-muc/{row.categoryurl}
        </a>
      ),
      selector: (row) => row.categoryurl,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="pl-[10px] py-[5px]">
          <button
            onClick={() => handleDelete(row.categoryid)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 flex items-center rounded mr-1"
          >
            <MdDeleteForever className="mr-1" />
            Delete
          </button>
          <button
            onClick={() => handleEdit(row.categoryid)}
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
        `${process.env.REACT_APP_API_URL}/api/admin/category`
      );
      setData(response.data.categories);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleAdd = async (e) => {
    setSelectedData(true);
    setSelected(2);
  };

  const handleDelete = async (categoryid) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/admin/category/${categoryid}`
        );
        fetchData(); // Sau khi xóa, gọi lại fetchData để cập nhật danh sách phim
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  const handleEdit = async (categoryid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/category/${categoryid}`
      );
      setSelectedData(response.data.categories);
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
      const categoryname = item.categoryname
        ? item.categoryname.toLowerCase()
        : "";
      const categoryurl = item.categoryurl
        ? item.categoryurl.toLowerCase()
        : "";
      return (
        categoryname.includes(searchTerm.toLowerCase()) ||
        categoryurl.includes(searchTerm.toLowerCase())
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
          title="Danh Sách Danh Mục"
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
                  placeholder="Tìm kiếm danh mục..."
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
            <CategoryAddAD handleCloseSelected={handleCloseSelected} />
          )}
          {selected == 3 &&
            selectedData &&
            selectedData.map((category) => (
              <CategoryEditAD
                key={category.categoryid}
                category={category}
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

export default CategoryAD;
