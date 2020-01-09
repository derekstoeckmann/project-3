import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Map from "../../components/Map/Map.js";
import Wrapper from "../../components/Wrapper/Wrapper";
import DateTime from "../../components/DateTime/DateTime";
import EventHighlights from "../../components/EventHighlights/EventHighlights";

import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CurrentUserEmail from "../../utils/CurrentUserEmail";

import styles from "./CreateEvent.module.css";

const CreateEvent = props => {
  const { currentUserData } = useContext(CurrentUserEmail);

  const [eventIsPublic, setEventIsPublic] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [highlightsChecked, setHighlightsChecked] = useState(false);
  const [byoChecked, setByoChecked] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [highlight1, setHighlight1] = useState("");
  const [highlight2, setHighlight2] = useState("");
  const [highlight3, setHighlight3] = useState("");
  const [highlight4, setHighlight4] = useState("");
  const [highlight5, setHighlight5] = useState("");
  const [byoItemType, setByoItemType] = useState("");
  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
    mapPosition: {
      lat: 33.4200832,
      lng: -111.91664639999999
    },
    markerPosition: {
      lat: 33.4200832,
      lng: -111.91664639999999
    }
  });

  useEffect(() => {
    if (window.navigator) {
      window.navigator.geolocation.getCurrentPosition(function (pos) {
        const { latitude, longitude } = pos.coords;
        setLocationData({
          address: "",
          city: "",
          state: "",
          zipcode: "",
          mapPosition: {
            lat: latitude,
            lng: longitude
          },
          markerPosition: {
            lat: latitude,
            lng: longitude
          }
        });
      });
    }
  }, []);

  const toggleEventIsPublic = () => {
    setEventIsPublic(!eventIsPublic);
  };

  const createEventHandler = event => {
    event.preventDefault();

    const eventData = {
      user: currentUserData._id,
      title: eventTitle,
      description: eventDescription,
      time: selectedDate,
      location: {
        type: "Point",
        coordinates: [
          locationData.markerPosition.lng,
          locationData.markerPosition.lat
        ],
        name: locationName,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        zipcode: locationData.zipcode
      },
      public: eventIsPublic,
      locationName: locationName,
      highlights: [highlight1, highlight2, highlight3, highlight4, highlight5],
      byoItemType: byoItemType
    };


    console.log(eventData);

    axios
      .post("/api/events", eventData)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  //THIS IS HERE TO REMIND TO DO THE SHOW/HIDE
  // showHideDiv({ checked, myDivId }) {
  // console.log(checked)
  // const myDisplay = document.getElementById(myDivId);
  // if (checked) {
  //   myDisplay.style.display = "inline";
  // } else {
  //   myDisplay.style.display = "none";
  // }
  // }

  return (
    <Wrapper>
      <Container maxWidth="lg" className={styles["main"]}>
        <Grid
          container
          direction="row"
          justify="center"
          className={styles["main-inner"]}
        >
          <div className={styles["pageDiv"]}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item md={5}>
                <h1>Create Event</h1>
              </Grid>
              <Grid item md={6}>
                <br />
                Semi-Private&nbsp;
                <FormControlLabel
                  control={
                    <Switch
                      checked={eventIsPublic}
                      onChange={toggleEventIsPublic}
                      color="primary"
                    />
                  }
                />
                &nbsp;Public
                <br />
                <br />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item md={6}>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="event-title"
                      label="Event Title"
                      value={eventTitle}
                      onChange={event => setEventTitle(event.target.value)}
                      variant="outlined"
                      size="small"
                      className={styles["data-value-input"]}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="location-name"
                      label="Location Name"
                      value={locationName}
                      onChange={event => setLocationName(event.target.value)}
                      variant="outlined"
                      size="small"
                      className={styles["data-value-input"]}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="address"
                      label="Address"
                      defaultValue=""
                      value={locationData.address}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                      size="small"
                      className={styles["data-value-input"]}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="city"
                      label="City"
                      defaultValue=""
                      value={locationData.city}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                      size="small"
                      className={styles["data-value-input"]}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="state"
                      label="State"
                      defaultValue=""
                      value={locationData.state}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                      size="small"
                      className={styles["data-value-input"]}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="zip"
                      label="Zip Code"
                      defaultValue=""
                      value={locationData.zipcode}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                      size="small"
                      className={styles["data-value-input"]}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item>
                    <DateTime
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                  </Grid>
                  <Grid item style={{ width: "400px" }}>
                    <Map
                      {...locationData}
                      setLocationData={setLocationData}
                      google={props.google}
                      center={{ lat: 33.4200832, lng: -111.91664639999999 }}
                      height="300px"
                      zoom={17}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <br />
              <br />
              <br />
              <br />
            </Grid>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}
              width="100%"
            >
              <Grid item>
                <span className={styles["data-key"]}>Highlights</span> (Up to 5){" "}
                <Checkbox
                  onChange={event => setHighlightsChecked(!highlightsChecked)}
                  checked={highlightsChecked}
                  value="highlightsCheck"
                  color="primary"
                  inputProps={{ 'aria-label': 'highlights checkbox' }}
                />
              </Grid>
              {highlightsChecked ? <EventHighlights
                highlight1={highlight1} setHighlight1={setHighlight1}
                highlight2={highlight2} setHighlight2={setHighlight2}
                highlight3={highlight3} setHighlight3={setHighlight3}
                highlight4={highlight4} setHighlight4={setHighlight4}
                highlight5={highlight5} setHighlight5={setHighlight5}
              /> : null}

              <Grid item>
                <span className={styles["data-key"]}>Bring your own?</span>{" "}
                <Checkbox
                  onChange={event => setByoChecked(!byoChecked)}
                  checked={byoChecked}
                  value="byoCheck"
                  color="primary"
                  inputProps={{ 'aria-label': 'byo checkbox' }}
                />
                {byoChecked ?
                  <TextField
                    id="byo"
                    label="Bring Your Own ____"
                    value={byoItemType}
                    onChange={event => setByoItemType(event.target.value)}
                    variant="outlined"
                    size="small"
                    className={styles["data-value-input"]}
                  />
                  : null}
              </Grid>

              <Grid item xs={12} className={styles["tableFullWidth"]}>
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label="Event Description"
                  multiline
                  fullWidth
                  rows="7"
                  defaultValue=""
                  value={eventDescription}
                  onChange={event => setEventDescription(event.target.value)}
                  variant="outlined"
                  size="small"
                  className={styles["textarea"]}
                />
                <br />
                <br />
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <br />
                <br />
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
              >
                <Grid item>
                  <Button
                    onClick={createEventHandler}
                    variant="contained"
                    color="primary"
                  >
                    Create Event
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Update Event
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    Cancel Event
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <br />
                <br />
                <br />
                <br />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default CreateEvent;
