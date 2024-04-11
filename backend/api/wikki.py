import requests
import urllib.parse

def find_city_image(city_name):
    api_key = "43339521-46946beba55553ad4ea2897e3"
    encoded_city_name = urllib.parse.quote(city_name)  # Encode the city name
    api_url = f"https://pixabay.com/api/?key={api_key}&q={encoded_city_name}&image_type=photo"

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

        # Filter images based on tags containing the city name
        city_tag = city_name.lower().replace(" ", "")
        relevant_images = [img for img in data["hits"] if city_tag in img["tags"].lower()]

        if relevant_images:
            # Extract the URL of the first relevant image
            image_url = relevant_images[0]["largeImageURL"]
            return image_url
        else:
            print("No relevant images found.")
            return None
    except requests.RequestException as e:
        print("Error fetching data:", e)
        return None

# Example usage:
city_name = "chennai"
image_url = find_city_image(city_name)
if image_url:
    print("Image URL:", image_url)
else:
    print("No image found.")
