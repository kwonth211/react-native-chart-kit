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
          <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels(
                  __assign(__assign({}, config), {
                    count: segments,
                    data: [0, border],
                    paddingTop: paddingTop,
                    paddingRight: paddingRight,
                    decimalPlaces: decimalPlaces,
                    verticalLabelsHeightPercentage: verticalLabelsHeightPercentage,
                    formatYLabel: formatYLabel
                  })
                )
              : null}
          </G>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhY2tlZEJhckNoYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N0YWNrZWRCYXJDaGFydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxJQUFJLEVBQWEsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXRELE9BQU8sYUFBYSxFQUFFLEVBR3BCLGtDQUFrQyxFQUNuQyxNQUFNLGlCQUFpQixDQUFDO0FBMkR6QjtJQUE4QixtQ0FHN0I7SUFIRDtRQUFBLHFFQW9QQztRQWhQQyxzQkFBZ0IsR0FBRztZQUNULElBQUEsS0FBc0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLGNBQTNCLEVBQWpCLGFBQWEsbUJBQUcsQ0FBQyxLQUFBLENBQTRCO1lBQ3JELE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQUVGLGtCQUFZLEdBQUcsVUFBQyxHQUFtQixFQUFFLENBQWlCO1lBQ3BELE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUztnQkFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQztRQUVGLGdCQUFVLEdBQUcsVUFBQyxFQXNCYjtnQkFyQkMsSUFBSSxVQUFBLEVBQ0osS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUFBLEVBQ04sVUFBVSxnQkFBQSxFQUNWLFlBQVksa0JBQUEsRUFDWixNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixrQkFBa0IsRUFBbEIs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LENBQUM7SUFDSixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBcFBELENBQThCLGFBQWEsR0FvUDFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBWaWV3LCBWaWV3U3R5bGUgfSBmcm9tIFwicmVhY3QtbmF0aXZlXCI7XG5pbXBvcnQgeyBHLCBSZWN0LCBTdmcsIFRleHQgfSBmcm9tIFwicmVhY3QtbmF0aXZlLXN2Z1wiO1xuXG5pbXBvcnQgQWJzdHJhY3RDaGFydCwge1xuICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxuICBBYnN0cmFjdENoYXJ0UHJvcHMsXG4gIERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0Vcbn0gZnJvbSBcIi4vQWJzdHJhY3RDaGFydFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRCYXJDaGFydERhdGEge1xuICBsYWJlbHM6IHN0cmluZ1tdO1xuICBsZWdlbmQ6IHN0cmluZ1tdO1xuICBkYXRhOiBudW1iZXJbXVtdO1xuICBiYXJDb2xvcnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrZWRCYXJDaGFydFByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzIHtcbiAgLyoqXG4gICAqIEUuZy5cbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBjb25zdCBkYXRhID0ge1xuICAgKiAgIGxhYmVsczogW1wiVGVzdDFcIiwgXCJUZXN0MlwiXSxcbiAgICogICBsZWdlbmQ6IFtcIkwxXCIsIFwiTDJcIiwgXCJMM1wiXSxcbiAgICogICBkYXRhOiBbWzYwLCA2MCwgNjBdLCBbMzAsIDMwLCA2MF1dLFxuICAgKiAgIGJhckNvbG9yczogW1wiI2RmZTRlYVwiLCBcIiNjZWQ2ZTBcIiwgXCIjYTRiMGJlXCJdXG4gICAqIH07XG4gICAqIGBgYFxuICAgKi9cbiAgZGF0YTogU3RhY2tlZEJhckNoYXJ0RGF0YTtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGNoYXJ0Q29uZmlnOiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xuICBoaWRlTGVnZW5kOiBib29sZWFuO1xuICBzdHlsZT86IFBhcnRpYWw8Vmlld1N0eWxlPjtcbiAgYmFyUGVyY2VudGFnZT86IG51bWJlcjtcbiAgZGVjaW1hbFBsYWNlcz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFNob3cgdmVydGljYWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cbiAgICovXG4gIHdpdGhWZXJ0aWNhbExhYmVscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG93IGhvcml6b250YWwgbGFiZWxzIC0gZGVmYXVsdDogVHJ1ZS5cbiAgICovXG4gIHdpdGhIb3Jpem9udGFsTGFiZWxzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAgKiBTaG93IGhvcml6b250YWwgbGluZXMgLSBkZWZhdWx0OiBUcnVlLlxuICAgICovXG4gICB3aXRoSG9yaXpvbnRhbExpbmVzPzogYm9vbGVhbjtcbiAgICAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBsaW5lc1xuICAgKi9cbiAgc2VnbWVudHM/OiBudW1iZXI7XG5cbiAgcGVyY2VudGlsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFBlcmNlbnRhZ2Ugb2YgdGhlIGNoYXJ0IGhlaWdodCwgZGVkaWNhdGVkIHRvIHZlcnRpY2FsIGxhYmVsc1xuICAgKiAoc3BhY2UgYmVsb3cgY2hhcnQpXG4gICAqL1xuICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U/OiBudW1iZXI7XG5cbiAgZm9ybWF0WUxhYmVsPzogKHlMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XG59XG5cbnR5cGUgU3RhY2tlZEJhckNoYXJ0U3RhdGUgPSB7fTtcblxuY2xhc3MgU3RhY2tlZEJhckNoYXJ0IGV4dGVuZHMgQWJzdHJhY3RDaGFydDxcbiAgU3RhY2tlZEJhckNoYXJ0UHJvcHMsXG4gIFN0YWNrZWRCYXJDaGFydFN0YXRlXG4+IHtcbiAgZ2V0QmFyUGVyY2VudGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGJhclBlcmNlbnRhZ2UgPSAxIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xuICAgIHJldHVybiBiYXJQZXJjZW50YWdlO1xuICB9O1xuXG4gIGdldEJhclJhZGl1cyA9IChyZXQ6IHN0cmluZyB8IGFueVtdLCB4OiBzdHJpbmcgfCBhbnlbXSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmJhclJhZGl1cyAmJiByZXQubGVuZ3RoID09PSB4Lmxlbmd0aCAtIDFcbiAgICAgID8gdGhpcy5wcm9wcy5jaGFydENvbmZpZy5iYXJSYWRpdXNcbiAgICAgIDogMDtcbiAgfTtcblxuICByZW5kZXJCYXJzID0gKHtcbiAgICBkYXRhLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBwYWRkaW5nVG9wLFxuICAgIHBhZGRpbmdSaWdodCxcbiAgICBib3JkZXIsXG4gICAgY29sb3JzLFxuICAgIHN0YWNrZWRCYXIgPSBmYWxzZSxcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcbiAgfTogUGljazxcbiAgICBPbWl0PEFic3RyYWN0Q2hhcnRDb25maWcsIFwiZGF0YVwiPixcbiAgICB8IFwid2lkdGhcIlxuICAgIHwgXCJoZWlnaHRcIlxuICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxuICAgIHwgXCJwYWRkaW5nVG9wXCJcbiAgICB8IFwic3RhY2tlZEJhclwiXG4gICAgfCBcInZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZVwiXG4gID4gJiB7XG4gICAgYm9yZGVyOiBudW1iZXI7XG4gICAgY29sb3JzOiBzdHJpbmdbXTtcbiAgICBkYXRhOiBudW1iZXJbXVtdO1xuICB9KSA9PlxuICAgIGRhdGEubWFwKCh4LCBpKSA9PiB7XG4gICAgICBjb25zdCBiYXJXaWR0aCA9IDMyICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCk7XG4gICAgICBjb25zdCByZXQgPSBbXTtcbiAgICAgIGxldCBoID0gMDtcbiAgICAgIGxldCBzdCA9IHBhZGRpbmdUb3A7XG5cbiAgICAgIGxldCBmYWMgPSAxO1xuICAgICAgaWYgKHN0YWNrZWRCYXIpIHtcbiAgICAgICAgZmFjID0gMC43O1xuICAgICAgfVxuICAgICAgY29uc3Qgc3VtID0gdGhpcy5wcm9wcy5wZXJjZW50aWxlID8geC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKSA6IGJvcmRlcjtcbiAgICAgIGNvbnN0IGJhcnNBcmVhSGVpZ2h0ID0gaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlO1xuICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCB4Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgIGggPSBiYXJzQXJlYUhlaWdodCAqICh4W3pdIC8gc3VtKTtcbiAgICAgICAgY29uc3QgeSA9IGJhcnNBcmVhSGVpZ2h0IC0gaCArIHN0O1xuICAgICAgICBjb25zdCB4QyA9XG4gICAgICAgICAgKHBhZGRpbmdSaWdodCArXG4gICAgICAgICAgICAoaSAqICh3aWR0aCAtIHBhZGRpbmdSaWdodCkpIC8gZGF0YS5sZW5ndGggK1xuICAgICAgICAgICAgYmFyV2lkdGggLyAyKSAqXG4gICAgICAgICAgZmFjO1xuXG4gICAgICAgIHJldC5wdXNoKFxuICAgICAgICAgIDxSZWN0XG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgICB4PXt4Q31cbiAgICAgICAgICAgIHk9e3l9XG4gICAgICAgICAgICByeD17dGhpcy5nZXRCYXJSYWRpdXMocmV0LCB4KX1cbiAgICAgICAgICAgIHJ5PXt0aGlzLmdldEJhclJhZGl1cyhyZXQsIHgpfVxuICAgICAgICAgICAgd2lkdGg9e2JhcldpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtofVxuICAgICAgICAgICAgZmlsbD17Y29sb3JzW3pdfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhpZGVMZWdlbmQpIHtcbiAgICAgICAgICByZXQucHVzaChcbiAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgIGtleT17TWF0aC5yYW5kb20oKX1cbiAgICAgICAgICAgICAgeD17eEMgKyA3ICsgYmFyV2lkdGggLyAyfVxuICAgICAgICAgICAgICB0ZXh0QW5jaG9yPVwiZW5kXCJcbiAgICAgICAgICAgICAgeT17aCA+IDE1ID8geSArIDE1IDogeSArIDd9XG4gICAgICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt4W3pdfVxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBzdCAtPSBoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gIHJlbmRlckxlZ2VuZCA9ICh7XG4gICAgbGVnZW5kLFxuICAgIGNvbG9ycyxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfTogUGljazxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcIndpZHRoXCIgfCBcImhlaWdodFwiPiAmIHtcbiAgICBsZWdlbmQ6IHN0cmluZ1tdO1xuICAgIGNvbG9yczogc3RyaW5nW107XG4gIH0pID0+XG4gICAgbGVnZW5kLm1hcCgoeCwgaSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEcga2V5PXtNYXRoLnJhbmRvbSgpfT5cbiAgICAgICAgICA8UmVjdFxuICAgICAgICAgICAgd2lkdGg9XCIxNnB4XCJcbiAgICAgICAgICAgIGhlaWdodD1cIjE2cHhcIlxuICAgICAgICAgICAgZmlsbD17Y29sb3JzW2ldfVxuICAgICAgICAgICAgcng9ezh9XG4gICAgICAgICAgICByeT17OH1cbiAgICAgICAgICAgIHg9e3dpZHRoICogMC43MX1cbiAgICAgICAgICAgIHk9e2hlaWdodCAqIDAuNyAtIGkgKiA1MH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICB4PXt3aWR0aCAqIDAuNzh9XG4gICAgICAgICAgICB5PXtoZWlnaHQgKiAwLjc2IC0gaSAqIDUwfVxuICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JMYWJlbHMoKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvRz5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHBhZGRpbmdUb3AgPSAxNTtcbiAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSA1MDtcbiAgICBjb25zdCBiYXJXaWR0aCA9IDMyICogdGhpcy5nZXRCYXJQZXJjZW50YWdlKCk7XG5cbiAgICBjb25zdCB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHN0eWxlID0ge30sXG4gICAgICBkYXRhLFxuICAgICAgd2l0aEhvcml6b250YWxMYWJlbHMgPSB0cnVlLFxuICAgICAgd2l0aFZlcnRpY2FsTGFiZWxzID0gdHJ1ZSxcbiAgICAgIHNlZ21lbnRzID0gNCxcbiAgICAgIGRlY2ltYWxQbGFjZXMsXG4gICAgICBwZXJjZW50aWxlID0gZmFsc2UsXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFLFxuICAgICAgZm9ybWF0WUxhYmVsID0gKHlMYWJlbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiB5TGFiZWw7XG4gICAgICB9LFxuICAgICAgaGlkZUxlZ2VuZCA9IGZhbHNlLFxuICAgICAgd2l0aEhvcml6b250YWxMaW5lcz1mYWxzZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBib3JkZXJSYWRpdXMgPSAwIH0gPSBzdHlsZTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgIH07XG5cbiAgICBsZXQgYm9yZGVyID0gMDtcblxuICAgIGxldCBtYXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBkYXRhLmRhdGFbaV0ucmVkdWNlKChwdiwgY3YpID0+IHB2ICsgY3YsIDApO1xuICAgICAgaWYgKGFjdHVhbCA+IG1heCkge1xuICAgICAgICBtYXggPSBhY3R1YWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBlcmNlbnRpbGUpIHtcbiAgICAgIGJvcmRlciA9IDEwMDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyID0gbWF4O1xuICAgIH1cblxuICAgIGNvbnN0IHNob3dMZWdlbmQgPSAhaGlkZUxlZ2VuZCAmJiBkYXRhLmxlZ2VuZCAmJiBkYXRhLmxlZ2VuZC5sZW5ndGggIT0gMDtcbiAgICBjb25zdCBzdGFja2VkQmFyID0gc2hvd0xlZ2VuZDtcblxuICAgIHJldHVybiAoXG4gICAgICA8VmlldyBzdHlsZT17c3R5bGV9PlxuICAgICAgICA8U3ZnIGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxuICAgICAgICAgIHt0aGlzLnJlbmRlckRlZnMoe1xuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jaGFydENvbmZpZ1xuICAgICAgICAgIH0pfVxuICAgICAgICAgIDxSZWN0XG4gICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICByeD17Ym9yZGVyUmFkaXVzfVxuICAgICAgICAgICAgcnk9e2JvcmRlclJhZGl1c31cbiAgICAgICAgICAgIGZpbGw9XCJ1cmwoI2JhY2tncm91bmRHcmFkaWVudClcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEc+XG5cbiAgICAgICAgICAgIHt3aXRoSG9yaXpvbnRhbExpbmVzICYmdGhpcy5yZW5kZXJIb3Jpem9udGFsTGluZXMoe1xuICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgIGNvdW50OiBzZWdtZW50cyxcbiAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcbiAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0c+XG4gICAgICAgICAgPEc+XG4gICAgICAgICAgICB7d2l0aEhvcml6b250YWxMYWJlbHNcbiAgICAgICAgICAgICAgPyB0aGlzLnJlbmRlckhvcml6b250YWxMYWJlbHMoe1xuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICAgICAgY291bnQ6IHNlZ21lbnRzLFxuICAgICAgICAgICAgICAgICAgZGF0YTogWzAsIGJvcmRlcl0sXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0LFxuICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSxcbiAgICAgICAgICAgICAgICAgIGZvcm1hdFlMYWJlbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgICA8L0c+XG4gICAgICAgICAgPEc+XG4gICAgICAgICAgICB7d2l0aFZlcnRpY2FsTGFiZWxzXG4gICAgICAgICAgICAgID8gdGhpcy5yZW5kZXJWZXJ0aWNhbExhYmVscyh7XG4gICAgICAgICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAgICAgICBsYWJlbHM6IGRhdGEubGFiZWxzLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nUmlnaHQgKyAyOCxcbiAgICAgICAgICAgICAgICAgIHN0YWNrZWRCYXIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wLFxuICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbE9mZnNldDogYmFyV2lkdGgsXG4gICAgICAgICAgICAgICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgPC9HPlxuICAgICAgICAgIDxHPlxuICAgICAgICAgICAge3RoaXMucmVuZGVyQmFycyh7XG4gICAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICBib3JkZXIsXG4gICAgICAgICAgICAgIGNvbG9yczogdGhpcy5wcm9wcy5kYXRhLmJhckNvbG9ycyxcbiAgICAgICAgICAgICAgcGFkZGluZ1RvcCxcbiAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nUmlnaHQgKyAyMCxcbiAgICAgICAgICAgICAgc3RhY2tlZEJhcixcbiAgICAgICAgICAgICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0c+XG4gICAgICAgICAge3Nob3dMZWdlbmQgJiZcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGVnZW5kKHtcbiAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICBsZWdlbmQ6IGRhdGEubGVnZW5kLFxuICAgICAgICAgICAgICBjb2xvcnM6IHRoaXMucHJvcHMuZGF0YS5iYXJDb2xvcnNcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA8L1N2Zz5cbiAgICAgIDwvVmlldz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWNrZWRCYXJDaGFydDtcbiJdfQ==
