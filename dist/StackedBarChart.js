var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import React from "react";
import { View } from "react-native";
import { G, Rect, Svg, Text } from "react-native-svg";
import AbstractChart, {
  DEFAULT_X_LABELS_HEIGHT_PERCENTAGE
} from "./AbstractChart";
var StackedBarChart = /** @class */ (function(_super) {
  __extends(StackedBarChart, _super);
  function StackedBarChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.getBarPercentage = function() {
      var _a = _this.props.chartConfig.barPercentage,
        barPercentage = _a === void 0 ? 1 : _a;
      return barPercentage;
    };
    _this.getBarRadius = function(ret, x) {
      return _this.props.chartConfig.barRadius && ret.length === x.length - 1
        ? _this.props.chartConfig.barRadius
        : 0;
    };
    _this.renderBars = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        border = _a.border,
        colors = _a.colors,
        _b = _a.stackedBar,
        stackedBar = _b === void 0 ? false : _b,
        verticalLabelsHeightPercentage = _a.verticalLabelsHeightPercentage;
      return data.map(function(x, i) {
        var barWidth = 32 * _this.getBarPercentage();
        var ret = [];
        var h = 0;
        var st = paddingTop;
        var fac = 1;
        if (stackedBar) {
          fac = 0.7;
        }
        var sum = _this.props.percentile
          ? x.reduce(function(a, b) {
              return a + b;
            }, 0)
          : border;
        var barsAreaHeight = height * verticalLabelsHeightPercentage;
        for (var z = 0; z < x.length; z++) {
          h = barsAreaHeight * (x[z] / sum);
          var y = barsAreaHeight - h + st;
          var xC =
            (paddingRight +
              (i * (width - paddingRight)) / data.length +
              barWidth / 2) *
            fac;
          ret.push(
            <Rect
              key={Math.random()}
              x={xC}
              y={y}
              rx={_this.getBarRadius(ret, x)}
              ry={_this.getBarRadius(ret, x)}
              width={barWidth}
              height={h}
              fill={colors[z]}
            />
          );
          if (!_this.props.hideLegend) {
            ret.push(
              <Text
                key={Math.random()}
                x={xC + 7 + barWidth / 2}
                textAnchor="end"
                y={h > 15 ? y + 15 : y + 7}
                {..._this.getPropsForLabels()}
              >
                {x[z]}
              </Text>
            );
          }
          st -= h;
        }
        return ret;
      });
    };
    _this.renderLegend = function(_a) {
      var legend = _a.legend,
        colors = _a.colors,
        width = _a.width,
        height = _a.height;
      return legend.map(function(x, i) {
        return (
          <G key={Math.random()}>
            <Rect
              width="16px"
              height="16px"
              fill={colors[i]}
              rx={8}
              ry={8}
              x={width * 0.71}
              y={height * 0.7 - i * 50}
            />
            <Text
              x={width * 0.78}
              y={height * 0.76 - i * 50}
              {..._this.getPropsForLabels()}
            >
              {x}
            </Text>
          </G>
        );
      });
    };
    return _this;
  }
  StackedBarChart.prototype.render = function() {
    var paddingTop = 15;
    var paddingRight = 50;
    var barWidth = 32 * this.getBarPercentage();
    var _a = this.props,
      width = _a.width,
      height = _a.height,
      _b = _a.style,
      style = _b === void 0 ? {} : _b,
      data = _a.data,
      _c = _a.withHorizontalLabels,
      withHorizontalLabels = _c === void 0 ? true : _c,
      _d = _a.withVerticalLabels,
      withVerticalLabels = _d === void 0 ? true : _d,
      _e = _a.segments,
      segments = _e === void 0 ? 4 : _e,
      decimalPlaces = _a.decimalPlaces,
      _f = _a.percentile,
      percentile = _f === void 0 ? false : _f,
      _g = _a.verticalLabelsHeightPercentage,
      verticalLabelsHeightPercentage =
        _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g,
      _h = _a.formatYLabel,
      formatYLabel =
        _h === void 0
          ? function(yLabel) {
              return yLabel;
            }
          : _h,
      _j = _a.hideLegend,
      hideLegend = _j === void 0 ? false : _j,
      _k = _a.withHorizontalLines,
      withHorizontalLines = _k === void 0 ? false : _k;
    var _l = style.borderRadius,
      borderRadius = _l === void 0 ? 0 : _l;
    var config = {
      width: width,
      height: height
    };
    var border = 0;
    var max = 0;
    for (var i = 0; i < data.data.length; i++) {
      var actual = data.data[i].reduce(function(pv, cv) {
        return pv + cv;
      }, 0);
      if (actual > max) {
        max = actual;
      }
    }
    if (percentile) {
      border = 100;
    } else {
      border = max;
    }
    var showLegend = !hideLegend && data.legend && data.legend.length != 0;
    var stackedBar = showLegend;
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs(
            __assign(__assign({}, config), this.props.chartConfig)
          )}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {withHorizontalLines &&
              this.renderHorizontalLines(
                __assign(__assign({}, config), {
                  count: segments,
                  paddingTop: paddingTop,
                  verticalLabelsHeightPercentage: verticalLabelsHeightPercentage
                })
              )}
          </G>
          {withHorizontalLabels ? (
            <G>
              {this.renderHorizontalLabels(
                __assign(__assign({}, config), {
                  count: segments,
                  data: [0, border],
                  paddingTop: paddingTop,
                  paddingRight: paddingRight,
                  decimalPlaces: decimalPlaces,
                  verticalLabelsHeightPercentage: verticalLabelsHeightPercentage,
                  formatYLabel: formatYLabel
                })
              )}
            </G>
          ) : null}
          <G>
            {withVerticalLabels
              ? this.renderVerticalLabels(
                  __assign(__assign({}, config), {
                    labels: data.labels,
                    paddingRight: paddingRight + 28,
                    stackedBar: stackedBar,
                    paddingTop: paddingTop,
                    horizontalOffset: barWidth,
                    verticalLabelsHeightPercentage: verticalLabelsHeightPercentage
                  })
                )
              : null}
          </G>
          <G>
            {this.renderBars(
              __assign(__assign({}, config), {
                data: data.data,
                border: border,
                colors: this.props.data.barColors,
                paddingTop: paddingTop,
                paddingRight: paddingRight + 20,
                stackedBar: stackedBar,
                verticalLabelsHeightPercentage: verticalLabelsHeightPercentage
              })
            )}
          </G>
          {showLegend &&
            this.renderLegend(
              __assign(__assign({}, config), {
                legend: data.legend,
                colors: this.props.data.barColors
              })
            )}
        </Svg>
      </View>
    );
  };
  return StackedBarChart;
})(AbstractChart);
export default StackedBarChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tlZEJhckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YWNrZWRCYXJDaGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxJQUFJLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXRELE9BQU8sYUFBYSxFQUFFLEVBR3BCLGtDQUFrQyxFQUNuQyxNQUFNLGlCQUFpQixDQUFDO0FBMkR6QjtJQUE4QixtQ0FHN0I7SUFIRDtRQUFBLHFFQW9QQztRQWhQQyxzQkFBZ0IsR0FBRztZQUNULElBQUEsS0FBc0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLGNBQTNCLEVBQWpCLGFBQWEsbUJBQUcsQ0FBQyxLQUFBLENBQTRCO1lBQ3JELE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQUVGLGtCQUFZLEdBQUcsVUFBQyxHQUFtQixFQUFFLENBQWlCO1lBQ3BELE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUztnQkFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQztRQUVGLGdCQUFVLEdBQUcsVUFBQyxFQXNCYjtnQkFyQkMsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBLEVBQ04sVUFBVSxnQkFBQSxFQUNWLFlBQVksa0JBQUEsRUFDWixNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixrQkFBa0IsRUFBbEIsVUFBVSxtQkFBRyxLQUFLLEtBQUEsRUFDbEIsOEJBQThCLG9DQUFBO1lBYzlCLE9BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNaLElBQU0sUUFBUSxHQUFHLEVBQUUsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDOUMsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUM7Z0JBRXBCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDWixJQUFJLFVBQVUsRUFBRTtvQkFDZCxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUNYO2dCQUNELElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQzFFLElBQU0sY0FBYyxHQUFHLE1BQU0sR0FBRyw4QkFBOEIsQ0FBQztnQkFDL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2pDLENBQUMsR0FBRyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLElBQU0sQ0FBQyxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNsQyxJQUFNLEVBQUUsR0FDTixDQUFDLFlBQVk7d0JBQ1gsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTt3QkFDMUMsUUFBUSxHQUFHLENBQUMsQ0FBQzt3QkFDZixHQUFHLENBQUM7b0JBRU4sR0FBRyxDQUFDLElBQUksQ0FDTixDQUFDLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FDbkIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ0wsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDOUIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDOUIsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNWLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNoQixDQUNILENBQUM7b0JBRUYsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO3dCQUMxQixHQUFHLENBQUMsSUFBSSxDQUNOLENBQUMsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUNuQixDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FDekIsVUFBVSxDQUFDLEtBQUssQ0FDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUMzQixJQUFJLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBRTdCO2NBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ1A7WUFBQSxFQUFFLElBQUksQ0FBQyxDQUNSLENBQUM7cUJBQ0g7b0JBRUQsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDVDtnQkFFRCxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQztRQXBERixDQW9ERSxDQUFDO1FBRUwsa0JBQVksR0FBRyxVQUFDLEVBUWY7Z0JBUEMsTUFBTSxZQUFBLEVBQ04sTUFBTSxZQUFBLEVBQ04sS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBO1lBS04sT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUNwQjtVQUFBLENBQUMsSUFBSSxDQUNILEtBQUssQ0FBQyxNQUFNLENBQ1osTUFBTSxDQUFDLE1BQU0sQ0FDYixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ04sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUNoQixDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFFM0I7VUFBQSxDQUFDLElBQUksQ0FDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQ2hCLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUMxQixJQUFJLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBRTdCO1lBQUEsQ0FBQyxDQUFDLENBQ0o7VUFBQSxFQUFFLElBQUksQ0FDUjtRQUFBLEVBQUUsQ0FBQyxDQUFDLENBQ0wsQ0FBQztZQUNKLENBQUMsQ0FBQztRQXJCRixDQXFCRSxDQUFDOztJQTBIUCxDQUFDO0lBeEhDLGdDQUFNLEdBQU47UUFDRSxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQU0sUUFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QyxJQUFBLEtBZ0JGLElBQUksQ0FBQyxLQUFLLEVBZlosS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBLEVBQ04sYUFBVSxFQUFWLEtBQUssbUJBQUcsRUFBRSxLQUFBLEVBQ1YsSUFBSSxVQUFBLEVBQ0osNEJBQTJCLEVBQTNCLG9CQUFvQixtQkFBRyxJQUFJLEtBQUEsRUFDM0IsMEJBQXlCLEVBQXpCLGtCQUFrQixtQkFBRyxJQUFJLEtBQUEsRUFDekIsZ0JBQVksRUFBWixRQUFRLG1CQUFHLENBQUMsS0FBQSxFQUNaLGFBQWEsbUJBQUEsRUFDYixrQkFBa0IsRUFBbEIsVUFBVSxtQkFBRyxLQUFLLEtBQUEsRUFDbEIsc0NBQW1FLEVBQW5FLDhCQUE4QixtQkFBRyxrQ0FBa0MsS0FBQSxFQUNuRSxvQkFFQyxFQUZELFlBQVksbUJBQUcsVUFBQyxNQUFjO1lBQzVCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsS0FBQSxFQUNELGtCQUFrQixFQUFsQixVQUFVLG1CQUFHLEtBQUssS0FBQSxFQUNsQiwyQkFBMkIsRUFBM0IsbUJBQW1CLG1CQUFHLEtBQUssS0FDZixDQUFDO1FBRVAsSUFBQSxLQUFxQixLQUFLLGFBQVYsRUFBaEIsWUFBWSxtQkFBRyxDQUFDLEtBQUEsQ0FBVztRQUNuQyxJQUFNLE1BQU0sR0FBRztZQUNiLEtBQUssT0FBQTtZQUNMLE1BQU0sUUFBQTtTQUNQLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFZixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxFQUFFLEVBQUUsRUFBRSxJQUFLLE9BQUEsRUFBRSxHQUFHLEVBQUUsRUFBUCxDQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNoQixHQUFHLEdBQUcsTUFBTSxDQUFDO2FBQ2Q7U0FDRjtRQUVELElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNkO2FBQU07WUFDTCxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ2Q7UUFFRCxJQUFNLFVBQVUsR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUN6RSxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFOUIsT0FBTyxDQUNMLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNqQjtRQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUNoQztVQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsdUJBQ1gsTUFBTSxHQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUN6QixDQUNGO1VBQUEsQ0FBQyxJQUFJLENBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDWixNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FDZixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FDakIsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQ2pCLElBQUksQ0FBQywwQkFBMEIsRUFFakM7VUFBQSxDQUFDLENBQUMsQ0FDQTtZQUFBLENBQUMsbUJBQW1CO1lBQ2xCLElBQUksQ0FBQyxxQkFBcUIsdUJBQ3JCLE1BQU0sS0FDVCxLQUFLLEVBQUUsUUFBUSxFQUNmLFVBQVUsWUFBQTtnQkFDViw4QkFBOEIsZ0NBQUEsSUFDOUIsQ0FDTjtVQUFBLEVBQUUsQ0FBQyxDQUNIO1VBQUEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FDdEIsQ0FBQyxDQUFDLENBQ0E7Y0FBQSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsdUJBQ3ZCLE1BQU0sS0FDVCxLQUFLLEVBQUUsUUFBUSxFQUNmLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFDakIsVUFBVSxZQUFBO1lBQ1YsWUFBWSxjQUFBO1lBQ1osYUFBYSxlQUFBO1lBQ2IsOEJBQThCLGdDQUFBO1lBQzlCLFlBQVksY0FBQSxJQUNaLENBQ0o7WUFBQSxFQUFFLENBQUMsQ0FBQyxDQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDUjtVQUFBLENBQUMsQ0FBQyxDQUNBO1lBQUEsQ0FBQyxrQkFBa0I7WUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsdUJBQ3BCLE1BQU0sS0FDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFDbkIsWUFBWSxFQUFFLFlBQVksR0FBRyxFQUFFLEVBQy9CLFVBQVUsWUFBQTtnQkFDVixVQUFVLFlBQUEsRUFDVixnQkFBZ0IsRUFBRSxRQUFRLEVBQzFCLDhCQUE4QixnQ0FBQSxJQUM5QjtZQUNKLENBQUMsQ0FBQyxJQUFJLENBQ1Y7VUFBQSxFQUFFLENBQUMsQ0FDSDtVQUFBLENBQUMsQ0FBQyxDQUNBO1lBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSx1QkFDWCxNQUFNLEtBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsTUFBTSxRQUFBLEVBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFDakMsVUFBVSxZQUFBLEVBQ1YsWUFBWSxFQUFFLFlBQVksR0FBRyxFQUFFLEVBQy9CLFVBQVUsWUFBQTtZQUNWLDhCQUE4QixnQ0FBQSxJQUM5QixDQUNKO1VBQUEsRUFBRSxDQUFDLENBQ0g7VUFBQSxDQUFDLFVBQVU7WUFDVCxJQUFJLENBQUMsWUFBWSx1QkFDWixNQUFNLEtBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQ2pDLENBQ047UUFBQSxFQUFFLEdBQUcsQ0FDUDtNQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFwUEQsQ0FBOEIsYUFBYSxHQW9QMUM7QUFFRCxlQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFZpZXcsIFZpZXdTdHlsZSB9IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcbmltcG9ydCB7IEcsIFJlY3QsIFN2ZywgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XG5cbmltcG9ydCBBYnN0cmFjdENoYXJ0LCB7XG4gIEFic3RyYWN0Q2hhcnRDb25maWcsXG4gIEFic3RyYWN0Q2hhcnRQcm9wcyxcbiAgREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxufSBmcm9tIFwiLi9BYnN0cmFjdENoYXJ0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tlZEJhckNoYXJ0RGF0YSB7XG4gIGxhYmVsczogc3RyaW5nW107XG4gIGxlZ2VuZDogc3RyaW5nW107XG4gIGRhdGE6IG51bWJlcltdW107XG4gIGJhckNvbG9yczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tlZEJhckNoYXJ0UHJvcHMgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0UHJvcHMge1xuICAvKipcbiAgICogRS5nLlxuICAgKiBgYGBqYXZhc2NyaXB0XG4gICAqIGNvbnN0IGRhdGEgPSB7XG4gICAqICAgbGFiZWxzOiBbXCJUZXN0MVwiLCBcIlRlc3QyXCJdLFxuICAgKiAgIGxlZ2VuZDogW1wiTDFcIiwgXCJMMlwiLCBcIkwzXCJdLFxuICAgKiAgIGRhdGE6IFtbNjAsIDYwLCA2MF0sIFszMCwgMzAsIDYwXV0sXG4gICAqICAgYmFyQ29sb3JzOiBbXCIjZGZlNGVhXCIsIFwiI2NlZDZlMFwiLCBcIiNhNGIwYmVcIl1cbiAgICogfTtcbiAgICogYGBgXG4gICAqL1xuICBkYXRhOiBTdGFja2VkQmFyQ2hhcnREYXRhO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgY2hhcnRDb25maWc6IEFic3RyYWN0Q2hhcnRDb25maWc7XG4gIGhpZGVMZWdlbmQ6IGJvb2xlYW47XG4gIHN0eWxlPzogUGFydGlhbDxWaWV3U3R5bGU+O1xuICBiYXJQZXJjZW50YWdlPzogbnVtYmVyO1xuICBkZWNpbWFsUGxhY2VzPzogbnVtYmVyO1xuICAvKipcbiAgICogU2hvdyB2ZXJ0aWNhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxuICAgKi9cbiAgd2l0aFZlcnRpY2FsTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNob3cgaG9yaXpvbnRhbCBsYWJlbHMgLSBkZWZhdWx0OiBUcnVlLlxuICAgKi9cbiAgd2l0aEhvcml6b250YWxMYWJlbHM/OiBib29sZWFuO1xuICAvKipcbiAgICogU2hvdyBob3Jpem9udGFsIGxpbmVzIC0gZGVmYXVsdDogVHJ1ZS5cbiAgICovXG4gIHdpdGhIb3Jpem9udGFsTGluZXM/OiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBob3Jpem9udGFsIGxpbmVzXG4gICAqL1xuICBzZWdtZW50cz86IG51bWJlcjtcblxuICBwZXJjZW50aWxlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogUGVyY2VudGFnZSBvZiB0aGUgY2hhcnQgaGVpZ2h0LCBkZWRpY2F0ZWQgdG8gdmVydGljYWwgbGFiZWxzXG4gICAqIChzcGFjZSBiZWxvdyBjaGFydClcbiAgICovXG4gIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZT86IG51bWJlcjtcblxuICBmb3JtYXRZTGFiZWw/OiAoeUxhYmVsOiBzdHJpbmcpID0+IHN0cmluZztcbn1cblxudHlwZSBTdGFja2VkQmFyQ2hhcnRTdGF0ZSA9IHt9O1xuXG5jbGFzcyBTdGFja2VkQmFyQ2hhcnQgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0PFxuICBTdGFja2VkQmFyQ2hhcnRQcm9wcyxcbiAgU3RhY2tlZEJhckNoYXJ0U3RhdGVcbj4ge1xuICBnZXRCYXJQZXJjZW50YWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgYmFyUGVyY2VudGFnZSA9IDEgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XG4gICAgcmV0dXJuIGJhclBlcmNlbnRhZ2U7XG4gIH07XG5cbiAgZ2V0QmFyUmFkaXVzID0gKHJldDogc3RyaW5nIHwgYW55W10sIHg6IHN0cmluZyB8IGFueVtdKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hhcnRDb25maWcuYmFyUmFkaXVzICYmIHJldC5sZW5ndGggPT09IHgubGVuZ3RoIC0gMVxuICAgICAgPyB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmJhclJhZGl1c1xuICAgICAgOiAwO1xuICB9O1xuXG4gIHJlbmRlckJhcnMgPSAoe1xuICAgIGRhdGEsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHBhZGRpbmdUb3AsXG4gICAgcGFkZGluZ1JpZ2h0LFxuICAgIGJvcmRlcixcbiAgICBjb2xvcnMsXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxuICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVxuICB9OiBQaWNrPFxuICAgIE9taXQ8QWJzdHJhY3RDaGFydENvbmZpZywgXCJkYXRhXCI+LFxuICAgIHwgXCJ3aWR0aFwiXG4gICAgfCBcImhlaWdodFwiXG4gICAgfCBcInBhZGRpbmdSaWdodFwiXG4gICAgfCBcInBhZGRpbmdUb3BcIlxuICAgIHwgXCJzdGFja2VkQmFyXCJcbiAgICB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcbiAgPiAmIHtcbiAgICBib3JkZXI6IG51bWJlcjtcbiAgICBjb2xvcnM6IHN0cmluZ1tdO1xuICAgIGRhdGE6IG51bWJlcltdW107XG4gIH0pID0+XG4gICAgZGF0YS5tYXAoKHgsIGkpID0+IHtcbiAgICAgIGNvbnN0IGJhcldpZHRoID0gMzIgKiB0aGlzLmdldEJhclBlcmNlbnRhZ2UoKTtcbiAgICAgIGNvbnN0IHJldCA9IFtdO1xuICAgICAgbGV0IGggPSAwO1xuICAgICAgbGV0IHN0ID0gcGFkZGluZ1RvcDtcblxuICAgICAgbGV0IGZhYyA9IDE7XG4gICAgICBpZiAoc3RhY2tlZEJhcikge1xuICAgICAgICBmYWMgPSAwLjc7XG4gICAgICB9XG4gICAgICBjb25zdCBzdW0gPSB0aGlzLnByb3BzLnBlcmNlbnRpbGUgPyB4LnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApIDogYm9yZGVyO1xuICAgICAgY29uc3QgYmFyc0FyZWFIZWlnaHQgPSBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U7XG4gICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IHgubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgaCA9IGJhcnNBcmVhSGVpZ2h0ICogKHhbel0gLyBzdW0pO1xuICAgICAgICBjb25zdCB5ID0gYmFyc0FyZWFIZWlnaHQgLSBoICsgc3Q7XG4gICAgICAgIGNvbnN0IHhDID1cbiAgICAgICAgICAocGFkZGluZ1JpZ2h0ICtcbiAgICAgICAgICAgIChpICogKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSkgLyBkYXRhLmxlbmd0aCArXG4gICAgICAgICAgICBiYXJXaWR0aCAvIDIpICpcbiAgICAgICAgICBmYWM7XG5cbiAgICAgICAgcmV0LnB1c2goXG4gICAgICAgICAgPFJlY3RcbiAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgICAgICAgIHg9e3hDfVxuICAgICAgICAgICAgeT17eX1cbiAgICAgICAgICAgIHJ4PXt0aGlzLmdldEJhclJhZGl1cyhyZXQsIHgpfVxuICAgICAgICAgICAgcnk9e3RoaXMuZ2V0QmFyUmFkaXVzKHJldCwgeCl9XG4gICAgICAgICAgICB3aWR0aD17YmFyV2lkdGh9XG4gICAgICAgICAgICBoZWlnaHQ9e2h9XG4gICAgICAgICAgICBmaWxsPXtjb2xvcnNbel19XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGlkZUxlZ2VuZCkge1xuICAgICAgICAgIHJldC5wdXNoKFxuICAgICAgICAgICAgPFRleHRcbiAgICAgICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICAgICAgICB4PXt4QyArIDcgKyBiYXJXaWR0aCAvIDJ9XG4gICAgICAgICAgICAgIHRleHRBbmNob3I9XCJlbmRcIlxuICAgICAgICAgICAgICB5PXtoID4gMTUgPyB5ICsgMTUgOiB5ICsgN31cbiAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3hbel19XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0IC09IGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgcmVuZGVyTGVnZW5kID0gKHtcbiAgICBsZWdlbmQsXG4gICAgY29sb3JzLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodFxuICB9OiBQaWNrPEFic3RyYWN0Q2hhcnRDb25maWcsIFwid2lkdGhcIiB8IFwiaGVpZ2h0XCI+ICYge1xuICAgIGxlZ2VuZDogc3RyaW5nW107XG4gICAgY29sb3JzOiBzdHJpbmdbXTtcbiAgfSkgPT5cbiAgICBsZWdlbmQubWFwKCh4LCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RyBrZXk9e01hdGgucmFuZG9tKCl9PlxuICAgICAgICAgIDxSZWN0XG4gICAgICAgICAgICB3aWR0aD1cIjE2cHhcIlxuICAgICAgICAgICAgaGVpZ2h0PVwiMTZweFwiXG4gICAgICAgICAgICBmaWxsPXtjb2xvcnNbaV19XG4gICAgICAgICAgICByeD17OH1cbiAgICAgICAgICAgIHJ5PXs4fVxuICAgICAgICAgICAgeD17d2lkdGggKiAwLjcxfVxuICAgICAgICAgICAgeT17aGVpZ2h0ICogMC43IC0gaSAqIDUwfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHg9e3dpZHRoICogMC43OH1cbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNzYgLSBpICogNTB9XG4gICAgICAgICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckxhYmVscygpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt4fVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9HPlxuICAgICAgKTtcbiAgICB9KTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFkZGluZ1RvcCA9IDE1O1xuICAgIGNvbnN0IHBhZGRpbmdSaWdodCA9IDUwO1xuICAgIGNvbnN0IGJhcldpZHRoID0gMzIgKiB0aGlzLmdldEJhclBlcmNlbnRhZ2UoKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgc3R5bGUgPSB7fSxcbiAgICAgIGRhdGEsXG4gICAgICB3aXRoSG9yaXpvbnRhbExhYmVscyA9IHRydWUsXG4gICAgICB3aXRoVmVydGljYWxMYWJlbHMgPSB0cnVlLFxuICAgICAgc2VnbWVudHMgPSA0LFxuICAgICAgZGVjaW1hbFBsYWNlcyxcbiAgICAgIHBlcmNlbnRpbGUgPSBmYWxzZSxcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0UsXG4gICAgICBmb3JtYXRZTGFiZWwgPSAoeUxhYmVsOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIHlMYWJlbDtcbiAgICAgIH0sXG4gICAgICBoaWRlTGVnZW5kID0gZmFsc2UsXG4gICAgICB3aXRoSG9yaXpvbnRhbExpbmVzID0gZmFsc2VcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgYm9yZGVyUmFkaXVzID0gMCB9ID0gc3R5bGU7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHRcbiAgICB9O1xuXG4gICAgbGV0IGJvcmRlciA9IDA7XG5cbiAgICBsZXQgbWF4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWN0dWFsID0gZGF0YS5kYXRhW2ldLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKTtcbiAgICAgIGlmIChhY3R1YWwgPiBtYXgpIHtcbiAgICAgICAgbWF4ID0gYWN0dWFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwZXJjZW50aWxlKSB7XG4gICAgICBib3JkZXIgPSAxMDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvcmRlciA9IG1heDtcbiAgICB9XG5cbiAgICBjb25zdCBzaG93TGVnZW5kID0gIWhpZGVMZWdlbmQgJiYgZGF0YS5sZWdlbmQgJiYgZGF0YS5sZWdlbmQubGVuZ3RoICE9IDA7XG4gICAgY29uc3Qgc3RhY2tlZEJhciA9IHNob3dMZWdlbmQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgPFN2ZyBoZWlnaHQ9e2hlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJEZWZzKHtcbiAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY2hhcnRDb25maWdcbiAgICAgICAgICB9KX1cbiAgICAgICAgICA8UmVjdFxuICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgcng9e2JvcmRlclJhZGl1c31cbiAgICAgICAgICAgIHJ5PXtib3JkZXJSYWRpdXN9XG4gICAgICAgICAgICBmaWxsPVwidXJsKCNiYWNrZ3JvdW5kR3JhZGllbnQpXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxHPlxuICAgICAgICAgICAge3dpdGhIb3Jpem9udGFsTGluZXMgJiZcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZXMoe1xuICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgICBjb3VudDogc2VnbWVudHMsXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9HPlxuICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExhYmVscyA/IChcbiAgICAgICAgICAgIDxHPlxuICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIb3Jpem9udGFsTGFiZWxzKHtcbiAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgY291bnQ6IHNlZ21lbnRzLFxuICAgICAgICAgICAgICAgIGRhdGE6IFswLCBib3JkZXJdLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0LFxuICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXMsXG4gICAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlLFxuICAgICAgICAgICAgICAgIGZvcm1hdFlMYWJlbFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvRz5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8Rz5cbiAgICAgICAgICAgIHt3aXRoVmVydGljYWxMYWJlbHNcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlclZlcnRpY2FsTGFiZWxzKHtcbiAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsczogZGF0YS5sYWJlbHMsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDI4LFxuICAgICAgICAgICAgICAgICAgc3RhY2tlZEJhcixcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdUb3AsXG4gICAgICAgICAgICAgICAgICBob3Jpem9udGFsT2Zmc2V0OiBiYXJXaWR0aCxcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICA8L0c+XG4gICAgICAgICAgPEc+XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJCYXJzKHtcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgIGJvcmRlcixcbiAgICAgICAgICAgICAgY29sb3JzOiB0aGlzLnByb3BzLmRhdGEuYmFyQ29sb3JzLFxuICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmdSaWdodCArIDIwLFxuICAgICAgICAgICAgICBzdGFja2VkQmFyLFxuICAgICAgICAgICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvRz5cbiAgICAgICAgICB7c2hvd0xlZ2VuZCAmJlxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMZWdlbmQoe1xuICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgIGxlZ2VuZDogZGF0YS5sZWdlbmQsXG4gICAgICAgICAgICAgIGNvbG9yczogdGhpcy5wcm9wcy5kYXRhLmJhckNvbG9yc1xuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvU3ZnPlxuICAgICAgPC9WaWV3PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhY2tlZEJhckNoYXJ0O1xuIl19
