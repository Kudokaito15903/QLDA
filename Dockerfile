# --- Build Stage ---
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
    
# Copy toàn bộ thư mục server vào container
COPY server /app
    
# Build project trong container
RUN ./mvnw clean package -DskipTests
    
# --- Run Stage ---
FROM openjdk:17-jdk-slim
WORKDIR /app
    
# Copy file jar từ stage build
COPY --from=build /app/target/*.jar app.jar
    
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
    