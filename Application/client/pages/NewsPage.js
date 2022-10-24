import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import News from "_widgets/News/News";
import { attemptGetNews } from "_thunks/news";

export const NewsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { news } = useSelector(R.pick(["news"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetNews()).then(() => {
        setLoading(false);
      });
    }
  }, []);
  return (
    !loading && (
      <div>
        <>
          {(news && news.length && (
            <ul className="sticky-list container">
              {news.map((widget) => (
                <li key={widget.id}>
                  <News {...widget} remove={() => {}} />
                  <hr />
                </li>
              ))}
            </ul>
          )) || (
            <div className="is-size-3 has-text-centered m-3">
              You don't currently have any news widgets.
            </div>
          )}
        </>
      </div>
    )
  );
};
export default NewsPage;
