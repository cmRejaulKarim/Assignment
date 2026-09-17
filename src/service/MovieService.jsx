const BASE_URL = "https://api.tvmaze.com";

export const getAllMovies = async () => {
    const url = `${BASE_URL}/shows`;
    const result = await fetch(url);
    
    if (!result.ok) {
        throw new Error("Failed to fetch movies from API");
    }
    
    const data = await result.json();
    
    return data.map((movie) => ({
        id: movie.id,
        name: movie.name,
        rating: movie.rating?.average || "",
        premiered: movie.premiered || "",
        image: movie.image?.medium || null,
        originalImage: movie.image?.original || null,
        summary: movie.summary || "",
        genres: movie.genres || [],
        language: movie.language || "",
        status: movie.status || "",
    }));
};

export const searchMovies = async (query) => {
    if (!query || query.trim() === "") {
        return getAllMovies();
    }
    
    const url = `${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`;
    const result = await fetch(url);
    
    if (!result.ok) {
        throw new Error("Failed to search movies from API");
    }
    
    const data = await result.json();
    
    return data.map((item) => {
        const movie = item.show;
        return {
            id: movie.id,
            name: movie.name,
            rating: movie.rating?.average || "",
            premiered: movie.premiered || "",
            image: movie.image?.medium || null,
            originalImage: movie.image?.original || null,
            summary: movie.summary || "",
            genres: movie.genres || [],
            language: movie.language || "",
            status: movie.status || "",
        };
    });
};