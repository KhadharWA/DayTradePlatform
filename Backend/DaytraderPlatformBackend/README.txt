# Finnhub Backend API

Endpoints:
- GET /api/stocks/candles/{symbol} → Hämtar candles (grafdata)
- GET /api/stocks/history/{symbol} → Hämtar historik (daily candles)
- GET /api/stocks/news/{symbol} → Hämtar företagsnyheter
- GET /api/stocks/gainers → Hämtar toppvinnare (simulerad)

Kom ihåg:
- Lägg in din API-nyckel i `appsettings.json` under "Finnhub:ApiKey"
- Registrera `IStockService` och `StockService` i Program.cs


AQAAAAIAAYagAAAAEIkN/POiJN8pNILfIzhBc7tThGA2ianM9uS6DyZyEJIXGZh+JpMIwB1BVSXAbE6fuA==