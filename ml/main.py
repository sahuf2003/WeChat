from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import cv2
import numpy as np
from keras.models import load_model
import base64

app = Flask(__name__)
CORS(app)

# Load the pre-trained age detection model
model = load_model("age_model_acc.h5")
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Age ranges
age_ranges = ["1-2", "3-9", "10-17", "18-27", "28-45", "46-65", "66-116"]
# Load the face cascade classifier
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/video_feed")
def video_feed():
    def stream():
        cap = cv2.VideoCapture(0)  # Use 0 for default webcam
        while True:
            success, frame = cap.read()
            if not success:
                break
            else:
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, 1.3, 5)
                for i, (x, y, w, h) in enumerate(faces, 1):
                    age_image = cv2.resize(
                        gray[y : y + h, x : x + w],
                        (200, 200),
                        interpolation=cv2.INTER_AREA,
                    )
                    age_input = age_image.reshape(-1, 200, 200, 1)
                    output_age = age_ranges[np.argmax(model.predict(age_input))]
                    yield (
                        b"--frame\r\n"
                        b"Content-Type: image/jpeg\r\n\r\n"
                        + cv2.imencode(".jpg", frame)[1].tobytes()
                        + b"\r\n"
                        + b"Age: "
                        + output_age.encode()
                        + b"\r\n"
                    )
                    print(output_age)

    return Response(stream(), mimetype="multipart/x-mixed-replace; boundary=frame")


@app.route("/detect_age", methods=["POST"])
def detect_age():
    # Get image data from the request
    data = request.get_json()
    image_data = data["image"].split(",")[1]  # Remove data URL prefix

    # Convert base64 image data to numpy array
    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Perform face detection and age prediction
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    predicted_ages = []

    for x, y, w, h in faces:
        face_img = gray[y : y + h, x : x + w]
        face_img = cv2.resize(face_img, (200, 200))
        face_img = np.expand_dims(face_img, axis=0)
        face_img = np.expand_dims(face_img, axis=-1)
        age_prediction = age_ranges[np.argmax(model.predict(face_img))]
        predicted_ages.append(age_prediction)

    response = jsonify({"ages": predicted_ages})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(debug=True)
