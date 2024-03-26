import osmnx as ox

def get_tourist_places(city_name):
    try:
        # Retrieve the city boundary
        city = ox.geocode_to_gdf(city_name)

        # Retrieve geometries of POIs within the city boundary
        pois = ox.geometries_from_polygon(city.geometry.iloc[0], tags={"tourism": True})
        
        # Filter and extract the names of tourist places
        tourist_places = []
        for poi in pois:
            if isinstance(poi, dict) and poi.get('tags', {}).get('tourism') == 'attraction':
                tourist_places.append(poi.get('tags', {}).get('name', 'Unnamed'))

        return tourist_places
    
    except Exception as e:
        print("An error occurred:", e)
        return []

if __name__ == "__main__":
    city_name = input("Enter the name of the city: ")
    tourist_places = get_tourist_places(city_name)

    if tourist_places:
        print("Tourist places in", city_name + ":")
        for place in tourist_places:
            print("-", place)
    else:
        print("No tourist places found in", city_name)
