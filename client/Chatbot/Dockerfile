FROM python:3.10-slim

# Tạo thư mục và đặt làm thư mục làm việc
WORKDIR /app

# Copy tất cả file vào /app
COPY . .

# Cài các thư viện cần thiết
RUN pip install --upgrade pip && pip install -r requirements.txt

# Đặt thư mục làm việc thành src
WORKDIR /app/src

# Lệnh mặc định khi container khởi chạy
CMD ["python", "train.py"]
