# Trek-Planner

Trek-Planner is a travel itinerary generator that allows users to create, modify, and save travel plans. It utilizes the Foursquare API and OpenCage API to find tourist attractions based on user input and offers various features like user authentication, blog writing, and viewing nearby tourist places using Leaflet maps.

## Features

- User authentication
- Trail verification generator based on user input (city name, days count, type of places to visit)
- Plan generation and modification
- Save and view travel plans
- Interactive maps using Leaflet
- Blog writing and viewing other blogs
- Find nearby tourist places using the browser's location feature
- Add places to a new or existing plan

## Technologies Used

- **Frontend:** React
- **Backend:** FastAPI
- **APIs:** Foursquare API, OpenCage API
- **Databases:** MySQL, MongoDB
- **Mapping:** Leaflet


## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.8+
- MySQL
- MongoDB

### Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/santhosh-vairamuthu/trek-planner.git
cd trek-planner
```

#### 2. Setup the Backend

##### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

##### Configure API Keys

Edit `backend/api/config.json` to add your OpenCage API key and Foursquare authorization header.

```json
{
    opencageApiKey: 'YOUR_OPENCAGE_API_KEY',
    foursquareAuthHeader: 'YOUR_FOURSQUARE_AUTH_HEADER'
};
```

##### Configure MySQL

Edit `backend/app/configs/localconfig.py` to add your MySQL connection details.


##### Configure MongoDB

Edit `backend/app/models/__init__.py` to add your MongoDB connection details.


##### Run the Backend

```bash
uvicorn main:app --reload
```

#### 3. Setup the Frontend

##### Install Dependencies

```bash
cd frontend
npm install
```

##### Run the Frontend

```bash
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Use the provided interface to sign up or log in.
3. Input your desired city, number of days, and types of places you wish to visit.
4. Generate your travel plan and modify it as needed.
5. Save your plan, write blogs, and explore nearby tourist attractions.

## Project Details

### User Authentication

The application supports user registration and login, ensuring that each user's data is secure and personalized.

### Trail Verification Generator

Users can input their desired city, the number of days they plan to stay, and the types of places they wish to visit. The application uses this input to generate a customized itinerary.

### Plan Generation and Modification

The generated plan can be modified by the user to better suit their preferences. Users can add or remove places, change the order of visits, and save the plan for future reference.

### Interactive Maps with Leaflet

The application integrates Leaflet to provide interactive maps. Users can view the locations of tourist attractions on the map, making it easier to plan their visits.

### Blog Writing and Viewing

Users can write blogs about their travel experiences and read blogs written by other users. This feature enhances community engagement and provides valuable insights for future travelers.

### Nearby Tourist Places

Using the browser's location feature, the application can find nearby tourist places and allow users to add them to their new or existing plans.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Contribution

Feel free to fork this project, make improvements, and submit pull requests. We welcome contributions from the community to make this project even better!

## Acknowledgments

- Thanks to Foursquare and OpenCage for their APIs.
- Special thanks to all contributors and users.

---

Feel free to replace placeholders like `YOUR_OPENCAGE_API_KEY`, `YOUR_FOURSQUARE_AUTH_HEADER`, `your_database_name`, etc., with your actual credentials and database details.
```

This `README.md` includes detailed project information and setup instructions without the project structure section and with the second point in the Frontend setup as a markdown code block.