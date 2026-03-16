import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../fire";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [images, setImages] = useState({});
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  // Load categories from the backend API

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/placesViews/public/LaodCatgory.php",
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  //load images from the backend API
  const loadImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/placesViews/public/LaodImages.php",
      );
      let imgObj = {};
      response.data.forEach((img) => {
        imgObj[img.cat_name] = img.url;
      });
      setImages(imgObj);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  // Load categories when the component mounts
  useEffect(() => {
    loadCategories();
    loadImages();
  }, []);
  //handle category click
  const handleCategoryClick = (cat) => {
    if (!selectedCategory.map((c) => c.Category).includes(cat.Category)) {
      setSelectedCategory([...selectedCategory, cat]);
    } else {
      let newselcted = selectedCategory.filter(
        (c) => c.Category !== cat.Category,
      );
      setSelectedCategory(newselcted);
    }
  };
  //update display name
  const updatedisplayName = async () => {
    if (displayName.trim() === "") {
      alert("Display name cannot be empty");
      return;
    }
    try {
      await updateProfile(user, { displayName: displayName });
    } catch (error) {
      console.error("Error updating display name:", error);
      alert("Failed to update display name. Please try again.");
    }
  };
  //change the loading state when the user data is loaded
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  //checks & debugs
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user.displayName) {
    return (
      <>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your display name"
          className="border-2 border-gray-400 rounded-md p-2 m-2 col-span-3"
        />
        <button
          onClick={() => updatedisplayName()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-2 col-span-3"
        >
          Update Name
        </button>
      </>
    );
  } else {
    return (
      <div className="grid grid-cols-3 gap-3">
        <h1 className="flex justify-center font-bold text-2xl  col-span-3">
          Current User : {user.displayName}
        </h1>
        {/* Placeholder content for the Profile page */}
        {categories.map((cat, idx) =>
          cat.Category.includes("Category") ? (
            <h2 key={idx} className="text-xl font-bold col-span-3 mt-4 mb-2">
              {cat.Category.replace(" Category", "")}
            </h2>
          ) : (
            <div key={idx}>
              {" "}
              <img
                className={`rounded-md  w-60 h-35 cursor-pointer ${selectedCategory.map((c) => c.Category).includes(cat.Category) ? "border-4 border-blue-500" : ""}`}
                src={images[cat.Category]}
                alt={cat.Category}
                onClick={() => handleCategoryClick(cat)}
              />
              <p className="text-center mt-1">{cat.Category}</p>
            </div>
          ),
        )}
      </div>
    );
  }
};

export default Profile;
