// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Text, Grid } from 'theme-ui';

export const Logs = () => {
    const videoRef = useRef(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                setIsCameraEnabled(true);
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        const stopCamera = () => {
            const stream = videoRef.current.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                videoRef.current.srcObject = null;
                setIsCameraEnabled(false);
            }
        };

        if (isCameraEnabled) {
            startCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isCameraEnabled]);

    return (
        <>
            <Box>
                <div>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: ['1fr', '1fr 1fr'],
                            gridGap: 3,
                        }}
                    >
                        <Box sx={{ bg: 'primary', p: 3, color: 'black', textAlign: 'left' }}>
                            <video
                                ref={videoRef}
                                width={650}
                                height={360}
                                style={{ borderRadius: 23 }}
                                autoPlay
                                playsInline
                            />
                            <br /><br />
                            <Button
                                // className='option btn'
                                color='white'
                                onClick={() => setIsCameraEnabled((prev) => !prev)}
                                sx={{
                                    width: 650,
                                    height: 60,
                                    backgroundColor: isCameraEnabled ? 'black': 'lightgray',
                                    className: 'option btn',
                                    color: isCameraEnabled ? 'white' : 'black',
                                    fontWeight: 600,
                                    borderRadius: 5,
                                    '&:hover': {
                                        backgroundColor: isCameraEnabled ? 'black' : 'black',
                                        color: 'white',
                                        transition: 'ease-in-out',
                                        transitionDuration: '0.2s',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <Text>{isCameraEnabled ? 'Stop Scan' : 'Start Scan'}</Text>
                            </Button>
                        </Box>
                        <Box sx={{ bg: 'secondary', p: 3, pl: 5, color: 'black', textAlign: 'left', fontSize: 35, fontWeight: 'bold' }}>
                            <Text>Wechat</Text>
                        </Box>
                    </Box>
                </div>
            </Box>
        </>
    );
};
