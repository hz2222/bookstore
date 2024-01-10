"use client";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeFromFavs } from "../redux/slices/cartSlice";

const Favourites = () => {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.cart.books);

  const handleDelete = (title) => {
    dispatch(removeFromFavs(title));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-8 md:px-28">
      <h1 className="text-4xl font-bold text-[rgb(88,55,13)] mb-6">
        Favourites
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-4">
        {books.map((book, index) => (
          <div key={index} className=" flex flex-col items-center rounded-lg">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-[350px] mb-4 rounded-t-lg z-1"
            />
            <div className=" w-14 h-14 -mt-20 bg-[#FF9606] rounded-full p-1 flex items-center justify-center">
              <p className="text-white text-sm font-semibold">
                {"$" + Math.round(parseFloat(book.price.replace("$", "")))}
              </p>
            </div>
            <h3 className="text-lg text-black font-semibold">{book.title}</h3>
            <p className="text-gray-500">{book.subtitle}</p>
            <button
              className="bg-black py-2 px-4 rounded-xl font-semibold"
              onClick={() => handleDelete(book.title)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
