// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";

// const ListExhibitions = () => {
//   const [exhibitions, setExhibitions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedExhibition, setSelectedExhibition] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [newVideos, setNewVideos] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [previewVideos, setPreviewVideos] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [videosToDelete, setVideosToDelete] = useState([]);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   useEffect(() => {
//     fetchExhibitions();
//   }, []);

//   const fetchExhibitions = async () => {
//     try {
//       const response = await axios.get(
//         "https://autofittools.com/api/exhibition/content"
//       );
//       setExhibitions(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching exhibitions:", err);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this exhibition?")) {
//       try {
//         await axios.delete(`https://autofittools.com/api/exhibition/${id}`);
//         fetchExhibitions();
//         alert("Exhibition deleted successfully");
//       } catch (err) {
//         console.error(err);
//         alert("Error deleting exhibition");
//       }
//     }
//   };

//   const handleEdit = (exhibition) => {
//     setSelectedExhibition(exhibition);
//     setTitle(exhibition.title);
//     setPreviewVideos(exhibition.videos);
//     setPreviewImages(exhibition.images);
//     setNewVideos([]);
//     setNewImages([]);
//     setVideosToDelete([]);
//     setImagesToDelete([]);
//     setModalOpen(true);
//   };

//   const handleVideoChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewVideos(files);

//     // Keep existing videos that aren't marked for deletion
//     const existingVideos = previewVideos.filter(
//       (video) => !videosToDelete.includes(video)
//     );

//     // Create preview URLs for new videos
//     const videoUrls = files.map((file) => URL.createObjectURL(file));
//     setPreviewVideos([...existingVideos, ...videoUrls]);
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages(files);

//     // Keep existing images that aren't marked for deletion
//     const existingImages = previewImages.filter(
//       (image) => !imagesToDelete.includes(image)
//     );

//     // Create preview URLs for new images
//     const imageUrls = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages([...existingImages, ...imageUrls]);
//   };

//   const handleDeleteVideo = (videoUrl) => {
//     if (videoUrl.startsWith("blob:")) {
//       // If it's a new video (blob URL), remove it from newVideos
//       const index = previewVideos.indexOf(videoUrl);
//       const updatedNewVideos = [...newVideos];
//       updatedNewVideos.splice(index, 1);
//       setNewVideos(updatedNewVideos);
//     } else {
//       // If it's an existing video, add to videosToDelete
//       setVideosToDelete([...videosToDelete, videoUrl]);
//     }
//     setPreviewVideos(previewVideos.filter((v) => v !== videoUrl));
//   };

//   const handleDeleteImage = (imageUrl) => {
//     if (imageUrl.startsWith("blob:")) {
//       // If it's a new image (blob URL), remove it from newImages
//       const index = previewImages.indexOf(imageUrl);
//       const updatedNewImages = [...newImages];
//       updatedNewImages.splice(index, 1);
//       setNewImages(updatedNewImages);
//     } else {
//       // If it's an existing image, add to imagesToDelete
//       setImagesToDelete([...imagesToDelete, imageUrl]);
//     }
//     setPreviewImages(previewImages.filter((i) => i !== imageUrl));
//   };

//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();

//       // Only append title if it's changed
//       if (title !== selectedExhibition.title) {
//         formData.append("title", title);
//       }

//       // Add files to be deleted
//       if (videosToDelete.length > 0) {
//         formData.append("deleteVideos", JSON.stringify(videosToDelete));
//       }

//       if (imagesToDelete.length > 0) {
//         formData.append("deleteImages", JSON.stringify(imagesToDelete));
//       }

//       // Only append new videos if they exist
//       if (newVideos.length > 0) {
//         for (let video of newVideos) {
//           formData.append("videos", video);
//         }
//       }

//       // Only append new images if they exist
//       if (newImages.length > 0) {
//         for (let image of newImages) {
//           formData.append("images", image);
//         }
//       }

//       // Check if any updates are being made
//       if (formData.entries().next().done) {
//         alert("No changes detected");
//         return;
//       }

//       const response = await axios.put(
//         `https://autofittools.com/api/exhibition/${selectedExhibition.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       fetchExhibitions();
//       alert("Exhibition updated successfully");
//       setModalOpen(false);
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data || "Error updating exhibition");
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setNewVideos([]);
//     setNewImages([]);
//     setPreviewVideos([]);
//     setPreviewImages([]);
//     setVideosToDelete([]);
//     setImagesToDelete([]);
//     setSelectedExhibition(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen p-8 dark:bg-gray-800">
//       <h1 className="text-3xl font-heading mb-6 text-center dark:text-white">
//         Exhibitions
//       </h1>
//       <div className="overflow-x-auto mt-8">
//         <table className="min-w-full dark:bg-gray-600 border border-gray-300 text-sm md:text-base">
//           <thead>
//             <tr className="w-full bg-gray-100 dark:bg-gray-400">
//               <th className="py-2 px-4 border font-body text-sm dark:text-white">
//                 ID
//               </th>
//               <th className="py-2 px-4 border font-body text-sm dark:text-white">
//                 Title
//               </th>
//               <th className="py-2 px-4 border font-body text-sm dark:text-white">
//                 Videos
//               </th>
//               <th className="py-2 px-4 border font-body text-sm dark:text-white">
//                 Images
//               </th>
//               <th className="py-2 px-4 border font-body text-sm dark:text-white">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {exhibitions.map((exhibition) => (
//               <tr key={exhibition.id} className="text-center">
//                 <td className="py-2 px-4 font-body text-sm border dark:text-white">
//                   {exhibition.id}
//                 </td>
//                 <td className="py-2 px-4 font-body text-sm border dark:text-white">
//                   {exhibition.title}
//                 </td>
//                 <td className="py-2 px-4 border dark:text-white">
//                   {exhibition.videos.length > 0 ? (
//                     <div className="flex gap-2 justify-center">
//                       {exhibition.videos.map((video, index) => (
//                         <div key={index} className="w-12 h-12 overflow-hidden">
//                           <video width="100%" height="100%" controls>
//                             <source
//                               src={`https://autofittools.com${video}`}
//                               type="video/mp4"
//                             />
//                           </video>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No videos</p>
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border dark:text-white">
//                   {exhibition.images.length > 0 ? (
//                     <div className="flex gap-2 justify-center">
//                       {exhibition.images.map((image, index) => (
//                         <img
//                           key={index}
//                           src={`https://autofittools.com${image}`}
//                           alt={`Exhibition ${exhibition.id}`}
//                           className="w-12 h-12 object-contain"
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No images</p>
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   <div className="flex justify-center gap-2 flex-wrap">
//                     <button
//                       onClick={() => handleEdit(exhibition)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(exhibition.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrashAlt />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-2xl font-heading mb-4">Edit Exhibition</h2>
//             <label className="block mb-2 font-heading">Title</label>
//             <input
//               type="text"
//               className="w-full font-heading p-2 border border-gray-300 rounded mb-4"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <div className="mb-4">
//               <label className="block mb-2 font-heading">Videos</label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 multiple
//                 onChange={handleVideoChange}
//                 className="mb-2"
//               />
//               {previewVideos.length > 0 && (
//                 <div className="flex gap-2 flex-wrap">
//                   {previewVideos.map((video, index) => (
//                     <div key={index} className="w-20 h-20 relative">
//                       <button
//                         onClick={() => handleDeleteVideo(video)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
//                       >
//                         <FaTimes size={12} />
//                       </button>
//                       <video width="100%" height="100%" controls>
//                         <source
//                           src={
//                             video.startsWith("blob:")
//                               ? video
//                               : `https://autofittools.com${video}`
//                           }
//                           type="video/mp4"
//                         />
//                       </video>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2 font-heading">Images</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="mb-2"
//               />
//               {previewImages.length > 0 && (
//                 <div className="flex gap-2 flex-wrap">
//                   {previewImages.map((image, index) => (
//                     <div key={index} className="w-20 h-20 relative">
//                       <button
//                         onClick={() => handleDeleteImage(image)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
//                       >
//                         <FaTimes size={12} />
//                       </button>
//                       <img
//                         src={
//                           image.startsWith("blob:")
//                             ? image
//                             : `https://autofittools.com${image}`
//                         }
//                         alt={`Preview ${index + 1}`}
//                         className="w-20 h-20 object-con"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end gap-4">
//               <button
//                 className="bg-blue-500 font-heading text-white py-2 px-4 rounded hover:bg-blue-600"
//                 onClick={handleUpdate}
//               >
//                 Update
//               </button>
//               <button
//                 className="bg-gray-300 font-heading py-2 px-4 rounded hover:bg-gray-400"
//                 onClick={() => {
//                   setModalOpen(false);
//                   resetForm();
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListExhibitions;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";

const ListExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [newVideos, setNewVideos] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [videosToDelete, setVideosToDelete] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get(
        "https://autofittools.com/api/exhibition/content"
      );
      setExhibitions(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching exhibitions:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exhibition?")) {
      try {
        await axios.delete(`https://autofittools.com/api/exhibition/${id}`);
        fetchExhibitions();
        alert("Exhibition deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Error deleting exhibition");
      }
    }
  };

  const handleEdit = (exhibition) => {
    setSelectedExhibition(exhibition);
    setTitle(exhibition.title);
    setPreviewVideos(exhibition.videos);
    setPreviewImages(exhibition.images);
    setNewVideos([]);
    setNewImages([]);
    setVideosToDelete([]);
    setImagesToDelete([]);
    setModalOpen(true);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setNewVideos(files);

    const existingVideos = previewVideos.filter(
      (video) => !videosToDelete.includes(video)
    );

    const videoUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewVideos([...existingVideos, ...videoUrls]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    const existingImages = previewImages.filter(
      (image) => !imagesToDelete.includes(image)
    );

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...existingImages, ...imageUrls]);
  };

  const handleDeleteVideo = (videoUrl) => {
    if (videoUrl.startsWith("blob:")) {
      const index = previewVideos.indexOf(videoUrl);
      const updatedNewVideos = [...newVideos];
      updatedNewVideos.splice(index, 1);
      setNewVideos(updatedNewVideos);
    } else {
      setVideosToDelete([...videosToDelete, videoUrl]);
    }
    setPreviewVideos(previewVideos.filter((v) => v !== videoUrl));
  };

  const handleDeleteImage = (imageUrl) => {
    if (imageUrl.startsWith("blob:")) {
      const index = previewImages.indexOf(imageUrl);
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);
    } else {
      setImagesToDelete([...imagesToDelete, imageUrl]);
    }
    setPreviewImages(previewImages.filter((i) => i !== imageUrl));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      if (title !== selectedExhibition.title) {
        formData.append("title", title);
      }

      if (videosToDelete.length > 0) {
        formData.append("deleteVideos", JSON.stringify(videosToDelete));
      }

      if (imagesToDelete.length > 0) {
        formData.append("deleteImages", JSON.stringify(imagesToDelete));
      }

      if (newVideos.length > 0) {
        for (let video of newVideos) {
          formData.append("videos", video);
        }
      }

      if (newImages.length > 0) {
        for (let image of newImages) {
          formData.append("images", image);
        }
      }

      if (formData.entries().next().done) {
        alert("No changes detected");
        return;
      }

      await axios.put(
        `https://autofittools.com/api/exhibition/${selectedExhibition.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchExhibitions();
      alert("Exhibition updated successfully");
      setModalOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error updating exhibition");
    }
  };

  const resetForm = () => {
    setTitle("");
    setNewVideos([]);
    setNewImages([]);
    setPreviewVideos([]);
    setPreviewImages([]);
    setVideosToDelete([]);
    setImagesToDelete([]);
    setSelectedExhibition(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-8 dark:bg-gray-800">
      <h1 className="text-2xl sm:text-3xl font-heading mb-4 sm:mb-6 text-center dark:text-white">
        Exhibitions
      </h1>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {exhibitions.map((exhibition) => (
          <div
            key={exhibition.id}
            className="bg-white dark:bg-gray-600 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-heading text-lg dark:text-white">
                {exhibition.title}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exhibition)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exhibition.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-body text-sm mb-1 dark:text-gray-200">
                  Videos:
                </h3>
                {exhibition.videos.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {exhibition.videos.map((video, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 overflow-hidden rounded"
                      >
                        <video width="100%" height="100%" controls>
                          <source
                            src={`https://autofittools.com${video}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-body text-sm text-gray-500 dark:text-gray-400">
                    No videos
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-body text-sm mb-1 dark:text-gray-200">
                  Images:
                </h3>
                {exhibition.images.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {exhibition.images.map((image, index) => (
                      <img
                        key={index}
                        src={`https://autofittools.com${image}`}
                        alt={`Exhibition ${exhibition.id}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="font-body text-sm text-gray-500 dark:text-gray-400">
                    No images
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 border border-gray-300 text-sm md:text-base rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-400">
              <th className="py-3 px-4 border font-heading text-sm text-left dark:text-white">
                ID
              </th>
              <th className="py-3 px-4 border font-heading text-sm text-left dark:text-white">
                Title
              </th>
              <th className="py-3 px-4 border font-heading text-sm text-left dark:text-white">
                Videos
              </th>
              <th className="py-3 px-4 border font-heading text-sm text-left dark:text-white">
                Images
              </th>
              <th className="py-3 px-4 border font-heading text-sm text-center dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-600">
            {exhibitions.map((exhibition) => (
              <tr key={exhibition.id} className="border-t">
                <td className="py-3 px-4 border font-body text-sm dark:text-white">
                  {exhibition.id}
                </td>
                <td className="py-3 px-4 borde font-body text-sm dark:text-white">
                  {exhibition.title}
                </td>
                <td className="py-3 px-4 border dark:text-white">
                  {exhibition.videos.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {exhibition.videos.map((video, index) => (
                        <div
                          key={index}
                          className="w-16 h-16 overflow-hidden rounded"
                        >
                          <video width="100%" height="100%" controls>
                            <source
                              src={`https://autofittools.com${video}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No videos
                    </p>
                  )}
                </td>
                <td className="py-3 px-4 border dark:text-white">
                  {exhibition.images.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {exhibition.images.map((image, index) => (
                        <img
                          key={index}
                          src={`https://autofittools.com${image}`}
                          alt={`Exhibition ${exhibition.id}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No images
                    </p>
                  )}
                </td>
                <td className="py-3 px-4 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(exhibition)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(exhibition.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white  p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-heading mb-4 ">
              Edit Exhibition
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-body text-sm ">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-body text-sm ">Videos</label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  className="w-full mb-2 "
                />
                {previewVideos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {previewVideos.map((video, index) => (
                      <div key={index} className="relative">
                        <button
                          onClick={() => handleDeleteVideo(video)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                        <video
                          className="w-full h-24 object-cover rounded"
                          controls
                        >
                          <source
                            src={
                              video.startsWith("blob:")
                                ? video
                                : `https://autofittools.com${video}`
                            }
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 font-body text-sm ">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full mb-2 dark:text-white"
                />
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {previewImages.map((image, index) => (
                      <div key={index} className="relative">
                        <button
                          onClick={() => handleDeleteImage(image)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                        <img
                          src={
                            image.startsWith("blob:")
                              ? image
                              : `https://autofittools.com${image}`
                          }
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-6">
              <button
                className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-heading "
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="w-full sm:w-auto bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 font-heading"
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListExhibitions;
