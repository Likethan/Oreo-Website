import cv2
import os

os.makedirs("assets/frames", exist_ok=True)
cap = cv2.VideoCapture("assets/videos/oreo-hero.mp4")
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(f"Total video frames: {total}, FPS: {fps}, Resolution: {width}x{height}")

count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    count += 1
    filename = f"assets/frames/frame_{count:03d}.jpg"
    cv2.imwrite(filename, frame, [cv2.IMWRITE_JPEG_QUALITY, 90])

cap.release()
print(f"Extracted {count} frames successfully into assets/frames/!")
