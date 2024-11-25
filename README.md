```markdown
# Advanced Trading Statistics

![npm](https://img.shields.io/npm/v/@miryasha/advanced-trading-statistics)
![GitHub](https://img.shields.io/github/license/miryasha/advanced-trading-statistics)
![npm](https://img.shields.io/npm/dt/@miryasha/advanced-trading-statistics)

A comprehensive JavaScript library for statistical analysis in trading, offering risk analysis, market patterns, and advanced trading metrics.

## Installation

```bash
npm install @miryasha/advanced-trading-statistics
```

## Quick Start

```javascript
const Statistics = require('@miryasha/advanced-trading-statistics');

// Basic Statistics
const mean = Statistics.mean([1, 2, 3, 4, 5]);
const median = Statistics.median([1, 2, 3, 4, 5]);

// Risk Analysis Example
const riskAnalysis = Statistics.calculateDetailedRiskOfRuin(61.5, "1:1.70", 2, 2);

// Market Pattern Analysis
const marketPatterns = Statistics.interpretMarketPatterns({
  consecutiveMovements: { up: 3, down: 2 },
  distribution: { upDays: 10, downDays: 8, neutralDays: 2 }
});
```

## Features

### Basic Statistics
- `mean(array)`: Calculate arithmetic mean
- `median(array)`: Calculate median value
- `mode(array)`: Find most frequent value
- `range(array)`: Get min and max values
- `standardDeviation(array)`: Calculate standard deviation

### Trading Analysis
- `calculateDetailedRiskOfRuin(winRate, riskRewardRatio, riskPerTrade, maxConsecutiveLosses)`
- `calculateSuccessRate(profitableTrades, totalTrades)`
- `calculateProfitMetrics(totalProfit, profitCount, totalLoss, lossCount)`
- `interpretMarketPatterns(patterns, threshold)`
- `skewnedStandardDeviation(opens, highs, lows, closes)`

### Market Analysis
- `interpretSkewness(skewness)`
- `calculateSkewness(array)`
- `determineProbabilityStatus(successRate, riskRewardRatio)`

### Utility Functions
- `normalizeArray(set, range)`
- `decimalToFraction(decimal)`
- `simplifyFractions(str)`
- `sumArr(arr1, arr2)`
- `maxOrMin(arr, choice)`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Documentation

Comprehensive API documentation is available in [API Documentation](docs/API.md)

## Support

For support, issues, or feature requests, please use the [issues](https://github.com/miryasha/advanced-trading-statistics/issues) section.

## License

MIT © [Miryasha](https://miryasha.com)
```

