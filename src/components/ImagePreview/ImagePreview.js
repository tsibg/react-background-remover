import { useState, useEffect } from "react";
import "./ImagePreview.css";
function ImagePreview({ fileBlob }) {
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        let url;
        if (fileBlob) {
            url = URL.createObjectURL(fileBlob);
            setImageSrc(url);
        }
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [fileBlob]);

    return (
        <div className="image-preview">
            {imageSrc && (
                <a href={imageSrc} target="blank">
                    <img width={300} src={imageSrc} alt="Preview" />
                </a>
            )}
        </div>
    );
}
export default ImagePreview;