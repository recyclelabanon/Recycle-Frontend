import { ExternalLink } from "lucide-react";
import PropTypes from "prop-types";

const VideoPage = ({ videoUrl, title }) => {

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4 py-6">
      {/* Video Container */}
      <div className="bg-[#1e1e1e] text-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex gap-3">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <ExternalLink size={16} />
              Open in New Tab
            </a>
          </div>
        </div>

        {/* Video Embed */}
        <div className="mt-4">
          <iframe
            width="100%"
            height="450"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

VideoPage.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoPage;
