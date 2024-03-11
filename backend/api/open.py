import requests

def get_place_details(location_name, api_key):
    url = "https://api.opencagedata.com/geocode/v1/json"
    params = {
        "q": location_name,
        "key": api_key
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data["results"]:
            place_details = {
                "formatted_address": data["results"][0]["formatted"],
                "components": data["results"][0]["components"],
                "coordinates": data["results"][0]["geometry"]
            }
            return place_details
    print("Failed to fetch place details.")
    return None

def main():
    api_key = "5cbe467dfd36484d9b873589b7864a6a"
    location_name = input("Enter the location name: ")
    place_details = get_place_details(location_name, api_key)
    if place_details:
        print("Place Details:")
        print(f"Formatted Address: {place_details['formatted_address']}")
        print("Address Components:")
        for key, value in place_details['components'].items():
            print(f"{key}: {value}")
        print("Coordinates:")
        print(f"Latitude: {place_details['coordinates']['lat']}")
        print(f"Longitude: {place_details['coordinates']['lng']}")
    else:
        print("Failed to fetch place details.")

if __name__ == "__main__":
    main()
