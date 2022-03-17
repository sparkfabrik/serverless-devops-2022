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

module.exports.getMonitoringBody = async ({ options, resolveVariable }) => {
  const service = await resolveVariable('self:service');
  const region = await resolveVariable('self:provider.region');
  return `{
    "start": "-PT24H",
    "widgets": [
      {
        "height": 15,
        "width": 24,
        "y": 0,
        "x": 0,
        "type": "explorer",
        "properties": {
          "metrics": [
            {
              "metricName": "4XXError",
              "resourceType": "AWS::ApiGateway::RestApi",
              "stat": "Sum"
            },
            {
              "metricName": "5XXError",
              "resourceType": "AWS::ApiGateway::RestApi",
              "stat": "Sum"
            },
            {
              "metricName": "Count",
              "resourceType": "AWS::ApiGateway::RestApi",
              "stat": "Sum"
            },
            {
              "metricName": "Latency",
              "resourceType": "AWS::ApiGateway::RestApi",
              "stat": "Average"
            }
          ],
          "labels": [
            {
              "key": "Project",
              "value": "${service}"
            },
            {
              "key": "Environment",
              "value": "${options.stage}"
            }
          ],
          "widgetOptions": {
            "legend": {
              "position": "bottom"
            },
            "view": "timeSeries",
            "stacked": true,
            "rowsPerPage": 50,
            "widgetsPerRow": 2
          },
          "period": 900,
          "splitBy": "",
          "region": "${region}",
          "title": "API Gateway"
        }
      },
      {
        "height": 15,
        "width": 24,
        "y": 15,
        "x": 0,
        "type": "explorer",
        "properties": {
          "metrics": [
            {
              "metricName": "Invocations",
              "resourceType": "AWS::Lambda::Function",
              "stat": "Sum"
            },
            {
              "metricName": "Duration",
              "resourceType": "AWS::Lambda::Function",
              "stat": "Average"
            },
            {
              "metricName": "Errors",
              "resourceType": "AWS::Lambda::Function",
              "stat": "Sum"
            },
            {
              "metricName": "ConcurrentExecutions",
              "resourceType": "AWS::Lambda::Function",
              "stat": "Maximum"
            }
          ],
          "labels": [
            {
              "key": "Project",
              "value": "${service}"
            },
            {
              "key": "Environment",
              "value": "${options.stage}"
            }
          ],
          "widgetOptions": {
            "legend": {
              "position": "bottom"
            },
            "view": "timeSeries",
            "stacked": true,
            "rowsPerPage": 50,
            "widgetsPerRow": 2
          },
          "period": 900,
          "splitBy": "",
          "region": "${region}",
          "title": "Lambda"
        }
      }
    ]
  }`;
};
