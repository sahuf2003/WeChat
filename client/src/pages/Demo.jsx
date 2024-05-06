import React, { useState, useEffect, useRef } from "react";

const Demo = () => {
    const [ageData, setAgeData] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        let videoStream;

        // Access webcam and start streaming
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoStream = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error("Error accessing webcam:", error);
            });

        // Clean up function to stop streaming when component unmounts
        return () => {
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            captureFrame();
        }, 1000); // Capture frame every second

        return () => {
            clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, []); // Run only once on mount

    const captureFrame = () => {
        // Ensure video stream and canvas are available
        if (!videoRef.current || !canvasRef.current) return;

        // Draw current video frame onto canvas
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to base64 data URL
        const imageData = canvas.toDataURL("image/jpeg");

        // Send image data to Flask backend for age detection
        fetch("http://localhost:5000/detect_age", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: imageData })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setAgeData(data.ages);
                console.log(data.ages);
            })
            .catch(error => {
                console.error("Error detecting age:", error);
            });
    };

    return (
        <div>
            <h1>Age Detection Demo</h1>
            <div>
                {/* Video feed */}
                <video
                    ref={videoRef}
                    autoPlay
                    style={{ width: "100%", maxWidth: "640px", height: "auto" }}
                />
            </div>
            <div>
                {/* Canvas for capturing video frames */}
                <canvas
                    ref={canvasRef}
                    style={{ display: "none" }}
                    width={640}
                    height={480}
                />
            </div>
            <div>
                {/* Display age data */}
                {ageData && ageData.map(
                    (age, index) => (
                        <h4 key={index}>Face {index + 1}: Estimated age - {age}</h4>
                    )
                )
                }
            </div>
        </div>
    );
};

export default Demo;
