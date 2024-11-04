import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageNumberLimit = 3; // Only show 3 page numbers at a time
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.coinlore.net/api/tickers/');
        setCoins(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCoins();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoins = coins.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(coins.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    } else if (pageNumber < minPageNumberLimit + 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextBtn = () => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage((prev) => prev - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">Crypto Prices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden hidden sm:table">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Coin</th>
              <th className="border p-3">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((coin, index) => (
              <tr key={coin.id} className="bg-white hover:bg-gray-100">
                <td className="border p-3 text-center">{index + 1 + indexOfFirstItem}</td>
                <td className="border p-3 text-center">{coin.name}</td>
                <td className="border p-3 text-center">${coin.price_usd}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {currentCoins.map((coin, index) => (
            <div key={coin.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800">{coin.name}</h2>
              <p className="text-gray-500"># {index + 1 + indexOfFirstItem}</p>
              <p className="text-xl font-bold text-blue-500">${coin.price_usd}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={handlePrevBtn}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 text-gray-500 disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(minPageNumberLimit, maxPageNumberLimit)
          .map((page) => (
            <button
              key={page}
              onClick={() => handleClick(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}

        <button
          onClick={handleNextBtn}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 text-gray-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoTable;
