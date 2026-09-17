import { useEffect } from "react";

export default function MovieCardModal({ movie, onClose }) {
    if (!movie) return null;

    // close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains("modal")) {
                onClose();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-lg relative rounded-none bg-gray-200">

                <button
                    onClick={onClose}
                    className="btn btn-sm bg-red-500 absolute right-2 top-2 rounded-none"
                >
                    ✕
                </button>

                {movie.originalImage || movie.image ? (
                    <img
                        src={movie.originalImage || movie.image}
                        alt={movie.name}
                        className="w-full h-56 object-cover rounded-none mb-4"
                    />
                ) : null}

                <h3 className="text-2xl font-bold">{movie.name}</h3>

                <p className="text-sm text-gray-600 mt-1">
                    ⭐ Rating: {movie.rating || "N/A"} &nbsp;|&nbsp; 📅 Release: {movie.premiered || "N/A"}
                </p>
                {/*list of genres*/}
                {movie.genres && movie.genres?.length > 0 && (
                <div className="mt-3">
                    <p className="font-semibold text-sm">{movie.genres?.length > 1 ? "Genres:" : "Genre:"}</p>
                    <p className="text-sm text-gray-600 max-h-36 overflow-y-auto mt-1">
                        {movie.genres?.join(", ") || "No genre available."}
                    </p>
                </div>
                )}

                <div className="mt-3">
                    <p className="font-semibold text-sm">Summary:</p>
                    <p className="text-sm text-gray-600 max-h-36 overflow-y-auto mt-1">
                        {movie.summary
                            ? movie.summary.replace(/<[^>]*>/g, "")
                            : "No summary available."}
                    </p>
                </div>

                <div className="modal-action">
                    <button onClick={onClose} className="btn bg-red-500 rounded-none">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
