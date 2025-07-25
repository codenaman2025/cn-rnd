import cv2
import mediapipe as mp
import threading
import pygame

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# Initialize Pygame for sound
pygame.mixer.init()
pygame.mixer.music.load("alert.mp3")  # 🔊 Put your alert.mp3 in the same folder

def play_sound():
    if not pygame.mixer.music.get_busy():
        pygame.mixer.music.play()

# Utility functions
def get_eye_direction(landmarks):
    try:
        left_corner = landmarks[33]
        right_corner = landmarks[133]
        center_iris = landmarks[468]
        eye_range = right_corner.x - left_corner.x
        if eye_range == 0:
            return "center"
        iris_pos = (center_iris.x - left_corner.x) / eye_range
        if iris_pos < 0.42:
            return "left"
        elif iris_pos > 0.58:
            return "right"
        else:
            return "center"
    except IndexError:
        return "unknown"

def get_head_position(landmarks):
    try:
        nose_tip = landmarks[1]
        chin = landmarks[152]
        y_diff = chin.y - nose_tip.y
        return "down" if y_diff > 0.08 else "straight"
    except IndexError:
        return "unknown"

# Initialize webcam
cap = cv2.VideoCapture(0)

# Metrics
suspicious_frames = 0
total_frames = 0
consecutive_suspicious = 0
THRESHOLD_STREAK = 3  # needs 3 bad frames in a row to mark suspicious

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb)

    is_suspicious = False
    total_frames += 1

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            landmarks = face_landmarks.landmark
            if len(landmarks) < 478:
                continue

            head_position = get_head_position(landmarks)
            eye_direction = get_eye_direction(landmarks)

            # NEW LOGIC: Flag suspicious if:
            # - Head is down and eyes are not center
            # - OR eyes are not center, even if head is straight
            if (head_position == "down" and eye_direction != "center" and eye_direction != "unknown") or \
               (eye_direction != "center" and eye_direction != "unknown"):
                consecutive_suspicious += 1
            else:
                consecutive_suspicious = 0

            if consecutive_suspicious >= THRESHOLD_STREAK:
                is_suspicious = True
                suspicious_frames += 1
                cv2.putText(frame, "⚠️ Suspicious Activity!", (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 3)
                threading.Thread(target=play_sound).start()
            else:
                cv2.putText(frame, f"Head: {head_position}, Eyes: {eye_direction}", (30, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)

            # Draw face box
            x_list = [int(lm.x * w) for lm in landmarks]
            y_list = [int(lm.y * h) for lm in landmarks]
            x_min, x_max = min(x_list), max(x_list)
            y_min, y_max = min(y_list), max(y_list)
            cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)

    # Suspicious percentage bar
    suspicious_percent = int((suspicious_frames / total_frames) * 100) if total_frames > 0 else 0
    bar_length = int((suspicious_percent / 100) * 300)
    cv2.rectangle(frame, (20, h - 30), (20 + bar_length, h - 10), (0, 0, 255), -1)
    cv2.putText(frame, f"Suspicious: {suspicious_percent}%", (20, h - 40),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    cv2.imshow("Smart Proctoring System", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
pygame.mixer.quit()
