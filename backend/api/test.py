import os
import openai


openai.api_key = "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"

def generate_response(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are an intelligent assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message['content']



def places(destination):
    user_input = f"Top 10 tourist places in and around {destination}."
    response = generate_response(user_input)
    print(response)

destination = input("Enter destination: ")
places_dict = places(destination)
print(places_dict)


