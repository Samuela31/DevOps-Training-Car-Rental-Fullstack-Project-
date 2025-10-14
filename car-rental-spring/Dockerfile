# ==========================
# 1️⃣ Build Stage
# ==========================
FROM maven:3.9.8-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy only pom.xml first (to cache dependencies)
COPY pom.xml .

# Download dependencies (so next builds are faster)
RUN mvn dependency:go-offline -B

# Copy the full project
COPY src ./src

# Package the application (skip tests for faster builds)
RUN mvn clean package -DskipTests

# ==========================
# 2️⃣ Runtime Stage
# ==========================
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on (change if different)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
