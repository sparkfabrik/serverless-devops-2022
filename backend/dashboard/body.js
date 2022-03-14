module.exports.getDataBody = async ({ options, resolveVariable }) => {
  const region = await resolveVariable('self:provider.region');
  return `{
    "start": "-PT24H",
    "widgets": [
      {
        "height": 3,
        "width": 6,
        "y": 0,
        "x": 0,
        "type": "metric",
        "properties": {
          "metrics": [
            [ "ProfileApp", "CreatedProfiles", "Stage", "${options.stage}" ]
          ],
          "view": "singleValue",
          "region": "${region}",
          "liveData": false,
          "setPeriodToTimeRange": true,
          "stat": "Sum",
          "period": 86400,
          "widgetOptions": {
            "legend": {
              "position": "bottom"
            },
            "view": "timeSeries",
            "stacked": true,
            "rowsPerPage": 50,
            "widgetsPerRow": 2
          },
          "title": "Created profiles"
        }
      }
    ]
  }`;
};
