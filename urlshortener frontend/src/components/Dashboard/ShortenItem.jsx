
// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import CopyToClipboard from "react-copy-to-clipboard";
// import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";

// import {   MdOutlineAdsClick,  MdFavorite, MdFavoriteBorder , MdOutlineShare, MdDelete, MdAnalytics, MdQrCode, MdEdit, MdCopyAll} from "react-icons/md";
// import api from "../../api/api";
// import { useNavigate } from "react-router-dom";
// import { useStoreContext } from "../../contextApi/ContextApi";
// import { Hourglass } from "react-loader-spinner";
// import Graph from "./Graph";
// import toast from "react-hot-toast";
// import EditShortenPopup from "./EditShortenPopup";
// import QRGenerator from "./QRGenerator";

// const ShortenItem = ({ id, originalUrl, shortUrl, clickCount, createdDate, refetch }) => {
//   const { token } = useStoreContext();
//   const navigate = useNavigate();

//   const [isCopied, setIsCopied] = useState(false);
//   const [analyticToggle, setAnalyticToggle] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [selectedUrl, setSelectedUrl] = useState("");
//   const [analyticsData, setAnalyticsData] = useState([]);
//   const [editPopup, setEditPopup] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [favorite, setFavorite] = useState(false);

//   const BACKEND = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8080").replace(/\/$/, "");
//   const fullShortUrl = `${BACKEND}/${shortUrl}`;

//   // Load favorites from localStorage
//   useEffect(() => {
//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorite(favorites.includes(fullShortUrl));
//   }, [fullShortUrl]);

//   const toggleFavorite = () => {
//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     let updated = [];
//     if (favorite) {
//       updated = favorites.filter(fav => fav !== fullShortUrl);
//       setFavorite(false);
//       toast.success("Removed from favorites");
//     } else {
//       updated = [...favorites, fullShortUrl];
//       setFavorite(true);
//       toast.success("Added to favorites");
//     }
//     localStorage.setItem("favorites", JSON.stringify(updated));
//   };

//   const analyticsHandler = (url) => {
//     if (!analyticToggle) setSelectedUrl(url);
//     setAnalyticToggle(!analyticToggle);
//   };

//   const fetchAnalytics = async () => {
//     setLoader(true);
//     try {
//       const { data } = await api.get(
//         `/api/urls/analytics/${selectedUrl}?startDate=2024-01-01T00:00:00&endDate=2099-12-31T23:59:59`,
//         { headers: { Authorization: "Bearer " + token } }
//       );
//       setAnalyticsData(data);
//       setSelectedUrl("");
//     } catch (e) {
//       navigate("/error");
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedUrl) fetchAnalytics();
//   }, [selectedUrl]);

//   // Delete URL with centered toast
//   const deleteUrlHandler = () => {
//     toast.custom(
//       (t) => (
//         <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto flex flex-col gap-4 text-center">
//           <p className="font-semibold text-gray-800 text-lg">Are you sure you want to delete this URL?</p>
//           <div className="flex justify-center gap-4">
//             <button
//               className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//               onClick={() => toast.dismiss(t.id)}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//               onClick={async () => {
//                 try {
//                   await api.delete(`/api/urls/${shortUrl}`, {
//                     headers: { Authorization: "Bearer " + token },
//                   });
//                   toast.success("URL deleted successfully");
//                   refetch();
//                 } catch (e) {
//                   toast.error("Delete failed");
//                 }
//                 toast.dismiss(t.id);
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ),
//       { duration: Infinity, position: "top-center" }
//     );
//   };

//   // Reset copy feedback
//   useEffect(() => {
//     if (isCopied) {
//       const timer = setTimeout(() => setIsCopied(false), 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [isCopied]);

//   return (
//     <>
//       {/* Main URL Card */}
//       <div className="bg-white backdrop-blur-xl shadow-xl border border-gray-200 px-6 py-5 rounded-xl transition-all hover:shadow-2xl">

//         {/* URL Info */}
//         <div className="flex justify-between items-center flex-wrap gap-2">
//           <a
//             href={fullShortUrl}
//             target="_blank"
//             className="text-lg font-semibold text-blue-700 hover:underline break-all flex items-center gap-2"
//           >
//             {fullShortUrl} <FaExternalLinkAlt />
//           </a>
// <div className="flex items-center gap-3">
//           <button
//             onClick={toggleFavorite}
//             className="text-2xl text-red-500 hover:text-red-600 transition-colors"
//             title={favorite ? "Remove from favorites" : "Add to favorites"}
//           >
//             {favorite ? <MdFavorite /> : <MdFavoriteBorder />}
//           </button>
          

//     <button
//   onClick={() => {
//     if (navigator.share) {
//       navigator.share({ title: "Shortened Link", url: fullShortUrl }).catch(() => {});
//     } else {
//       navigator.clipboard.writeText(fullShortUrl);
//       alert("Sharing not supported. Link copied.");
//     }
//   }}
//   title="Share Link"
//   className="text-xl text-blue-600 hover:text-blue-700 transition-all"
// >
//   <MdOutlineShare />
// </button>

//   </div>
//         </div>


//         <p className="text-gray-700 mt-2 break-all">{originalUrl}</p>

//         {/* Stats */}
//         <div className="flex items-center gap-6 pt-4 flex-wrap">
//           <div className="flex items-center gap-1 text-green-700 font-semibold">
//             <MdOutlineAdsClick className="text-xl" />
//             {clickCount} {clickCount === 1 ? "Click" : "Clicks"}
//           </div>

//           <div className="flex items-center gap-2 font-semibold text-gray-700">
//             <FaRegCalendarAlt />
//             {dayjs(createdDate).format("MMM DD, YYYY")}
//           </div>
//         </div>
//       </div>

     
// <div className="bg-gray-50 shadow-md border border-gray-200 mt-3 px-6 py-4 rounded-xl flex flex-wrap gap-3 justify-center">

//   <CopyToClipboard text={fullShortUrl} onCopy={() => setIsCopied(true)}>
//     <button className="action-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">
//       {isCopied ? <>Copied ✔</> : <><MdCopyAll /></>}
//     </button>
//   </CopyToClipboard>

//   <button onClick={() => setEditPopup(true)} className="action-btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">
//     <MdEdit />
//   </button>

//   <button onClick={deleteUrlHandler} className="action-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">
//     <MdDelete />
//   </button>

//   <button onClick={() => analyticsHandler(shortUrl)} className="action-btn bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">
//     <MdAnalytics />
//   </button>

//   <button onClick={() => setShowQR(true)} className="action-btn bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">
//     <MdQrCode />
//   </button>

// </div>


// {/* More Options Section */}
// <div className="mt-5 border-t pt-4">

//   <h3 className="font-semibold text-gray-800 text-lg mb-3">More Options</h3>

//   {/* Tags */}
//   <div className="flex flex-wrap gap-2 mb-3">
//     {["Work", "Personal", "Study", "Marketing"].map(tag => (
//       <span
//         key={tag}
//         className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full cursor-pointer hover:bg-blue-200"
//       >
//         #{tag}
//       </span>
//     ))}
//   </div>

//   {/* Notes */}
//   <textarea
//     placeholder="Add a private note..."
//     className="w-full p-3 border rounded-lg text-sm resize-none mb-3"
//   ></textarea>

//   {/* QR Customizer */}
//   <div className="flex flex-col gap-3">
//     <div className="flex items-center gap-3">
//       <label className="text-gray-700 text-sm">QR Size:</label>
//       <input
//         type="range"
//         min="100"
//         max="400"
//         defaultValue="160"
//         className="w-full"
//       />
//     </div>

//     <div className="flex items-center gap-3">
//       <label className="text-gray-700 text-sm">QR Color:</label>
//       <input type="color" defaultValue="#000000" className="w-10 h-10 border rounded cursor-pointer" />
//     </div>
//   </div>

// </div>


// {/* Popup */}
// <QRGenerator url={fullShortUrl} open={showQR} setOpen={setShowQR} />



//       {/* Analytics Section */}
//       {analyticToggle && (
//         <div className="border-t mt-5 pt-5 min-h-72">
//           {loader ? (
//             <div className="flex justify-center items-center h-52">
//               <Hourglass visible height="50" width="50" />
//             </div>
//           ) : analyticsData.length === 0 ? (
//             <p className="text-center text-gray-500">No analytics available.</p>
//           ) : (
//             <Graph graphData={analyticsData} />
//           )}
//         </div>
//       )}

//       {/* Edit Popup */}
//       <EditShortenPopup
//         open={editPopup}
//         setOpen={setEditPopup}
//         shortUrl={shortUrl}
//         originalUrl={originalUrl}
//         fullShortUrl={fullShortUrl}
//         refetch={refetch}
//       />
//     </>
//   );
// };

// export default ShortenItem;
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import {
  MdOutlineAdsClick, MdFavorite, MdFavoriteBorder,
  MdOutlineShare, MdDelete, MdAnalytics, MdQrCode,
  MdEdit, MdCopyAll
} from "react-icons/md";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";
import toast from "react-hot-toast";
import EditShortenPopup from "./EditShortenPopup";
import QRGenerator from "./QRGenerator";

const ShortenItem = ({ id, originalUrl, shortUrl, clickCount, createdDate, refetch }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const [qrSize, setQrSize] = useState(160);
  const [qrColor, setQrColor] = useState("#000000");
  const [notes, setNotes] = useState("");

  const BACKEND = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8080").replace(/\/$/, "");
  const fullShortUrl = `${BACKEND}/${shortUrl}`;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(favorites.includes(fullShortUrl));
  }, [fullShortUrl]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated = favorite
      ? favorites.filter(fav => fav !== fullShortUrl)
      : [...favorites, fullShortUrl];
    setFavorite(!favorite);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const analyticsHandler = (url) => {
    if (!analyticToggle) setSelectedUrl(url);
    setAnalyticToggle(!analyticToggle);
  };

  const fetchAnalytics = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-01-01T00:00:00&endDate=2099-12-31T23:59:59`,
        { headers: { Authorization: "Bearer " + token } }
      );
      setAnalyticsData(data);
      setSelectedUrl("");
    } catch {
      navigate("/error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => { if (selectedUrl) fetchAnalytics(); }, [selectedUrl]);
  useEffect(() => { if (isCopied) setTimeout(() => setIsCopied(false), 1500); }, [isCopied]);

  const deleteUrlHandler = () => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto flex flex-col gap-4 text-center">
        <p className="font-semibold text-gray-800 text-lg">Are you sure you want to delete this URL?</p>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400" onClick={() => toast.dismiss(t.id)}>Cancel</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={async () => { try { await api.delete(`/api/urls/${shortUrl}`, { headers: { Authorization: "Bearer " + token } }); toast.success("URL deleted successfully"); refetch(); } catch { toast.error("Delete failed"); } toast.dismiss(t.id); }}
          >Delete</button>
        </div>
      </div>
    ), { duration: Infinity, position: "top-center" });
  };

  return (
    <>
      {/* URL Card */}
      <div className="bg-white backdrop-blur-xl shadow-xl border border-gray-200 px-6 py-5 rounded-xl transition-all hover:shadow-2xl">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <a href={fullShortUrl} target="_blank" className="text-lg font-semibold text-blue-700 hover:underline break-all flex items-center gap-2">
            {fullShortUrl} <FaExternalLinkAlt />
          </a>
          <div className="flex items-center gap-3">
            <button onClick={toggleFavorite} className="text-2xl text-red-500 hover:text-red-600 transition-colors" title={favorite ? "Remove from favorites" : "Add to favorites"}>
              {favorite ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
            <button onClick={() => { navigator.share ? navigator.share({ title: "Shortened Link", url: fullShortUrl }).catch(() => {}) : (navigator.clipboard.writeText(fullShortUrl), alert("Sharing not supported. Link copied.")); }} className="text-xl text-blue-600 hover:text-blue-700 transition-all" title="Share Link">
              <MdOutlineShare />
            </button>
          </div>
        </div>
        <p className="text-gray-700 mt-2 break-all">{originalUrl}</p>
        <div className="flex items-center gap-6 pt-4 flex-wrap">
          <div className="flex items-center gap-1 text-green-700 font-semibold"><MdOutlineAdsClick className="text-xl" />{clickCount} {clickCount === 1 ? "Click" : "Clicks"}</div>
          <div className="flex items-center gap-2 font-semibold text-gray-700"><FaRegCalendarAlt />{dayjs(createdDate).format("MMM DD, YYYY")}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-50 shadow-md border border-gray-200 mt-3 px-6 py-4 rounded-xl flex flex-wrap gap-3 justify-center">
        <CopyToClipboard text={fullShortUrl} onCopy={() => setIsCopied(true)}>
          <button className="action-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow">{isCopied ? "Copied ✔" : <MdCopyAll />}</button>
        </CopyToClipboard>
        <button onClick={() => setEditPopup(true)} className="action-btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"><MdEdit /></button>
        <button onClick={deleteUrlHandler} className="action-btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"><MdDelete /></button>
        <button onClick={() => analyticsHandler(shortUrl)} className="action-btn bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"><MdAnalytics /></button>
        <button onClick={() => setShowQR(true)} className="action-btn bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow"><MdQrCode /></button>
      </div>

      {/* More Options */}
      <div className="mt-5 border-t pt-4">
      
        {/* QR Customizer */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm">QR Size:</label>
            <input type="range" min="100" max="400" value={qrSize} onChange={e => setQrSize(Number(e.target.value))} className="w-full"/>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm">QR Color:</label>
            <input type="color" value={qrColor} onChange={e => setQrColor(e.target.value)} className="w-10 h-10 border rounded cursor-pointer"/>
          </div>
        </div>
      </div>

      {/* QR Popup */}
      <QRGenerator url={fullShortUrl} open={showQR} setOpen={setShowQR} size={qrSize} color={qrColor} />

      {/* Analytics */}
      {analyticToggle && (
        <div className="border-t mt-5 pt-5 min-h-72">
          {loader ? <div className="flex justify-center items-center h-52"><Hourglass visible height="50" width="50" /></div> :
          analyticsData.length === 0 ? <p className="text-center text-gray-500">No analytics available.</p> :
          <Graph graphData={analyticsData} />}
        </div>
      )}

      {/* Edit Popup */}
      <EditShortenPopup open={editPopup} setOpen={setEditPopup} shortUrl={shortUrl} originalUrl={originalUrl} fullShortUrl={fullShortUrl} refetch={refetch} />
    </>
  );
};

export default ShortenItem;
