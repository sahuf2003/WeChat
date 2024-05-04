from flask import Flask, render_template, Response
import cv2
import numpy as np
from keras.models import load_model

app = Flask(__name__)

# Load the pre-trained age detection model
model = load_model('age_model_acc.h5')
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Age ranges
age_ranges = ['1-2', '3-9', '10-17', '18-27', '28-45', '46-65', '66-116']
# Load the face cascade classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def generate_frames():
    cap = cv2.VideoCapture(0)  # Use 0 for default webcam
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)
            for i, (x, y, w, h) in enumerate(faces, 1):
                cv2.rectangle(frame, (x, y), (x + w, y + h), (203, 12, 255), 2)
                age_image = cv2.resize(gray[y:y + h, x:x + w], (200, 200), interpolation=cv2.INTER_AREA)
                age_input = age_image.reshape(-1, 200, 200, 1)
                output_age = age_ranges[np.argmax(model.predict(age_input))]
                output_str = f"{i}: {output_age}"
                cv2.putText(frame, output_str, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
