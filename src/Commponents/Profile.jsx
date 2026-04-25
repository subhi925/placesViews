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
  const [isTherename, setIsTherename] = useState(false);
  const [showbtn, setShowbtn] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  //load user preferences from the backend API
  const loadUserPreferences = async (user) => {
    if (!user) return;
    const formData = new FormData();
    formData.append("userId", user);
    const url =
      "http://localhost:8080/placesViews/public/LoadUserPreferences.php";

    try {
      const res = await axios.post(url, formData);
      const userPreferences = res.data;
      if (
        userPreferences &&
        userPreferences.length > 0 &&
        userPreferences !== null
      ) {
        setSelectedCategory(JSON.parse(userPreferences));
      }
    } catch (error) {
      setError("Failed to load user preferences. Please try again.");
      console.error("Error loading user preferences:", error);
    }
  };

  // Load categories from the backend API

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/placesViews/public/LaodCatgory.php",
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Failed to fetch categories. Please try again.", error);
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
      setError("Failed to fetch images. Please try again.");
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
      //window.location.reload();
      setIsTherename(true);
      setShowbtn(false);
    } catch (error) {
      setError("Failed to update display name. Please try again.");
    }
  };
  //change the loading state when the user data is loaded
  useEffect(() => {
    if (user) {
      const callLoadPreferences = async () => {
        await loadUserPreferences(user.uid);
      };
      callLoadPreferences();
      setLoading(false);
      if (user.displayName) {
        setIsTherename(true);
      }
    }
  }, [user, isTherename]);
  //-----------------------------
  // Save preferences to the backend API
  const savePreferences = async (categoriesToSave) => {
    if (!user) return;
    const formData = new FormData();
    formData.append("userId", user.uid);
    formData.append("categories", JSON.stringify(categoriesToSave));
    const url = "http://localhost:8080/placesViews/public/SavePreferences.php";
    setIsSaving(true); // Set saving state to true when starting the save operation

    try {
      const response = await axios.post(url, formData);
      setIsSaving(false); // Reset the saving state after the save operation is attempted
    } catch (err) {
      setError("Failed to save your choices. Please try again.");
      setIsSaving(false); // Reset the saving state even if the save operation fails
    }
  };
  //--------------------------------------------------------
  // Debounce the savePreferences function to avoid excessive API calls when the user clicks categories rapidly
  useEffect(() => {
    // Don't attempt to save preferences if there are no selected categories or if the user data is still loading
    if (selectedCategory.length === 0 && loading) return;

    // Set a timeout to save preferences after a short delay (e.g., 800ms) to allow for multiple rapid clicks without making multiple API calls
    const delayDebounceFn = setTimeout(() => {
      savePreferences(selectedCategory); // Reset the saving state after the save operation is attempted
    }, 800);

    // Cleanup function - clears the timeout if the user clicks again before the delay is over
    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory]);

  //checks & debugs
  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  //---------------------------------------------------------
  // Render the Profile page

  if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user.displayName && !isTherename) {
    return (
      <>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your display name"
          className="border-2 border-gray-400 rounded-md p-2 m-2 col-span-3"
        />
        {showbtn && (
          <button
            onClick={() => updatedisplayName()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md m-2 col-span-3"
          >
            Update Name
          </button>
        )}
      </>
    );
  } else if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  } else {
    return (
      <div className="grid grid-cols-3 gap-3">
        {isSaving && (
          <div className="fixed top-5 right-5 bg-blue-500 text-white p-2 rounded shadow-lg z-50">
            Saving... 💾
          </div>
        )}
        <h1 className="flex justify-center font-bold text-2xl  col-span-3">
          Current User : {user.displayName || displayName}
        </h1>
        {/* Placeholder content for the Profile page */}
        {categories
          .filter((cat) => cat?.Category)
          .map((cat, idx) =>
            cat.Category.includes("Category") ? (
              <h2 key={idx} className="text-xl font-bold col-span-3 mt-4 mb-2">
                {cat.Category.replace(" Category", "")}
              </h2>
            ) : (
              <div key={idx}>
                {" "}
                <img
                  className={`rounded-md  w-60 h-35 cursor-pointer ${selectedCategory.map((c) => c.Category).includes(cat.Category) ? "border-4 border-blue-500" : ""}`}
                  src={
                    images[cat.Category] ||
                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
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
