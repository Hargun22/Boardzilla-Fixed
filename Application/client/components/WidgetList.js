import React, { useState, useEffect, useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Sticky from "_widgets/StickyNotes/Sticky";
import Stock from "_widgets/Stock/Stock";
import News from "_widgets/News/News";
import Weather from "_widgets/Weather/Weather";
import Cal from "_pages/Cal";
import { attemptUpdateCalendarLayout } from "_thunks/user";
import { attemptGetWeather, attemptUpdateWeatherLayout } from "_thunks/weather";
import { attemptGetNews, attemptUpdateNewsLayout } from "_thunks/news";
import {
  attemptGetStickies,
  attemptUpdateStickyLayout,
} from "_thunks/stickies";
import { attemptGetStocks, attemptUpdateStockLayout } from "_thunks/stocks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import AddWidgetModal from "_widgets/AddWidgetModal";
export const WidgetList = () => {
  const [layouts, setLayouts] = useState([]);
  const [widgetCounter, setWidgetCounter] = useState(0);
  const [newWidgetType, setNewWidgetType] = useState("Sticky");
  const [addWidget, setAddWidget] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { stocks } = useSelector(R.pick(["stocks"]));
  const { stickies } = useSelector(R.pick(["stickies"]));
  const { news } = useSelector(R.pick(["news"]));
  const { weather } = useSelector(R.pick(["weather"]));
  const [difference, setDifference] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [added, setAdded] = useState(false);

  const setAllLayouts = useCallback(() => {
    const allLayouts = [];
    allLayouts.push(
      (user.calendarPos && {
        i: user.id,
        x: user.calendarPos.x || 0,
        y: user.calendarPos.y || 0,
        h: user.calendarPos.height || 4,
        w: user.calendarPos.width || 3,
        minH: 3,
        minW: 3,
      }) || { i: user.id, x: 0, y: 0, h: 4, w: 3, minH: 3, minW: 3 }
    );

    stickies.map((sticky) => {
      const newWidget = {
        i: sticky.id,
        x: sticky.x, // 3 is the multiplier
        y: sticky.y, // puts it at the bottom
        w: sticky.width,
        h: sticky.height,
        minH: 1,
        minW: 2,
      };

      allLayouts.push(newWidget);
    });

    stocks.map((stock) => {
      const newWidget = {
        i: stock.id,
        x: stock.x, // 3 is the multiplier
        y: stock.y, // puts it at the bottom
        w: stock.width,
        h: stock.height,
        minH: 2,
        minW: 3,
      };

      allLayouts.push(newWidget);
    });
    news.map((news) => {
      const newWidget = {
        i: news.id,
        x: news.x, // 3 is the multiplier
        y: news.y, // puts it at the bottom
        w: news.width,
        h: news.height,
        minH: 2,
        minW: 3,
      };

      allLayouts.push(newWidget);
    });

    weather.map((weather) => {
      const newWidget = {
        i: weather.id,
        x: weather.x, // 3 is the multiplier
        y: weather.y, // puts it at the bottom
        w: weather.width,
        h: weather.height,
        minH: 2,
        minW: 3,
      };

      allLayouts.push(newWidget);
    });
    setLayouts(allLayouts);
  });

  useEffect(() => {
    if (newWidgetType === "Sticky" && stickies.length > 0) {
      const newWidget = {
        i: stickies[stickies.length - 1].id,
        x: stickies[stickies.length - 1].x, // 3 is the multiplier
        y: stickies[stickies.length - 1].y, // puts it at the bottom
        w: stickies[stickies.length - 1].width,
        h: stickies[stickies.length - 1].height,
        minH: 1,
        minW: 2,
      };
      const allLayouts = Array.from(layouts);
      allLayouts.push(newWidget);
      setLayouts(allLayouts);
    } else if (newWidgetType === "Stock" && stocks.length > 0) {
      const newWidget = {
        i: stocks[stocks.length - 1].id,
        x: stocks[stocks.length - 1].x, // 3 is the multiplier
        y: stocks[stocks.length - 1].y, // puts it at the bottom
        w: stocks[stocks.length - 1].width,
        h: stocks[stocks.length - 1].height,
        minH: 2,
        minW: 3,
      };
      const allLayouts = Array.from(layouts);
      allLayouts.push(newWidget);
      setLayouts(allLayouts);
    } else if (newWidgetType === "News" && news.length > 0) {
      const newWidget = {
        i: news[news.length - 1].id,
        x: news[news.length - 1].x, // 3 is the multiplier
        y: news[news.length - 1].y, // puts it at the bottom
        w: news[news.length - 1].width,
        h: news[news.length - 1].height,
        minH: 2,
        minW: 3,
      };
      const allLayouts = Array.from(layouts);
      allLayouts.push(newWidget);
      setLayouts(allLayouts);
    } else if (newWidgetType === "Weather" && weather.length > 0) {
      const newWidget = {
        i: weather[weather.length - 1].id,
        x: weather[weather.length - 1].x, // 3 is the multiplier
        y: weather[weather.length - 1].y, // puts it at the bottom
        w: weather[weather.length - 1].width,
        h: weather[weather.length - 1].height,
        minH: 2,
        minW: 3,
      };
      const allLayouts = Array.from(layouts);
      allLayouts.push(newWidget);
      setLayouts(allLayouts);
    }
  }, [added]);

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      const stickyWidgets = dispatch(attemptGetStickies());
      const stocksWidgets = dispatch(attemptGetStocks());
      const newsWidgets = dispatch(attemptGetNews());
      const weatherWidgets = dispatch(attemptGetWeather());
      Promise.allSettled([
        stickyWidgets,
        stocksWidgets,
        newsWidgets,
        weatherWidgets,
      ]).then(() => {
        setAllLayouts();
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setWidgetCounter(layouts.length);
  }, [layouts]);

  const onLayoutChange = useCallback((layout) => {
    let differentLayout = layout.filter((newLayout, index) => {
      if (
        layouts[index].x !== newLayout.x ||
        layouts[index].y !== newLayout.y ||
        layouts[index].w !== newLayout.w ||
        layouts[index].h !== newLayout.h
      ) {
        return newLayout;
      }
    });

    var updated = 0;
    const newArray = Array.from(difference);
    differentLayout.map((newDifferentLayout) => {
      var foundLayout = 0;
      difference.map((existingDifferentLayouts, index) => {
        if (newDifferentLayout.i === existingDifferentLayouts.i) {
          newArray[index] = newDifferentLayout;
          foundLayout = 1;
          updated = 1;
        }
      });
      if (foundLayout == 0) {
        newArray.push(newDifferentLayout);
        updated = 1;
      }
    });

    setDifference(newArray);

    if (updated == 1) {
      setDisabled(false);
    }

    setLayouts(layout);
  });

  const selectType = useCallback((e) => {
    setNewWidgetType(e.target.value);
  });

  const add = useCallback(() => {
    setAddWidget(true);
  });

  const save = useCallback(() => {
    difference.map((newLayout) => {
      if (stickies.filter((sticky) => newLayout.i == sticky.id).length == 1) {
        dispatch(
          attemptUpdateStickyLayout(
            newLayout.i,
            newLayout.x,
            newLayout.y,
            newLayout.w,
            newLayout.h
          )
        );
      } else if (
        stocks.filter((stock) => newLayout.i == stock.id).length == 1
      ) {
        dispatch(
          attemptUpdateStockLayout(
            newLayout.i,
            newLayout.x,
            newLayout.y,
            newLayout.w,
            newLayout.h
          )
        );
      } else if (news.filter((news) => newLayout.i == news.id).length == 1) {
        dispatch(
          attemptUpdateNewsLayout(
            newLayout.i,
            newLayout.x,
            newLayout.y,
            newLayout.w,
            newLayout.h
          )
        );
      } else if (
        weather.filter((weather) => newLayout.i == weather.id).length == 1
      ) {
        dispatch(
          attemptUpdateWeatherLayout(
            newLayout.i,
            newLayout.x,
            newLayout.y,
            newLayout.w,
            newLayout.h
          )
        );
      } else if (user.id == newLayout.i) {
        dispatch(
          attemptUpdateCalendarLayout(
            newLayout.i,
            newLayout.x,
            newLayout.y,
            newLayout.w,
            newLayout.h
          )
        );
      }
    });
    setDifference([]);
    setDisabled(true);
  });
  const closeModal = useCallback(() => {
    setAddWidget(false);
  });

  const widgetCount = useCallback(() => {
    setWidgetCounter((prevState) => prevState + 1);
  });

  const updateList = useCallback(() => {
    setAdded(!added);
  });

  const remove = useCallback((id) => {
    const updatedList = layouts.filter((removed) => {
      return removed.i !== id;
    });

    setLayouts(updatedList);
  });

  return (
    !loading && (
      <>
        <AddWidgetModal
          open={addWidget}
          closeModal={closeModal}
          widgetCount={widgetCount}
          x={(widgetCounter * 4) % 12}
          y={Math.floor((widgetCounter * 4) / 12)}
          updateList={updateList}
          widgetType={newWidgetType}
        />
        <div className="px-5 is-flex is-align-items-center is-justify-content-space-between is-flex-wrap-wrap">
          {/* <!-- Left side --> */}
          <div className="mr-2 mb-2">
            <p
              className={"has-text-weight-semibold is-size-4"}
            >{`${user.username}'s Widgets`}</p>
          </div>

          {/* <!-- Right side --> */}
          <div className="is-flex is-align-items-center mb-2">
            <div className="control mr-2">
              <div className="select">
                <select onChange={selectType} value={newWidgetType}>
                  <option value="Sticky">Sticky</option>
                  <option value="News">News</option>
                  <option value="Weather">Weather</option>
                  <option value="Stock">Stock</option>
                </select>
              </div>
            </div>

            <p className="mr-2">
              <button className="button is-link" onClick={add}>
                <span className="icon">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </button>
            </p>
            <p>
              <button
                className="button is-link"
                onClick={save}
                disabled={disabled}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faSave} />
                </span>
              </button>
            </p>
          </div>
        </div>

        <ResponsiveReactGridLayout
          className="layout"
          onLayoutChange={onLayoutChange}
        >
          {layouts.map((widgetLayout) => {
            const sticky = stickies.filter(
              (sticky) => sticky.id == widgetLayout.i
            )[0];
            const stock = stocks.filter(
              (stock) => stock.id == widgetLayout.i
            )[0];
            const newNews = news.filter((New) => New.id == widgetLayout.i)[0];
            const newWeather = weather.filter(
              (New) => New.id == widgetLayout.i
            )[0];
            return (
              <div
                style={{
                  height: `100%`,
                }}
                key={widgetLayout.i}
                data-grid={widgetLayout}
              >
                {widgetLayout.i === user.id && <Cal key={user.id} />}
                {sticky && (
                  <Sticky key={sticky.id} remove={remove} {...sticky} />
                )}
                {stock && <Stock key={stock.id} remove={remove} {...stock} />}
                {newNews && (
                  <News key={newNews.id} remove={remove} {...newNews} />
                )}
                {newWeather && (
                  <Weather
                    key={newWeather.id}
                    remove={remove}
                    {...newWeather}
                  />
                )}
              </div>
            );
          })}
        </ResponsiveReactGridLayout>
      </>
    )
  );
};

export default WidgetList;
