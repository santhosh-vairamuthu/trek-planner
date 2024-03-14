import requests

def find_tourist_spots(query):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        'q': query,
        'format': 'json',
        'tourism': 'attraction'  # Filter for tourist attractions
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    tourist_spots = []
    for place in data:
        tourist_spots.append({
            'name': place['display_name'],
            'latitude': place['lat'],
            'longitude': place['lon']
        })
    
    return tourist_spots

# Example usage
input_location = input("Enter a location: ")
tourist_spots = find_tourist_spots(input_location)

# Print the tourist spots found
for spot in tourist_spots:
    print(spot)
