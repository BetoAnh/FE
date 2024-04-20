import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieAD.css";
import DataTable, { defaultThemes } from "react-data-table-component";
import { VscError } from "react-icons/vsc";
import MovieDetailAD from "./MoiveDetailAD";
import MovieAddAD from "./MoiveAddAD";
import MovieEditAD from "./MoiveEditAD";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDeleteForever, MdEdit,MdOutlineNotes } from "react-icons/md";
import VideoList from "./VideoAD/VideoList";

const MovieAD = () => {
  const [data, setData] = useState([]);
  const [typedata, settypeData] = useState([]);
  const [categorydata, setcategoryData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
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
      name: "Poster",
      cell: (row) => (
        <img
          src={`${process.env.REACT_APP_API_URL}/upload/poster/${row.poster}`}
          alt="?"
          className="w-[100px]"
        />
      ),
      maxWidth: "100px",
    },
    {
      name: "Tên Phim",
      cell: (row) => row.moviename,
      selector: (row) => row.moviename,
      sortable: true,
      maxWidth: "270px",
    },
    {
      name: "Tên Khác",
      cell: (row) => row.moviesubname,
      selector: (row) => row.moviesubname,
      sortable: true,
      maxWidth: "270px",
    },
    {
      name: "Năm",
      cell: (row) => row.release_year,
      selector: (row) => row.release_year,
      sortable: true,
      maxWidth: "5px",
    },
    {
      name: "Lượt Xem",
      selector: (row) => row.views,
      cell: (row) => row.views,
      sortable: true,
      maxWidth: "5px",
    },
    {
      name:"Tập Phim",
      cell: (row) => (<VideoList movieid={row.movieid} />),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="pl-[10px]">
          <button
            onClick={() => handleDelete(row.movieid)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 flex items-center rounded mr-1"
          >
            <MdDeleteForever className="mr-1"/>Delete
          </button>
          <button
            onClick={() => handleEdit(row.movieid)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 flex items-center rounded mt-1"
          >
            <MdEdit className="mr-1"/>Edit
          </button>
          <button
            onClick={() => handleDetail(row.movieid)}
            className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 flex items-center rounded mt-1"
          >
            <MdOutlineNotes className="mr-1"/>Detail
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/movie`);
      setData(response.data.movies);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleAdd = async (e) => {
    setSelectedMovie(true);
    setSelected(2);
  };

  const handleDelete = async (movieId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/movie/${movieId}`);
        fetchData(); // Sau khi xóa, gọi lại fetchData để cập nhật danh sách phim
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  const handleEdit = async (movieid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/phim/${movieid}`
      );
      setSelectedMovie(response.data.movies);
      settypeData(response.data.types);
      setcategoryData(response.data.categories);
      setSelected(3);
    } catch (error) {
      console.error("Error getting movie details: ", error);
    }
  };

  const handleDetail = async (movieid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/phim/${movieid}`
      );
      setSelectedMovie(response.data.movies);
      settypeData(response.data.types);
      setcategoryData(response.data.categories);
      setSelected(1);
    } catch (error) {
      console.error("Error getting movie details: ", error);
    }
  };

  const handleCloseSelected = () => {
    setSelected(0);
    setSelectedMovie(null);
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
      const movieName = item.moviename ? item.moviename.toLowerCase() : "";
      const movieSubName = item.moviesubname
        ? item.moviesubname.toLowerCase()
        : "";
      const releaseYear = item.release_year ? item.release_year.toString() : "";
      return (
        movieName.includes(searchTerm.toLowerCase()) ||
        movieSubName.includes(searchTerm.toLowerCase()) ||
        releaseYear.includes(searchTerm.toLowerCase())
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
          title="Danh Sách Phim"
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
                  <RiAddCircleLine className="mr-1"/>Add
                </button>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm phim..."
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
          selectedMovie ? "block" : "hidden"
        }`}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative bg-transparent">
          {selected == 1 &&
            selectedMovie &&
            selectedMovie.map((movie) => (
              <MovieDetailAD
                key={movie.movieid}
                movie={movie}
                typedata={typedata}
                categorydata={categorydata}
              />
            ))}
          {selected == 2 && selectedMovie && (
            <MovieAddAD handleCloseSelected={handleCloseSelected}/>
          )}
          {selected == 3 &&
            selectedMovie &&
            selectedMovie.map((movie) => (
              <MovieEditAD
                key={movie.movieid}
                movie={movie}
                typedata={typedata}
                categorydata={categorydata}
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

export default MovieAD;
