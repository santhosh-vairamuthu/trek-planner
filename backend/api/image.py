import requests
import json
from IPython.display import Image, display

url = "https://api.foursquare.com/v3/places/50013c0ae4b034c2936edf2c"

headers = {
    "accept": "application/json",
    "Authorization": "fsq30t26NIz0zbvZ+44dbg4RJePX+Tf7xawhjYXSiN8f7+Y="
}

response = requests.get(url, headers=headers)

# Parse JSON response
data = json.loads(response.text)

# Print formatted JSON
print(json.dumps(data, indent=4))

# Display image
# Assuming you have already parsed the JSON response and obtained the relevant prefix and suffix
icon_prefix = data['categories'][0]['icon']['prefix']
icon_suffix = data['categories'][0]['icon']['suffix']

# Construct the photo URL
photo_url = f"{icon_prefix}original{icon_suffix}"

# Print the URL to verify
print(photo_url)

