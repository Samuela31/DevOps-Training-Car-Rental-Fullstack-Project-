# ==========================
# 1️⃣ Build Stage
# ==========================
FROM maven:3.9.8-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy only pom.xml first (to cache dependencies)
COPY pom.xml .

# Download dependencies (offline for faster builds)
RUN mvn dependency:go-offline -B

# Copy full source code
COPY src ./src

# Run tests and build the jar
RUN mvn clean package -DskipTests=false -Dtest='!CarRentalSpringApplicationTests'

# ==========================
# 2️⃣ Runtime Stage
# ==========================
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

