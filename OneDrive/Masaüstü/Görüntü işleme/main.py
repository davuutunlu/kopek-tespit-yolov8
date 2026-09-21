import cv2
from ultralytics import YOLO

# 1. Adım: Önceden eğitilmiş YOLOv8 modelini yükle
model = YOLO('yolov8n.pt')

# Senin ayarladığın fotoğraf yolu
resim_yolu = "kopek.jpg" # Masaüstündeki dosya adın neyse uzantısıyla birlikte buraya yaz

# Görseli yükle
image = cv2.imread(resim_yolu)

if image is None:
    print(f"{resim_yolu} bulunamadı. Lütfen dosya yolunu ve uzantısını (.jpg veya .jfif) kontrol et.")
    exit()

# 2. Adım: Modeli görsel üzerinde çalıştır ve tespit yap
results = model(image, conf=0.5)

# 3. Adım: Tespit edilen sonuçları al ve çiz
kopek_sayisi = 0

for result in results:
    for box in result.boxes:
        cls_id = int(box.cls[0])
        cls_name = model.names[cls_id]

        # Eğer tespit edilen sınıf 'dog' (köpek) ise işlem yap
        if cls_name == 'dog':
            kopek_sayisi += 1

            coordinates = box.xyxy[0].tolist()
            x_min, y_min, x_max, y_max = map(int, coordinates)
            guven = round(float(box.conf[0]), 2)

            # Yeşil bir dikdörtgen çiz
            cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)

            # Üzerine etiket yaz
            etiket = f"Kopek: {guven}"
            cv2.putText(image, etiket, (x_min, y_min - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# 4. Adım: Sonuç görselini ekranda göster
print(f"Toplam {kopek_sayisi} adet köpek tespit edildi.")
cv2.imshow("Kopek Bulma Projesi (YOLOv8)", image)
cv2.waitKey(0)
cv2.destroyAllWindows()