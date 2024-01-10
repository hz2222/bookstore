"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToFavs } from "@/app/redux/slices/cartSlice";


function NewReleases() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.itbook.store/1.0/new");
        const data = await response.json();
        setBooks(data.books);
        console.log(data.books);
      } catch (error) {
        console.error("Hiba történt:", error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  const handleAdd = (product) => {
   alert(product.title + " added to favourites")
    dispatch(addToFavs(product));
  };

  return (
    <div className="w-full bg-white px-8 md:px-28 py-12">
      <h1 className="text-2xl md:text-4xl font-bold text-[#58370D] mb-6">NEW RELEASES</h1>
      <div className="flex gap-2 overflow-x-auto">
        {books.map((book, index) => (
          <div onClick={() => handleAdd(book)}
            key={index}
            className="flex-shrink-0 flex flex-col items-center w-1/2 md:w-1/5 rounded-lg cursor-pointer"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-[300px] mb-4 rounded-t-lg z-1"
            />
            <div className=" w-14 h-14 -mt-20 bg-[#FF9606] rounded-full p-1 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
  {"$" + Math.round(parseFloat(book.price.replace("$", "")))}
</span>
            </div>
            <h3 className="text-md md:text-lg text-black font-semibold">{book.title}</h3>
            <p className="text-gray-500">{book.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewReleases;
