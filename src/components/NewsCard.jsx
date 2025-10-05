import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function NewsCard({ 
    imgNoticia, 
    tituloNoticia, 
    descricaoNoticia, 
    fonte, 
    tempoAtras, 
    temDescricao = false,
    isLarge = false
}) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = (e) => {
        e.preventDefault();
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-[#1B4509] border-2">
            <div className="relative">
                <img 
                    src={imgNoticia} 
                    alt="Notícia" 
                    className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
                />
                <button 
                    onClick={handleBookmark}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border-[#1B4509] border"
                >
                    {isBookmarked ? (
                        <FaBookmark className="text-[#1B4509]" size={16} />
                    ) : (
                        <FaRegBookmark className="text-[#1B4509]" size={16} />
                    )}
                </button>
            </div>

            <div className={`${isLarge ? 'p-6' : 'p-4'}`}>
                <h3 className={`font-bold text-[#1B4509] mb-2 line-clamp-2 ${isLarge ? 'text-xl' : 'text-lg'}`}>
                    {tituloNoticia}
                </h3>

                {temDescricao && (
                    <p className={`text-[#B0AFAF] mb-3 line-clamp-3 ${isLarge ? 'text-base' : 'text-sm'}`}>
                        {descricaoNoticia}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`bg-[#1B4509] rounded-full flex items-center justify-center ${isLarge ? 'w-7 h-7' : 'w-6 h-6'}`}>
                            <span className={`text-white font-bold ${isLarge ? 'text-sm' : 'text-xs'}`}>
                                {fonte.charAt(0)}
                            </span>
                        </div>
                        <span className={`text-[#B0AFAF] truncate ${isLarge ? 'text-sm' : 'text-xs'}`}>
                            {fonte}
                        </span>
                    </div>
                    <span className={`text-[#B0AFAF] ${isLarge ? 'text-sm' : 'text-xs'}`}>
                        {tempoAtras}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
