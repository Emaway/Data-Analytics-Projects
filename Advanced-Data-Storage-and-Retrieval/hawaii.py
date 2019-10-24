import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from time import strftime 
import datetime as dt

from flask import Flask, jsonify

#################################################
# Database Setup
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station
# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
app = Flask(__name__)

# Flask Routes

@app.route("/")
def Homepage():

    """List all routes that are available"""

    return (
        f"Welcome to hawaii 'Homepage'!<br/>"
        f"Available Routes with brief description:<br/>"
        f"weather precipitation<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"Available weather stations<br/>"
        f"/api/v1.0/stations<br/>"
        f"Temperature readings<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/temp/<start><br/>"  
        f"/api/v1.0/temp/<start>/<end>"   
    ) 

@app.route("/api/v1.0/precipitation")
def precipitation():

    """Convert the query results to a Dictionary using `date` as the key and `prcp` as the value.
       Return the JSON representation of your dictionary."""

    prcp_results = session.query(Measurement.date, Measurement.prcp).all()
    precipitation = []
    for prcp in prcp_results:
        prcp_dict = {}
        prcp_dict["date"] = prcp.date
        prcp_dict["prcp"] = prcp.prcp
        precipitation.append(prcp_dict)
    return jsonify(precipitation)

@app.route("/api/v1.0/stations")
def station():

    """Return a JSON list of stations from the dataset."""

    stations = session.query(Station.id, Station.name,\
    Station.station, Station.latitude,\
    Station.longitude, Station.elevation).all()
    
    all_stations = [station for station in stations]

    return jsonify(stations)

@app.route("/api/v1.0/tobs")
def tobs():

    """ Query for the dates and temperature observations from a year from the last data point.
        Return a JSON list of Temperature Observations (tobs) for the previous year."""

    prev_year = dt.date(2017,8,23) - dt.timedelta(days=365)

    results = session.query(Measurement.date, Measurement.tobs).filter(Measurement.date >= prev_year).all()

    all_temps = [tobs for tobs in results]
    return jsonify(results)

@app.route("/api/v1.0/temp/<start>")  

def start_temp(start):

    """When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than
       and equal to the start date."""

    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start).all()

    return jsonify(results)

@app.route("/api/v1.0/temp/<start>/<end>")
def start_to_end(start, end):

    """Return a JSON list of the minimum temperature, the average temperature, 
    and the max temperature for a given start or start-end range"""

    results = session.query(func.min(Measurement.tobs), func.max(Measurement.tobs),func.avg(Measurement.tobs)).\
        filter(Measurement.date >= start).\
            filter(Measurement.date <= end).all()
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, threaded=False)
