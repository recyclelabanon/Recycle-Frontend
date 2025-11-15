import { useState, useEffect } from "react";
import axios from "axios";

const AdminQuote = () => {
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/quote").then((res) => {
      if (res.data) {
        setQuoteText(res.data.quoteText);
        setAuthor(res.data.author);
        setExistingImage(res.data.backgroundImage);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("quoteText", quoteText);
    formData.append("author", author);
    formData.append("existingImage", existingImage);
    if (image) formData.append("backgroundImage", image);

    axios.post("http://localhost:5000/api/v1/quote", formData)
    alert("Quote Updated!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Quote Section</h2>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg p-6 space-y-5 max-w-xl"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quote Text
          </label>
          <textarea 
            value={quoteText} 
            onChange={(e) => setQuoteText(e.target.value)} 
            required 
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[120px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image
          </label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="w-full border border-gray-300 rounded-md p-2 bg-white"
          />
        </div>

        {existingImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <img 
              src={existingImage} 
              alt="Quote background" 
              className="w-64 rounded shadow"
            />
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Save Quote
        </button>
      </form>
    </div>
  );
};

export default AdminQuote;
