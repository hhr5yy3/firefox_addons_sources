((parse) => {
  let subData = {};

  JSON.parse = function(text) {
    const data = parse(text);
    if (data && data.result && data.result.timedtexttracks && data.result.movieId) {
      subData[data.result.movieId] = {
        subs: data.result.timedtexttracks,
        movieId: data.result.movieId
      };
    }
    return data;
  };

  document.addEventListener("kr-get-subs-data", function(_event) {
    document.dispatchEvent(new CustomEvent("kr-get-subs-data-return", { detail: subData }));
  });
})(JSON.parse);