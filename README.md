# Advanced Trading Statistics

A comprehensive JavaScript library for statistical analysis in trading, offering risk analysis, market patterns, and advanced trading metrics.

## Installation
```bash
npm install advanced-trading-statistics
```

## Usage
```javascript
const Statistics = require('advanced-trading-statistics');

// Basic Statistics
const mean = Statistics.mean([1, 2, 3, 4, 5]);
const median = Statistics.median([1, 2, 3, 4, 5]);

// Trading Analysis
const riskAnalysis = Statistics.calculateDetailedRiskOfRuin(61.5, "1:1.70", 2, 2);
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

## Documentation
[API Documentation](docs/API.md)

## License
MIT © [Miryasha](https://miryasha.com)
