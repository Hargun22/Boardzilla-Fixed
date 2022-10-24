import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Weather from "_widgets/Weather/Weather";
import { attemptGetWeather } from "_thunks/weather";

export const WeatherPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { weather } = useSelector(R.pick(["weather"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetWeather()).then(() => {
        setLoading(false);
      });
    }
  }, []);
  return (
    !loading && (
      <div>
        <>
          {(weather && weather.length && (
            <ul className="sticky-list container">
              {weather.map((widget) => (
                <li key={widget.id}>
                  <Weather {...widget} remove={() => {}} />
                  <hr />
                </li>
              ))}
            </ul>
          )) || (
            <div className="is-size-3 has-text-centered m-3">
              You don't currently have any weather widgets.
            </div>
          )}
        </>
      </div>
    )
  );
};
export default WeatherPage;
