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
        "Authorization": "fsq36P4uixz8udlRIt0Y/7hvtgyQZCLqkBkkR+Y1dQcUTYY="
    }

    params = {
        "ll": f"{lat},{lon}",
        "categories" : "16046,16000,10000,10027,16020,16046",
        "limit" : 20
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        results = data.get("results", [])

        attractions = []
        for result in results:
            urlDetail = f"https://api.foursquare.com/v3/places/{result['fsq_id']}/tips"

            headersDetail = {
                "accept": "application/json",
                "Authorization": "fsq36P4uixz8udlRIt0Y/7hvtgyQZCLqkBkkR+Y1dQcUTYY="
            }


            urlAddress = f"https://api.foursquare.com/v3/places/{result['fsq_id']}"

            headersAddress = {
                "accept": "application/json",
                "Authorization": "fsq36P4uixz8udlRIt0Y/7hvtgyQZCLqkBkkR+Y1dQcUTYY="
            }
            
            urlPhoto = f"https://api.foursquare.com/v3/places/{result['fsq_id']}/photos"

            headersPhoto = {
                "accept": "application/json",
                "Authorization": "fsq36P4uixz8udlRIt0Y/7hvtgyQZCLqkBkkR+Y1dQcUTYY="
            }

            responseData = requests.get(urlDetail, headers=headersDetail)
            responseAddress = requests.get(urlAddress, headers=headersAddress)
            responsePhoto = requests.get(urlPhoto, headers= headersPhoto)

            if responseData.status_code == 200:
                tip_data = responseData.json()
                tips = []

                for tip in tip_data:
                    tip_id = tip["id"]
                    created_at = tip["created_at"]
                    tip_text = tip["text"]

                    tip_info = {
                        "id": tip_id,
                        "created_at": created_at,
                        "text": tip_text
                    }

                    tips.append(tip_info)

                # Retrieve formatted address from the location field
                address = result["location"]["formatted_address"]
                
                
                imgUrl = None
                if responsePhoto.status_code == 200:
                    imageResponse = responsePhoto.json()
                    if len(imageResponse)!=0:
                        imgUrl =  f"{imageResponse[0]["prefix"]}original{imageResponse[0]["suffix"]}"
                else:
                    continue
                
                if not imgUrl:
                    continue

                if len(tips) > 3:
                    tips = tips[:3]
                attraction_details = {
                    "fsq_id" : result["fsq_id"],
                    "name": result["name"],
                    "category": result["categories"][0]["name"] if result["categories"] else None,
                    "latitude": result["geocodes"]["main"]["latitude"],
                    "longitude": result["geocodes"]["main"]["longitude"],
                    "review": tips,
                    "image" : imgUrl,
                    "address": address,
                }

                attractions.append(attraction_details)
            else:
                continue
            
        day,count = 1, 0
        for i in attractions:
            i["day"] = day
            count += 1
            if count == 3:
                day += 1
                count = 0



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





