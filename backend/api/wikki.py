import wikipediaapi

def get_place_description(place_name):
    # Specify a user agent string
    user_agent = "Trek Planner Bot/1.0 (https://yourwebsite.com)"
    wiki_wiki = wikipediaapi.Wikipedia('en')
    wiki_wiki.user_agent = user_agent  # Set the user agent after initializing the Wikipedia object
    page = wiki_wiki.page(place_name)
    if page.exists():
        return page.summary
    else:
        return "No description available."

def main():
    city_name = input("Enter the city name: ")
    description = get_place_description(city_name)
    print(f"\nDescription of {city_name}:")
    print(description)

if __name__ == "__main__":
    main()
