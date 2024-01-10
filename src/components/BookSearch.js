"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToFavs } from "@/app/redux/slices/cartSlice";

function BookSearch() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("javascript");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.itbook.store/1.0/search/${searchText}/${currentPage}`
        );
        const data = await response.json();
        setSearchResults(data.books);
        setTotalPages(Math.ceil(data.total / 5));
      } catch (error) {
        console.error("Hiba történt:", error);
      }
    };
    fetchData();
  }, [searchText, currentPage]);

  const handleAdd = (product) => {
    alert(product.title + " added to favourites");
    dispatch(addToFavs(product));
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  return (
    <>
      <div className="w-full bg-white px-8 md:px-28 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-4xl font-bold text-[#58370D] ">
            FIND YOUR BOOKS
          </h1>
          <div class="flex items-center p-2 w-[40%] bg-white border border-[#58370D] rounded-xl">
            <svg
              width="25px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  fill="#58370D"
                ></path>
              </g>
            </svg>

            <input
              id="nameSearch"
              type="text"
              class="cursor-pointer w-full  text-gray-600 focus:outline-none "
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex overflow-x-auto ">
          {searchResults.slice(0, 5).map((book, index) => (
            <div
              onClick={() => handleAdd(book)}
              key={index}
              className="flex-shrink-0 flex flex-col items-center w-1/2 md:w-1/5 rounded-lg cursor-pointer"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[350px] mb-4 rounded-t-lg z-1"
              />
              <div className=" w-14 h-14 -mt-20 bg-[#FF9606] rounded-full p-1 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {"$" + Math.round(parseFloat(book.price.replace("$", "")))}
                </span>
              </div>
              <h3 className="text-lg text-black font-semibold">{book.title}</h3>
              <p className="text-gray-500">{book.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center gap-2 mt-6">
          <svg
            className="cursor-pointer"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            width="34px"
            height="34px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#58270d"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M7.68473 7.33186C8.07526 6.94134 8.07526 6.30817 7.68473 5.91765C7.29421 5.52712 6.66105 5.52712 6.27052 5.91765L1.60492 10.5832C0.823873 11.3643 0.823872 12.6306 1.60492 13.4117L6.27336 18.0801C6.66388 18.4706 7.29705 18.4706 7.68757 18.0801C8.0781 17.6896 8.0781 17.0564 7.68757 16.6659L4.02154 12.9998L22 12.9998C22.5523 12.9998 23 12.5521 23 11.9998C23 11.4476 22.5523 10.9998 22 10.9998L4.01675 10.9998L7.68473 7.33186Z"
                fill="#58370D"
              ></path>{" "}
            </g>
          </svg>

          <span className="text-[#58370D] text-2xl">{` ${currentPage} / ${totalPages}`}</span>
          <svg
            className="cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
            width="34px"
            height="34px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#58370D"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z"
                fill="#58370D"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
      <div className="w-ful p-4 bg-[#FF9606]"></div>
    </>
  );
}

export default BookSearch;
