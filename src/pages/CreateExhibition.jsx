// import React, { useState } from "react";
// import { X, Upload } from "lucide-react";

// const CreateExhibition = () => {
//   const [title, setTitle] = useState("");
//   const [images, setImages] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState({
//     images: [],
//     videos: [],
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileSelect = (event, type) => {
//     const files = Array.from(event.target.files);
//     const maxFiles = 10;
//     const currentFiles = type === "images" ? images : videos;

//     if (currentFiles.length + files.length > maxFiles) {
//       setError(`You can only upload up to ${maxFiles} ${type}`);
//       return;
//     }

//     // Create preview URLs for the files
//     const newPreviewUrls = files.map((file) => ({
//       url: URL.createObjectURL(file),
//       name: file.name,
//     }));

//     if (type === "images") {
//       setImages([...images, ...files]);
//       setPreviewUrls((prev) => ({
//         ...prev,
//         images: [...prev.images, ...newPreviewUrls],
//       }));
//     } else {
//       setVideos([...videos, ...files]);
//       setPreviewUrls((prev) => ({
//         ...prev,
//         videos: [...prev.videos, ...newPreviewUrls],
//       }));
//     }
//     setError("");
//   };

//   const handleDelete = (index, type) => {
//     if (type === "images") {
//       const newImages = images.filter((_, i) => i !== index);
//       const newPreviewUrls = previewUrls.images.filter((_, i) => i !== index);
//       setImages(newImages);
//       setPreviewUrls((prev) => ({ ...prev, images: newPreviewUrls }));
//     } else {
//       const newVideos = videos.filter((_, i) => i !== index);
//       const newPreviewUrls = previewUrls.videos.filter((_, i) => i !== index);
//       setVideos(newVideos);
//       setPreviewUrls((prev) => ({ ...prev, videos: newPreviewUrls }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title) {
//       setError("Title is required");
//       return;
//     }
//     if (images.length === 0 && videos.length === 0) {
//       setError("At least one image or video is required");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     const formData = new FormData();
//     formData.append("title", title);
//     images.forEach((image) => formData.append("images", image));
//     videos.forEach((video) => formData.append("videos", video));

//     try {
//       const response = await fetch("https://autofittools.com/api/exhibition", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(await response.text());
//       }

//       // Reset form after successful submission
//       setTitle("");
//       setImages([]);
//       setVideos([]);
//       setPreviewUrls({ images: [], videos: [] });
//       alert("Exhibition added successfully!");
//     } catch (err) {
//       setError(err.message || "Error adding exhibition");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="mt-24">
//           <label
//             htmlFor="title"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Exhibition Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
//             placeholder="Enter exhibition title"
//           />
//         </div>

//         <div className="space-y-4">
//           {/* Image Upload Section */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Images ({images.length}/10)
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="images"
//                     className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     <span>Upload images</span>
//                     <input
//                       id="images"
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       className="sr-only"
//                       onChange={(e) => handleFileSelect(e, "images")}
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>
//             {/* Image Previews */}
//             <div className="mt-4 grid grid-cols-3 gap-4">
//               {previewUrls.images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image.url}
//                     alt={`Preview ${index}`}
//                     className="h-24 w-full object-contain rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleDelete(index, "images")}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full -mt-2 -mr-2"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Video Upload Section */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Videos ({videos.length}/10)
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="videos"
//                     className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     <span>Upload videos</span>
//                     <input
//                       id="videos"
//                       type="file"
//                       multiple
//                       accept="video/*"
//                       className="sr-only"
//                       onChange={(e) => handleFileSelect(e, "videos")}
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>
//             {/* Video Previews */}
//             <div className="mt-4 grid grid-cols-3 gap-4">
//               {previewUrls.videos.map((video, index) => (
//                 <div key={index} className="relative">
//                   <video
//                     src={video.url}
//                     className="h-24 w-full object-contain rounded-md"
//                     controls
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleDelete(index, "videos")}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full -mt-2 -mr-2"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {error && <div className="text-red-500 text-sm">{error}</div>}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
//         >
//           {isLoading ? "Adding Exhibition..." : "Add Exhibition"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateExhibition;

import React, { useState } from "react";
import { X, Upload } from "lucide-react";

const CreateExhibition = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({
    images: [],
    videos: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (event, type) => {
    const files = Array.from(event.target.files);
    const maxFiles = 10;
    const currentFiles = type === "images" ? images : videos;

    if (currentFiles.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} ${type}`);
      return;
    }

    const newPreviewUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    if (type === "images") {
      setImages([...images, ...files]);
      setPreviewUrls((prev) => ({
        ...prev,
        images: [...prev.images, ...newPreviewUrls],
      }));
    } else {
      setVideos([...videos, ...files]);
      setPreviewUrls((prev) => ({
        ...prev,
        videos: [...prev.videos, ...newPreviewUrls],
      }));
    }
    setError("");
  };

  const handleDelete = (index, type) => {
    if (type === "images") {
      const newImages = images.filter((_, i) => i !== index);
      const newPreviewUrls = previewUrls.images.filter((_, i) => i !== index);
      setImages(newImages);
      setPreviewUrls((prev) => ({ ...prev, images: newPreviewUrls }));
    } else {
      const newVideos = videos.filter((_, i) => i !== index);
      const newPreviewUrls = previewUrls.videos.filter((_, i) => i !== index);
      setVideos(newVideos);
      setPreviewUrls((prev) => ({ ...prev, videos: newPreviewUrls }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    if (images.length === 0 && videos.length === 0) {
      setError("At least one image or video is required");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    images.forEach((image) => formData.append("images", image));
    videos.forEach((video) => formData.append("videos", video));

    try {
      const response = await fetch("https://autofittools.com/api/exhibition", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setTitle("");
      setImages([]);
      setVideos([]);
      setPreviewUrls({ images: [], videos: [] });
      alert("Exhibition added successfully!");
    } catch (err) {
      setError(err.message || "Error adding exhibition");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white mt-10 dark:bg-gray-500 rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl dark:text-white sm:text-3xl font-heading  text-center mb-6">
            Upload Exhibition
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="sm:mt-16 mt-8">
              <label
                htmlFor="title"
                className="block dark:text-white font-body   text-gray-700"
              >
                Exhibition Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 dark:bg-gray-500 dark:text-white block w-full rounded-md border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:border-indigo-500 focus:outline-none text-sm sm:text-base"
                placeholder="Enter exhibition title"
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Image Upload Section */}
              <div>
                <label className="block dark:text-white font-body text-gray-700">
                  Images ({images.length}/10)
                </label>
                <div className="mt-2 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    <div className="flex text-sm sm:text-base text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload images</span>
                        <input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleFileSelect(e, "images")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* Image Previews */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {previewUrls.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image.url}
                        alt={`Preview ${index}`}
                        className="h-full w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDelete(index, "images")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Upload Section */}
              <div>
                <label className="block dark:text-white font-body text-gray-700">
                  Videos ({videos.length}/10)
                </label>
                <div className="mt-2 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    <div className="flex text-sm sm:text-base text-gray-600">
                      <label
                        htmlFor="videos"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload videos</span>
                        <input
                          id="videos"
                          type="file"
                          multiple
                          accept="video/*"
                          className="sr-only"
                          onChange={(e) => handleFileSelect(e, "videos")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* Video Previews */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previewUrls.videos.map((video, index) => (
                    <div key={index} className="relative">
                      <video
                        src={video.url}
                        className="w-full rounded-lg"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => handleDelete(index, "videos")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm sm:text-base">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Adding Exhibition..." : "Add Exhibition"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExhibition;
