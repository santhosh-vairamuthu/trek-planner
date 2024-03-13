import requests

def get_category():
    category = {
        "Arts and Entertainment" : "10000",
        "Landmarks and Outdoors" : "16000",
        "Spiritual Center / Temple" : "12111",
        "Museum" : "10027",
        "Monument" : "16026",
        "Historic and Protected Site" : "16020",
        "Scenic Lookout, Nature view points" : "16046"

    }

    pass
def get_lat_long(city_name, api_key):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    if data["total_results"] > 0:
        lat = data["results"][0]["geometry"]["lat"]
        lon = data["results"][0]["geometry"]["lng"]
        return lat, lon
    else:
        return None, None

def find_tourist_attractions(lat, lon):
    url = "https://api.foursquare.com/v3/places/search"

    headers = {
        "accept": "application/json",
        "Authorization": "fsq30t26NIz0zbvZ+44dbg4RJePX+Tf7xawhjYXSiN8f7+Y="
    }

    params = {
        "ll": f"{lat},{lon}",
        "categories" : "16046,16000,10000,10027",
        "limit" : 25
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        results = data.get("results", [])

        attractions = []
        for result in results:
            attraction_details = {
                "fsq_id" : result["fsq_id"],
                "name": result["name"],
                "category": result["categories"][0]["name"] if result["categories"] else None,
                "distance": result["distance"],
                "latitude": result["geocodes"]["main"]["latitude"],
                "longitude": result["geocodes"]["main"]["longitude"]
            }
            attractions.append(attraction_details)

        return attractions
    else:
        print("Error:", response.status_code)
        return None


# Main function
def getPlaceData(cityName):
    # Get user input for city name
    city_name = cityName

    # OpenCage API key
    opencage_api_key = "5cbe467dfd36484d9b873589b7864a6a"


    # Get latitude and longitude of the city
    lat, lon = get_lat_long(city_name, opencage_api_key)

    if lat is not None and lon is not None:
        # print(f"Latitude: {lat}, Longitude: {lon}")

        # Find tourist attractions using Foursquare API
        return find_tourist_attractions(lat, lon)

        # print("\nTourist Attractions in", city_name + ":")
        # for i, attraction in enumerate(attractions, 1):
        #     print(f"{i}. {attraction}")
    else:
        print("Could not find the location of the city.")





