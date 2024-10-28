import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NASA_API_KEY = 'FjlNPm2oMlUVo21oWPEUsbvekn6lXAW4FQKtvZhv'; // Replace with your NASA API key

export default function App() {
  const [asteroidID, setAsteroidID] = useState('');
  const [asteroidData, setAsteroidData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Enable "Submit" button only when asteroid ID is entered
  const isSubmitDisabled = asteroidID.trim() === '';

  // Fetch asteroid data by ID
  const fetchAsteroidData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${NASA_API_KEY}`);
      setAsteroidData(response.data);
    } catch (error) {
      console.error('Error fetching asteroid data:', error);
      alert('Asteroid not found. Please enter a valid ID.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch random asteroid data
  const fetchRandomAsteroidData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${NASA_API_KEY}`);
      const randomAsteroid = response.data.near_earth_objects[Math.floor(Math.random() * response.data.near_earth_objects.length)];
      const asteroidResponse = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${randomAsteroid.id}?api_key=${NASA_API_KEY}`);
      setAsteroidData(asteroidResponse.data);
    } catch (error) {
      console.error('Error fetching random asteroid data:', error);
      alert('Error fetching random asteroid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NASA Asteroid Information</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Search Here"
        value={asteroidID}
        onChangeText={setAsteroidID}
      />
      
      <Button title="Submit" onPress={fetchAsteroidData} disabled={isSubmitDisabled} />
      
      <TouchableOpacity style={styles.randomButton} onPress={fetchRandomAsteroidData}>
        <Text style={styles.buttonText}>Random Asteroid</Text>
      </TouchableOpacity>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : asteroidData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: {asteroidData.name}</Text>
          <Text style={styles.infoText}>NASA JPL URL: {asteroidData.nasa_jpl_url}</Text>
          <Text style={styles.infoText}>
            Hazardous: {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: '80%',
  },
  randomButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 8,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 24,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
