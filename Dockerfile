# Use .NET SDK for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY backend/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY backend/ ./
RUN dotnet publish -c Release -o out

# Use .NET runtime for running
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expose port
EXPOSE 3002

# Set environment variables
ENV ASPNETCORE_URLS=http://0.0.0.0:3002

# Run the application
ENTRYPOINT ["dotnet", "backend-csharp.dll"]
