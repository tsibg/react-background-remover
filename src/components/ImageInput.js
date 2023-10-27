import React, { useState, useRef } from "react";
import { ReactComponent as IconPlaceItem } from "../assets/IconPlaceItem.svg";
function ImageInput({ onChange }) {
    const inputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasFile, setHasFile] = useState(false);

    const handleOnDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleOnDragLeave = (e) => {
        if (!e.target.classList.contains("drop-zone")) return;
        e.preventDefault();
        setIsDragging(false);
    };
    const handleOnDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        setHasFile(true);
        onChange(e.dataTransfer.files[0]);
    };

    return (
        <div className="image-input">
            <div
                className={"drop-zone "
                    + (isDragging ? "dragging " : "")
                    + (hasFile ? "selected " : "")
                }
                onDragOver={handleOnDragOver}
                onDragLeave={handleOnDragLeave}

                onClick={() => inputRef.current.click()}
                onDrop={handleOnDrop}
            >
                <IconPlaceItem className="icon" />
                {!isDragging && (<p>Drag and drop image here....</p>)}
                {isDragging && (<p>Drop it here!</p>)}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => { setHasFile(true); onChange(e.target.files[0]) }} />
            </div>
        </div>
    );
}
export default ImageInput;